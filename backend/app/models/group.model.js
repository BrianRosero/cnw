module.exports = (sequelize, Sequelize) => {
  const Group = sequelize.define("groups", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    nit: {
      type: Sequelize.STRING
    },
    logo: {
      type: Sequelize.STRING
    }
  });

  return Group;
};
