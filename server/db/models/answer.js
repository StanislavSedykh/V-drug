'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User,{foreignKey: 'user_id'})
      this.belongsTo(models.Game,{foreignKey: 'game_id'})
      this.belongsTo(models.Participant,{foreignKey: 'participant_id'})
    }
  }
  Answer.init({
    game_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    participant_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};