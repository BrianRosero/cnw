const db = require('../../models');
const config = require('../config/auth.config');
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    names: req.body.names,
    lastname: req.body.lastname,
    profile: req.body.profile,
    description: req.body.description,
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: 'Uuario registrado correctamente!' });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: 'Usuario registrado correctamente!' });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'Usuario no encontrado.' });
      }

      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({ accessToken: null, message: 'Contraseña incorrecta!' });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });
      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push('ROLE_' + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
          names: user.names,
          lastname: user.lastname,
          profile: user.profile,
          description: user.description,
          twoFactorEnabled: !!user.twoFactorSecret,
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.enable2FA = (req, res) => {
  User.findByPk(req.body.userId).then(user => {
    if (!user) {
      return res.status(404).send({ message: 'Usuario no encontrado.' });
    }
    const secret = speakeasy.generateSecret({ name: 'CONSULNETWORKS' });
    user.twoFactorSecret = secret.base32;
    user.save().then(() => {
      QRCode.toDataURL(secret.otpauth_url, (err, data_url) => {
        if (err) {
          console.error('Error generating QR Code:', err);
          return res.status(500).send({ message: 'Error al generar el código QR' });
        }
        res.send({ qrCodeUrl: data_url });
      });
    });
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.verify2FA = async (req, res) => {
  try {
    const user = await User.findByPk(req.body.userId, {
      include: [
        {
          model: Role,
          as: 'roles',
          attributes: ['id', 'name'],
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!user) {
      return res.status(404).send({ message: 'Usuario no encontrado.' });
    }

    const cleanedToken = req.body.token.trim();
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: cleanedToken,
      window: 1, // Permitir una pequeña ventana de tiempo
    });

    if (verified) {
      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      const authorities = user.roles.map(role => 'ROLE_' + role.name.toUpperCase());

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
        names: user.names,
        lastname: user.lastname,
        profile: user.profile,
        description: user.description,
        twoFactorEnabled: !!user.twoFactorSecret,
        message: 'Autenticación exitosa',
      });
    } else {
      res.status(401).send({ message: 'Código inválido' });
    }
  } catch (err) {
    console.error('Error during 2FA verification:', err);
    res.status(500).send({ message: err.message });
  }
};



