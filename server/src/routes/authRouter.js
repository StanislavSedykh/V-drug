const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const storage = require('../../middleware/multer');
const { User } = require('../../db/models');

const authRouter = express.Router();
const fileMiddleware = multer({ storage });

authRouter.post('/signup', fileMiddleware.single('image'), async (req, res) => {
  console.log(req.body);
  console.log(req.files, req.file);
  const { name, email, password, image } = req.body;
  if (!name && !email && !password && !image) return res.sendStatus(401);
  try {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        password: await bcrypt.hash(password, 10),
        name,
        photo: image,
      },
    });
    if (!created) return res.sendStatus(401);
    req.session.user = { id: user.id, name, email, image };
    return res.json({ ...req.session.user });
  } catch (err) {
    console.log(err);
    return res.sendStatus(401);
  }
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) return res.sendStatus(401);
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.sendStatus(401);
    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.user = { id: user.id, name: user.name, email };
      return res.json({ ...req.session.user });
    }
    return res.sendStatus(401);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

authRouter.get('/check', (req, res) => {
  if (req.session.user) {
    return res.json({ ...req.session.user });
  }
  return res.sendStatus(401);
});

authRouter.post('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('sid');
  res.sendStatus(200);
});

module.exports = authRouter;
