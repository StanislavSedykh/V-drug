import { eventChannel, END } from 'redux-saga';
import type { EventChannel } from 'redux-saga';
import type { ActionPattern } from 'redux-saga/effects';
import { take, put, call, takeEvery, fork } from 'redux-saga/effects';
import { WS_CLOSE, WS_CONNECT, WS_INIT, type WsSagaTypes } from '../../types/wsSagaTypes';
import { wsCloseAction, wsConnectAction } from '../redux/wsActions';
import { wsSet } from '../redux/slices/wsSlice';


function createSocketChannel(socket: WebSocket): EventChannel<WsSagaTypes> {
    
    return eventChannel((emit) => {
      socket.onopen = () => {
        emit(wsConnectAction());
      };
  
      socket.onerror = function (error) {
        emit(wsCloseAction());
      };
  
      socket.onmessage = function (event: MessageEvent<string>) {
        const receivedData = JSON.parse(event.data) as WsSagaTypes;
        emit(receivedData);
      };
  
      socket.onclose = function (event) {
        emit(wsCloseAction());
      };
  
      return () => {
        console.log('Socket off');
        emit(END);
      };
    });
  }


  function* wsWorker(): Generator<unknown, void, WsSagaTypes> {
    const socket = new WebSocket('ws://localhost:3001');
    const socketChannel = yield call(createSocketChannel, socket);

    while(true){
      try{
        const actionFromBack = yield take(socketChannel as unknown as ActionPattern<WsSagaTypes>);
        console.log('----', actionFromBack)
        switch (actionFromBack.type) {
          case WS_CONNECT:
            yield put(wsSet(true))
            break;
          case WS_CLOSE:
            yield put(wsSet(false))
            break;
          default:
            break;
        }
      }catch{
        console.log('socket error');

      }
    }
  }

  export default function* wsWatcher(): Generator {
    yield takeEvery(WS_INIT, wsWorker);
  }