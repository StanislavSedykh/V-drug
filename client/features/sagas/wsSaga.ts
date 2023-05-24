import { END, eventChannel } from "redux-saga";
import {
  SET_WS,
  SOCKET_INIT,
  UPDATE_STATUS,
} from "../../types/webSocket/webSocket";
import { Platform } from "react-native";
import { call, fork, put, take, takeEvery } from "redux-saga/effects";
import { API_URL } from "@env";

function createSocketChannel(socket) {
  return eventChannel((emit) => {
    socket.onopen = () => {
      emit({ type: SET_WS, payload: true });
    };

    socket.onerror = function (error) {
      emit({ type: SET_WS, payload: null });
    };

    socket.onmessage = function (event) {
      emit(JSON.parse(event.data));
    };

    socket.onclose = function (event) {
      emit({ type: SET_WS, payload: null });
    };

    return () => {
      console.log("Socket off");
      emit(END);
    };
  });
}

function createWebSocketConnection() {
  const newSocket = new WebSocket(
    `ws://${
      Platform.OS === "android" || Platform.OS === "ios" ? API_URL : "localhost"
    }:3001`
  );
  return newSocket;
}

function* updateStatus(socket) {
  while (true) {
    const message = yield take(UPDATE_STATUS);
    socket.send(JSON.stringify(message));
  }
}

function* joinGameWorker(socket) {
  while (true) {
    const message = yield take("JOIN_ROOM");
    socket.send(JSON.stringify(message));
  }
}

function* startGameWorker(socket) {
  while (true) {
    const message = yield take('START_GAME');
    socket.send(JSON.stringify(message));
  }
}

function* closeConnection(socket) {
  const message = yield take("CLOSE_WEBSOCKET");
  // socket.send(JSON.stringify(message));
  socket.close();
  yield put({ type: SET_WS, payload: null });
}

function* wsWorker(action) {
  const socket = yield call(createWebSocketConnection);
  const socketChannel = yield call(createSocketChannel, socket);

  yield fork(updateStatus, socket);
  yield fork(closeConnection, socket);
  yield fork(joinGameWorker, socket);
  yield fork(startGameWorker, socket);

  while (true) {
    try {
      const backAction = yield take(socketChannel);
      yield put(backAction);
    } catch (e) {
      console.log("socket error", e);
    }
  }
}

export default function* wsWatcher() {
  yield takeEvery(SOCKET_INIT, wsWorker);
}
