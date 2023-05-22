import { SET_WS, SOCKET_INIT } from "../../types/webSocket/webSocket";


export const setWs = (payload) => ({ type: SET_WS, payload });
export const socketInit = () => ({ type: SOCKET_INIT });