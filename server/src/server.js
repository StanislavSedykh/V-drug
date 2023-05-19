import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import store from 'session-file-store';
import { WebSocketServer } from 'ws';
import http from 'http';
import apiRouter from './routes/apiRouter';
import authRouter from './routes/authRouter';

const path = require('path');

const cors = require('cors');

const map = new Map();
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
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  },
};

app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(morgan('dev'));
app.use(session(sessionConfig));
app.use(express.json());

app.use('/api', apiRouter);
app.use('/api/auth', authRouter);

const server = http.createServer(app);
const wss = new WebSocketServer({ clientTracking: false, noServer: true });

server.on('upgrade', (request, socket, head) => {
  console.log('Parsing session from request...');

  sessionConfig(request, {}, () => {
    if (!request.session.user) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

    console.log('Session is parsed!');

    // socket.removeListener('error', onSocketError);

    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });
});

wss.on('connection', (ws, request) => {
  const { user } = request.session;

  map.set(user.id, [ws, user]);

  map.forEach(([wsItem, userItem]) => {
    wsItem.send(
      JSON.stringify({
        type: 'WS_USER_ONLINE',
        payload: Array.from(map.values()).map(([, userI]) => userI),
      }),
    );
  });

  ws.on('error', console.error);

  ws.on('message', (message) => {
    //
    // Here we can now use session parameters.
    //
    console.log(`Received message ${message} from user ${user}`);
  });

  ws.on('close', () => {
    map.delete(user.id);
  });
});

app.listen(PORT, () => console.log(`App has started on port ${PORT}`));
