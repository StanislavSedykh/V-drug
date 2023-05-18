import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import store from 'session-file-store';
import apiRouter from './routes/apiRouter';

const cors = require('cors');

require('dotenv').config();

const PORT = process.env.SERVER_PORT || 3000;
const app = express();
const FileStore = store(session);

const sessionConfig = {
  name: 'user_sid',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: true,
  store: new FileStore(),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
};

app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);

app.use(morgan('dev'));
app.use(session(sessionConfig));
app.use(express.json());

app.use('/api', apiRouter);

app.listen(PORT, () => console.log(`App has started on port ${PORT}`));
