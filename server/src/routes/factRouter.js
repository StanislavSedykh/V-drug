const express = require('express');
const { Participant } = require('../../db/models');

const factRouter = express.Router();

factRouter.post('/', async (req, res) => {
  const { id } = req.session.user;
  const { fact } = req.body;
  const participant = await Participant.findOne({ where: { user_id: id } });
  if (participant) {
    await participant.update({ fact });
    res.sendStatus(200);
  } else {
    await Participant.create({ user_id: id, fact });
    res.sendStatus(200);
  }
});

module.exports = factRouter;
