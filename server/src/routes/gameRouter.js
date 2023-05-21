const express = require('express');
const { Game } = require('../../db/models');

const gameRouter = express.Router();

gameRouter.post('/', async (req, res) => {
  try {
    const { count } = req.body;
    const { id } = req.session.user;
    const pin = Math.floor(Math.random() * (999999 - 100000) + 100000);
    const game = await Game.create({ count, user_id: id, pin });
    res.status(200).json(game);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
gameRouter.delete('/', async (req, res) => {
  try {
    await Game.destroy({ where: { id: req.session.user.id } });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = gameRouter;
