import axios from 'axios';
import type { ThunkActionCreater } from '../../store';
import { Platform } from 'react-native';
import { setCount } from './countSlicer';
import { CountGameType, GameType, PinPartType } from '../../../../types/game/game';
import { API_URL } from '@env';
import { setPin } from './pinSlicer';

export const setCountThunk: ThunkActionCreater<CountGameType> =
  (gameData) => (dispatch) => {
    axios
      .post<GameType>(
        `http://${
          Platform.OS === 'android' || Platform.OS === 'ios'
            ? API_URL
            : 'localhost'
        }:3001/api/games`,
        gameData
      )
      .then(({ data }) => dispatch(setCount(data.count)))
      .catch((err) => console.log(err));
  };

export const deleteGameThunk: ThunkActionCreater = () => (dispatch) => {
  axios.delete(
    `http://${
      Platform.OS === 'android' || Platform.OS === 'ios'
        ? API_URL
        : 'localhost'
    }:3001/api/games`
  );
};

export const setPinThunk: ThunkActionCreater = () => (dispatch) => {
  axios(
    `http://${
      Platform.OS === 'android' || Platform.OS === 'ios'
        ? API_URL
        : 'localhost'
    }:3001/api/games`
  )
    .then(({ data }) => dispatch(setPin(data)))
    .catch((err) => console.log(err));
};

export const setPinPartThank: ThunkActionCreater<PinPartType> =
  (pinPartData) => (dispatch) => {
    axios.post<GameType['pin']>(
      `http://${
        Platform.OS === 'android' || Platform.OS === 'ios'
          ? API_URL
          : 'localhost'
      }:3001/api/participants`,
      pinPartData
    );
  };
