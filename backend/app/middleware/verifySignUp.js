const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkValidNameAndLastname = (req, res, next) => {
    if (!req.body.names || req.body.names.length < 2 || req.body.names.length > 30) {
        res.status(400).send({message: "El nombre no es válido!"});
        return;
    }

    if (!req.body.lastname || req.body.lastname.length < 2 || req.body.lastname.length > 30) {
        res.status(400).send({message: "El apellido no es válido!"});
        return;
    }
    next();
};

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Nombre de usuario ya está en uso!"
            });
            return;
        }

        // Email
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Correo electronico ya está en uso.!"
                });
                return;
            }

            next();
        });
    });
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Este rol no existe = " + req.body.roles[i]
                });
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkValidNameAndLastname: checkValidNameAndLastname,
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
