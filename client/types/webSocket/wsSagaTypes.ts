import { UserType } from "../user/user";

export const WS_INIT = "WS_INIT";
export type WsInitActionType = {
  type: typeof WS_INIT;
};

export const WS_CONNECT = "WS_CONNECT";
export type WsConnectActionType = {
  type: typeof WS_CONNECT;
};

export const WS_CLOSE = "WS_CLOSE";
export type WsCloseActionType = {
  type: typeof WS_CLOSE;
};

export const WS_USER_ONLINE = "WS_USER_ONLINE";

export type WsUserOnLineAction = {
    type: typeof WS_USER_ONLINE,
    payload: User[]
}

export type WsSagaTypes =
  | WsInitActionType
  | WsConnectActionType
  | WsCloseActionType;
