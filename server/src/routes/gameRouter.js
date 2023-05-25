const express = require('express');
const { Game, Participant, Answer } = require('../../db/models');

const gameRouter = express.Router();

gameRouter.post('/', async (req, res) => {
  try {
    const { count } = req.body;
    const { id } = req.session.user;
    const pin = Math.floor(Math.random() * (999999 - 100000) + 100000);
    const game = await Game.create({ count, user_id: id, pin });
    await Participant.create({ user_id: id, game_id: game.id });
    res.status(200).json(game);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

gameRouter.get('/', async (req, res) => {
  try {
    const { pin } = await Game.findOne({
      where: { user_id: req.session.user.id },
      attributes: ['pin'],
    });
    return res.json(pin);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

gameRouter.delete('/', async (req, res) => {
  try {
    await Game.destroy({ where: { user_id: req.session.user.id } });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


gameRouter.post('/answer', async (req, res) => {
  try {
    const { user_id, participant_id, status } = req.body;
    const game_id = 1;
    const answer = await Answer.create({game_id, user_id, participant_id, status });
    res.status(200).json(answer);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = gameRouter;
