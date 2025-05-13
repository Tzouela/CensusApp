module.exports = (sequelize, Sequelize) => {
  const Participant = sequelize.define('Participant', {
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    firstname: Sequelize.DataTypes.STRING,
    lastname: Sequelize.DataTypes.STRING,
    dob: Sequelize.DataTypes.DATEONLY
  }, {
    timestamps: false
  });

  return Participant;
}