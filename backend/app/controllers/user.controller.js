const db = require("../models");

exports.getAllUserData = (req, res) => {
  db.user.findAll({
    include: [db.group, db.role]
  })
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
