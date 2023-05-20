const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ clientTracking: false, noServer: true });

wss.on('connection', (ws, request, wsMap) => {
  const { user } = request.session;
  wsMap.set(user.id, { ws, user });

  ws.on('error', () => {
    wsMap.delete(user.id);
  });

  ws.on('message', async (data) => {
    console.log(`Received message ${data} from user ${user}!`);
  });

  ws.on('close', () => {
    wsMap.delete(user.id);
  });
});

module.exports = wss;
