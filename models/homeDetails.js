module.exports = (sequelize, Sequelize) => {
  const HomeDetails = sequelize.define('HomeDetails', {
    country: Sequelize.DataTypes.STRING,
    city: Sequelize.DataTypes.STRING
  }, {
    timestamps: false
  });

  HomeDetails.associate = (models) => {
    HomeDetails.belongsTo(models.Participant, {
      foreignKey: 'participantId'
    });
  };

  return HomeDetails;
}