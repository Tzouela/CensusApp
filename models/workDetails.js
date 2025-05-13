module.exports = (sequelize, Sequelize) => {
  const Work = sequelize.define('Work', {
    companyname: Sequelize.DataTypes.STRING,
    salary: Sequelize.DataTypes.DECIMAL(10, 2),
    currency: Sequelize.DataTypes.STRING(3),
  }, {
    timestamps: false
  });

  Work.associate = (models) => {
    Work.belongsTo(models.Participant, {
      foreignKey: 'participantId'
    });
  };

  return Work;
}