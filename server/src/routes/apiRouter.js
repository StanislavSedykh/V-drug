const express = require('express');

const apiRouter = express.Router();

const { User } = require('../../db/models');

apiRouter.get('/scores', async (req, res) => {
  const scores = await User.findOne({ where: { id: req.session.user.id }, attributes: ['score'] });
  return res.json(scores);
});


module.exports = apiRouter;
