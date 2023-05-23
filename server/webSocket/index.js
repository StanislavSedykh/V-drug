const { WebSocketServer } = require('ws');
const {User, Participant, Game, Answer} = require('../db/models');
const wss = new WebSocketServer({ clientTracking: false, noServer: true });

wss.on('connection', (ws, request, wsMap) => {
  const { id } = request.session;
  wsMap.set(id, { ws, user: request.session.user });

  ws.on('message', async (data) => {
    const { type, payload } = JSON.parse(data);
    switch (type) {
      case 'JOIN_ROOM': {
        const { roomPin, user } = payload;
        // const foundRoom = await Game.findOne({ where: { pin: roomPin } });
        // if (!foundRoom) {
        //   console.log('failed');
        //   return;
        // }

        // await Game.create({ userid: user.id, roomid: foundRoom.id });
        // const gameUsers = await Game.findAll({
        //   where: { roomid: foundRoom.id },
        //   include: User,
        // });

        for (const [, wsClient] of wsMap) {
          wsClient.ws.send(JSON.stringify({ type: 'Game/addPlayers', payload: user }));
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
