module.exports = (sequelize, DataTypes) => {
  const Participant = sequelize.define('Participant', {
    email: { type: DataTypes.STRING, primaryKey: true, allowNull: 
    false, validate: { isEmail: true } },
    firstname: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    dob: { type: DataTypes.DATEONLY, allowNull: false }
  }, { timestamps: false });

  Participant.associate = (models) => {
    Participant.hasOne(models.WorkDetails, {
      as: 'work', foreignKey: 'email', sourceKey: 'email', 
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Participant.hasOne(models.HomeDetails, {
      as: 'home', foreignKey: 'email', sourceKey: 'email', 
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  return Participant;
};