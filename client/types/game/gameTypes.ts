import { PlayerType } from "../user/formTypes";


export type RoomType = {
    id: number;
    userid: number;
    pin: string;
    User: PlayerType
}

export type RoomSliceType = {
    allRooms: RoomType[];
}


export type GameStateInfoType = {
    allPlayers: PlayerType[];
    roomPin: string | null;
    round: number | 0;
    userid: number | null;
    vote: [],
}





export type GameStatePlayerFindType = GameStateInfoType & {
    status: 'PlayerFind';
}


export type GameStateChoosePictureType = GameStateInfoType & {
    status: 'ChooseFacts';
}


export type GameStateInProcessType = GameStateInfoType & {
    status: 'InProcess';
}

export type GameStateLoadingType = GameStateInfoType & {
    status: 'Pending';
}
export type GameStateFinishedType = GameStateInfoType & {
    status: 'Finished';
}





export type GameStateType = GameStatePlayerFindType | GameStateChoosePictureType | GameStateInProcessType | GameStateFinishedType | GameStateLoadingType;
