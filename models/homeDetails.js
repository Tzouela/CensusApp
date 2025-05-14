module.exports = (sequelize, DataTypes) => {
  const HomeDetails = sequelize.define('HomeDetails', {
    email:   { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
    city:    { type: DataTypes.STRING, allowNull: false }
  }, { timestamps: false });

  HomeDetails.associate = (models) => {
    HomeDetails.belongsTo(models.Participant, { as: 'participant', foreignKey: 'email', targetKey: 'email', onDelete: 'CASCADE',
      onUpdate: 'CASCADE' });
  };

  return HomeDetails;
};