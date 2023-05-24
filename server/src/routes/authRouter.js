const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const storage = require('../../middlewares/multer');
const { User } = require('../../db/models');

const authRouter = express.Router();
const upload = multer({ storage });

authRouter.post('/signup', upload.single('image'), async (req, res) => {

  const { name, email, password } = req.body;
  const image = req.file.path
  if (!name && !email && !password && !image)
    return res.status(400).json({ message: 'User data is missing', status: 400 });
  try {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        password: await bcrypt.hash(password, 10),
        name,
        photo: image,
      },
    });
    if (!created) return res.status(400).json({ message: 'User already exists', status: 400 });
    req.session.user = { id: user.id, name, email, image };
    return res.json({ ...req.session.user });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) return res.sendStatus(401);
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.sendStatus(401);
    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.user = { id: user.id, name: user.name, email, image: user.photo };
      return res.json({ ...req.session.user });
    }
    return res.sendStatus(401);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

authRouter.get('/check', (req, res) => {
  try{
  if (req.session.user) {
    return res.json({ ...req.session.user });
  }
  return res.sendStatus(401);
} catch (err) {
  console.log(err);
  return res.sendStatus(500)
}
});

authRouter.post('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('sid');
  res.sendStatus(200);
});

module.exports = authRouter;
