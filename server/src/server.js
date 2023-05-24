import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import store from 'session-file-store';
import http from 'http';
import apiRouter from './routes/apiRouter';
import authRouter from './routes/authRouter';
import gameRouter from './routes/gameRouter';
import participantRouter from './routes/participantRouter';
import factRouter from './routes/factRouter';

const cors = require('cors');
const wss = require('../webSocket/index');
require('dotenv').config();

const PORT = process.env.SERVER_PORT || 3001;
const app = express();
const FileStore = store(session);

const sessionConfig = session({
  name: 'user_sid',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: true,
  store: new FileStore(),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  },
});

app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(sessionConfig);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter);
app.use('/api/auth', authRouter);
app.use('/api/games', gameRouter);
app.use('/api/participants', participantRouter);
app.use('/api/facts', factRouter);

const server = http.createServer(app);
const map = new Map();

server.on('upgrade', (request, socket, head) => {
  console.log('Parsing session from request...');
  sessionConfig(request, {}, () => {
    if (!request.session.user) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }
    console.log('Session is parsed!');
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request, map);
    });
  });
});

server.listen(PORT, () => console.log(`App has started on port ${PORT}`));
