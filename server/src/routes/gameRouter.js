const express = require('express');
const { Game } = require('../../db/models');

const gameRouter = express.Router();
gameRouter.post('/', async (req, res) => {
  try {
    const { count } = req.body;
    const { id } = req.session.user;
    const pin = Math.floor(Math.random() * (999999 - 100000) + 100000);
    const game = await Game.create({ where: { count, user_id: id, pin } });
    res.json(game).sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
