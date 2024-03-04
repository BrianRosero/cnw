const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Group = db.group;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    names: req.body.names,
    lastname: req.body.lastname,
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            assignDefaultGroup(user);
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          assignDefaultGroup(user);
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
  // Función para asignar el grupo por defecto
  function assignDefaultGroup(user) {
    Group.findByPk(1) // Asumiendo que el grupo por defecto tiene el ID 1
      .then(group => {
        if (group) {
          user.setGroups([group]).then(() => {
            res.send({ message: "Usuario Registrado!" });
          });
        } else {
          res.send({ message: "Usuario Registrado!" });
        }
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  }
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    },
    include: [
      {
        model: Group,
        attributes: ['name'] // Incluir solo el nombre del grupo
      }
    ]
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Contraseña incorrecta!"
        });
      }
      const token = jwt.sign({ id: user.id },
                              config.secret,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                              });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push(/*'ROLE_' + */roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
          names: user.names,
          lastname: user.lastname,
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
