import { UserType } from "../../../types/user/formTypes";
import {
  WS_CLOSE,
  WS_CONNECT,
  WS_INIT,
  WS_USER_ONLINE,
  WsCloseActionType,
  WsConnectActionType,
  WsInitActionType,
  WsUserOnLineAction,
} from "../../../types/webSocket/webSocket";

export const wsInitAction = (): WsInitActionType => ({
  type: WS_INIT,
});

export const wsConnectAction = (): WsConnectActionType => ({
  type: WS_CONNECT,
});

export const wsCloseAction = (): WsCloseActionType => ({
  type: WS_CLOSE,
});

export const wsUserOnlineAction = (users: UserType[]): WsUserOnLineAction => ({
  type: WS_USER_ONLINE,
  payload: users,
});
