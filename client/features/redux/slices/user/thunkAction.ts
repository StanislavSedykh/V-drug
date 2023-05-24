import axios from "axios";
import type { ThunkActionCreater } from "../../store";
import {
  LoginType,
  SignUpType,
} from "../../../../types/user/formTypes";
import { logoutUser } from "./userSlicer";
import { Platform } from "react-native";
import { setScore } from "./csoreSlicer";
import { setUser } from "./userSlicer";
import {API_URL} from '@env'

export const checkUserThunk: ThunkActionCreater = () => (dispatch) => {
  axios(
    `http://${
      Platform.OS === 'android' || Platform.OS === 'ios'
        ? API_URL
        : 'localhost'
    }:3001/api/auth/check`
  )
    .then(({ data }) => dispatch(setUser({ ...data, status: 'logged' })))
    .catch(() => dispatch(setUser({ status: 'guest' })));
};

export const logoutThunk: ThunkActionCreater = () => (dispatch) => {
  axios
    .post(
      `http://${
        Platform.OS === 'android' || Platform.OS === 'ios'
          ? API_URL
          : 'localhost'
      }:3001/api/auth/logout`
    )
    .then(() => {dispatch(logoutUser()); dispatch(setStatus("guest"))})
    .catch((err) => console.log(err));
};

export const signUpThunk: ThunkActionCreater<SignUpType> =
  (apiUrl, options) => (dispatch) => {
    fetch(apiUrl, options).then((response) => response.json())
    .then((body) => dispatch(setUser({ ...body, status: 'logged' })))
      .catch((error) => {
        console.log('error', error);
      });
  };


export const loginThunk: ThunkActionCreater<LoginType> =
  (userData) => (dispatch) => {
    axios
      .post<BackendUserType>(
        `http://${
          Platform.OS === 'android' || Platform.OS === 'ios'
            ? API_URL
            : 'localhost'
        }:3001/api/auth/login`,
        userData
      )
      .then(({ data }) => dispatch(setUser({ ...data, status: "logged" })))
      .catch((err) => console.log(err));
  };

export const scoreThunk: ThunkActionCreater = () => (dispatch) => {
  axios(
      `http://${
        Platform.OS === 'android' || Platform.OS === 'ios'
          ? API_URL
          : 'localhost'
      }:3001/api/scores`
    )
    .then(({ data }) => dispatch(setScore(data.score)))
    .catch((err) => console.log(err));
};
