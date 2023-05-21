import axios from 'axios';
import type { ThunkActionCreater } from '../../store';
import { Platform } from 'react-native';
import { setCount } from './countSlicer';
import { CountGameType, GameType } from '../../../../types/game/game';
import {API_URL} from '@env'

export const setCountThunk: ThunkActionCreater<CountGameType> =
  (gameData) =>
  (dispatch) => {
    axios
      .post<GameType>(
        `http://${
          Platform.OS === 'android' || Platform.OS === 'ios'
            ? `${API_URL}`
            : 'localhost'
        }:3001/api/games`,
        gameData
      )
      .then(({ data }) => dispatch(setCount(data.count)))
      .catch((err) => console.log(err));
  };
