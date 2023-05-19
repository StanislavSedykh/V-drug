import { WS_CLOSE, WS_CONNECT, WS_INIT, WsCloseActionType, WsConnectActionType, WsInitActionType } from "../../../types/webSocket/wsSagaTypes";

export const wsInitAction = (): WsInitActionType => ({
    type: WS_INIT
});


export const wsConnectAction = (): WsConnectActionType => ({
    type: WS_CONNECT
});


export const wsCloseAction = (): WsCloseActionType => ({
    type: WS_CLOSE
})