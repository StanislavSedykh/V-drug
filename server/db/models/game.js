'use strict';
const {
  Model, BelongsTo
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User,{foreignKey: 'user_id'})
      this.hasMany(models.Participant,{foreignKey: 'game_id'})
      this.hasMany(models.Answer,{foreignKey: 'game_id'})
    }
  }
  Game.init({
    user_id: DataTypes.INTEGER,
    pin: DataTypes.STRING,
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};