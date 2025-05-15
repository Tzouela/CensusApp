module.exports = (sequelize, DataTypes) => {
  const WorkDetails = sequelize.define('WorkDetails', {
    email: { type: DataTypes.STRING, allowNull: false },
    companyname: { type: DataTypes.STRING, allowNull: false },
    salary: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    currency: { type: DataTypes.STRING(3), allowNull: false }
  }, { timestamps: false });

  WorkDetails.associate = (models) => {
    WorkDetails.belongsTo(models.Participant, {
      as: 'participant', foreignKey: 'email', targetKey: 'email', 
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  return WorkDetails;
};
