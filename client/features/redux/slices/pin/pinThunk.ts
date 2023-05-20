import axios from 'axios';
import type { ThunkActionCreater } from '../../store';
import { Platform } from 'react-native';
import { setPin } from './pinSlicer';
import { GameType } from '../../../../types/game/game';

export const setPinThunk: ThunkActionCreater = (count) => (dispatch) => {
  axios
    .post<GameType>(
      `http://${
        Platform.OS === 'android' || Platform.OS === 'ios'
          ? '192.168.1.204'
          : 'localhost'
      }:3001/api/games`,
      count
    )
    .then(({data}) => dispatch(setPin(data.pin))).catch((err) => console.log(err));;
};
