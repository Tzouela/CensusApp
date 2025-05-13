module.exports = (sequelize, Sequelize) => {
  const Home = sequelize.define('Home', {
    country: Sequelize.DataTypes.STRING,
    city: Sequelize.DataTypes.STRING
  }, {
    timestamps: false
  });

  Home.associate = (models) => {
    Home.belongsTo(models.Participant, {
      foreignKey: 'participantId'
    });
  };

  return Home;
}