import { END, eventChannel } from "redux-saga";
import { SET_WS, SOCKET_INIT } from "../../types/webSocket/webSocket";
import { Platform } from "react-native";
import { call, put, take, takeEvery } from "redux-saga/effects";

function createSocketChannel(socket, action) {
  return eventChannel((emit) => {
    socket.onopen = () => {
      console.log("action----->", action?.type);
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
    `ws://${Platform.OS === "android" ? "192.168.2.252" : "localhost"}:3001`
  );
  console.log("Created WS:", newSocket);
  return newSocket;
}

function* wsWorker(action) {
  const socket = yield call(createWebSocketConnection);
  const socketChannel = yield call(createSocketChannel, socket, action);

  while (true) {
    try {
      const backAction = yield take(socketChannel);
      yield put(backAction);
    } catch {
      console.log("socket error");
    }
  }
}

export default function* wsWatcher() {
  yield takeEvery(SOCKET_INIT, wsWorker);
}
