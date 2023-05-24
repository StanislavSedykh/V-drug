import axios from 'axios';
import { ThunkActionCreater } from '../../store';
import { ParticipantsType } from '../../../../types/participants/participants';
import { Platform } from 'react-native';
import { API_URL } from '@env';

export const setFactThunk: ThunkActionCreater<ParticipantsType['fact']> =
  (factData) => (dispatch) => {
    axios.post<ParticipantsType>(
      `http://${
        Platform.OS === 'android' || Platform.OS === 'ios'
          ? API_URL
          : 'localhost'
      }:3001/api/facts`,
      { fact: factData } 
    );
  };
