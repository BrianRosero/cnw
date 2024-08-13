module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    names: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    profile: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    twoFactorSecret: {
      type: Sequelize.STRING,
      allowNull: true
    }
  });
  return User;
};
