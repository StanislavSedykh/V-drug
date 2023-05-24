import { PlayerType } from "../../../../types/user/formTypes";

export const startGameAction = (payload) => ({
  type: 'START_GAME',
  payload,
});

export const voteAction = (payload : PlayerType) => ({
  type: 'VOTE',
  payload,
});

export const newRoundAction = (payload) => ({
  type: 'NEW_ROUND',
  payload,
});

export const joinGameAction = (payload) => ({
  type: 'JOIN_ROOM',
  payload
})

export const clearVote = (payload) => ({
  type: 'CLEAR_VOTE',
  payload
})