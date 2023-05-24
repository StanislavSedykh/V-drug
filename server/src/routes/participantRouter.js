const express = require('express');
const { Game, Participant } = require('../../db/models');

const participantRouter = express.Router();

participantRouter.post('/', async (req, res) => {
  const { id } = req.session.user;
  const game = await Game.findOne({ where: { pin: req.body.pinPart }, attributes: ['id'] });
  if (!game) {
    return res.status(404).send('Игра не найдена');
  }
  await Participant.create({ user_id: id, game_id: game.id }); 
  return res.sendStatus(200);
});

module.exports = participantRouter;
