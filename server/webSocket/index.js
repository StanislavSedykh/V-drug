const { WebSocketServer } = require('ws');
const { User, Participant, Game, Answer } = require('../db/models');

const wss = new WebSocketServer({ clientTracking: false, noServer: true });

wss.on('connection', (ws, request, wsMap) => {
  const { id } = request.session;
  wsMap.set(id, { ws, user: request.session.user });

  ws.on('message', async (data) => {
    const { type, payload } = JSON.parse(data);
    switch (type) {
      case 'JOIN_ROOM': {
        for (const [, wsClient] of wsMap) {
          wsClient.ws.send(JSON.stringify({ type: 'Game/addPlayers', payload: Array.from(wsMap.values()).map((el) => el.user) }));
        }
        break;
      }

      case 'START_GAME': {
        for (const [, wsClient] of wsMap) {
          wsClient.ws.send(JSON.stringify({ type: 'Game/updateGameStatus', payload }));
        }
        break;
      }
      default:
        break;
    }
  });

  ws.on('error', () => {
    wsMap.delete(id);
    for (const [, wsClient] of wsMap) {
      wsClient.ws.send(
        JSON.stringify({
          type: 'friends/setFriendsOnline',
          payload: Array.from(wsMap.values()).map((el) => el.user),
        }),
      );
    }
  });

  ws.on('close', () => {
    wsMap.delete(id);
    for (const [, wsClient] of wsMap) {
      wsClient.ws.send(
        JSON.stringify({
          type: 'friends/setFriendsOnline',
          payload: Array.from(wsMap.values()).map((el) => el.user),
        }),
      );
    }
  });
});

module.exports = wss;
