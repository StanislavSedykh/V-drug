'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User,{foreignKey: 'user_id'})
      this.belongsTo(models.Game,{foreignKey: 'game_id'})
      this.hasMany(models.Answer,{foreignKey: 'participant_id'})
    }
  }
  Participant.init({
    game_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    fact: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Participant',
  });
  return Participant;
};