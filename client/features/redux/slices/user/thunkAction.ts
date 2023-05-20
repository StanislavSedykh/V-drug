import axios from 'axios';
import type { ThunkActionCreater } from '../../store';
import { BackendUserType } from '../../../../types/user/user';
import { LoginType, SignUpType } from '../../../../types/user/formTypes';
import { logoutUser, setUser } from './userSlicer';
import { Platform } from 'react-native';
import { setScore } from './csoreSlicer';

export const checkUserThunk: ThunkActionCreater = () => (dispatch) => {
  axios<BackendUserType>('/api/auth/check')
    .then(({ data }) => dispatch(setUser({ ...data, status: 'logged' })))
    .catch(() => dispatch(setUser({ status: 'guest' })));
};

export const logoutThunk: ThunkActionCreater = () => (dispatch) => {
  axios
    .post(
      `http://${
        Platform.OS === 'android' || Platform.OS === 'ios'
          ? '192.168.1.204'
          : 'localhost'
      }:3001/api/auth/logout`
    )
    .then(() => dispatch(logoutUser()))
    .catch((err) => console.log(err));
};

export const signUpThunk: ThunkActionCreater<SignUpType> =
  (userData) => (dispatch) => {
    axios
      .post<BackendUserType>(
        `http://${
          Platform.OS === 'android' || Platform.OS === 'ios'
            ? '192.168.1.204'
            : 'localhost'
        }:3001/api/auth/signup`,
        userData
      )
      .then(({ data }) => dispatch(setUser({ ...data, status: 'logged' })))
      .catch((err) => console.log(err));
  };

export const loginThunk: ThunkActionCreater<LoginType> =
  (userData) => (dispatch) => {
    axios
      .post<BackendUserType>(
        `http://${
          Platform.OS === 'android' || Platform.OS === 'ios'
            ? '192.168.1.204'
            : 'localhost'
        }:3001/api/auth/login`,
        userData
      )
      .then(({ data }) => dispatch(setUser({ ...data, status: 'logged' })))
      .catch((err) => console.log(err));
  };

export const scoreThunk: ThunkActionCreater = () => (dispatch) => {
  axios(
      `http://${
        Platform.OS === 'android' || Platform.OS === 'ios'
          ? '192.168.1.204'
          : 'localhost'
      }:3001/api/scores`
    )
    .then(({ data }) => dispatch(setScore(data.score)))
    .catch((err) => console.log(err));
};
