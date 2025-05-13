module.exports = (sequelize, Sequelize) => {
  const WorkDetails = sequelize.define('WorkDetails', {
    companyname: Sequelize.DataTypes.STRING,
    salary: Sequelize.DataTypes.DECIMAL(10, 2),
    currency: Sequelize.DataTypes.STRING(3),
  }, {
    timestamps: false
  });

  WorkDetails.associate = (models) => {
    WorkDetails.belongsTo(models.Participant, {
      foreignKey: 'participantId'
    });
  };

  return WorkDetails;
}