import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PlayerType } from "../../../../types/user/formTypes";
import { GameStateType } from "../../../../types/game/gameTypes";

const initialState: GameStateType = {
  status: null,
  allPlayers: [],
  round: 1,
  userid: null,
  vote: [],
  score: 0,
  trueVote: [],
};

export const gameSlice = createSlice({
  name: "Game",
  initialState: initialState,
  reducers: {
    setPlayerList: (state, action: PayloadAction<PlayerType[]>) => {
      state.allPlayers = action.payload;
    },

    addPlayers: (state, action: PayloadAction<PlayerType>) => {
      state.allPlayers = action.payload;
    },

    playerExit: (state, action: PayloadAction<PlayerType["id"]>) => {
      state.allPlayers = state.allPlayers.filter(
        (elem) => elem.id !== action.payload
      );
    },

    updatePlayers: (state, action: PayloadAction<PlayerType>) => {
      state.allPlayers = state.allPlayers.map((elem) =>
        elem.id === action.payload.id ? action.payload : elem
      );
    },

    updateGameStatus: (
      state,
      action: PayloadAction<GameStateType["status"]>
    ) => {
      state.status = action.payload;
    },

    setupRoom: (state, action: PayloadAction<{ userid: number }>) => {
      state.userid = action.payload.userid;
    },

    nextRound: (state) => {
      state.round += 1;
    },

    resetRoom: (state) => {
      state.status = null;
      state.allPlayers = [];
      state.round = 0;
      state.userid = null;
    },

    userVote: (state, action) => {
      state.vote.push(action.payload);
    },

    claerAllVote: (state) => {
      state.vote = [];
    },
    scoreUp: (state) => {
      state.score += 1;
    },
    trueVote: (state, action) => {
      state.trueVote.push(action.payload);
    },
  },
});

export const {
  setupRoom,
  nextRound,
  setPlayerList,
  updateGameStatus,
  resetRoom,
  updatePlayers,
  userVote,
  claerAllVote,
  scoreUp,
  trueVote,
} = gameSlice.actions;

export default gameSlice.reducer;
