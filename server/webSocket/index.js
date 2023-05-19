const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ clientTracking: false, noServer: true });

function broad() {
  wss.on('connection', (ws, request, wsMap) => {
    const { user } = request.session;
    wsMap.set(user.id, { ws, user });
    wsMap.forEach(([wsItem, userItem]) => {
      wsItem.send(
        JSON.stringify({
          type: 'WS_USER_ONLINE',
          payload: Array.from(wsMap.values()).map(([, userI]) => userI),
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
      wsMap.delete(user.id);
    });
  });
}

module.exports = broad;
