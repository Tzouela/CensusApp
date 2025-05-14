module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define('Admin', {
    username: {
      type: Sequelize.DataTypes.STRING,
      unique: true
    },
    password: {
      type: Sequelize.DataTypes.STRING
    }
  }, {
    timestamps: false
  });

  return Admin;
};