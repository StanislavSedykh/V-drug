import axios from "axios";
import type { ThunkActionCreater } from "../../store";
import {
  LoginType,
  PlayerType,
  SignUpType,
} from "../../../../types/user/formTypes";
import { logoutUser, setName } from "./userSlicer";
import { Platform } from "react-native";
import { setScore } from "./csoreSlicer";
import { setStatus } from "../fetchingSlice/fetchingSlice";
import { setError } from "../error/errorSlice";
import { setUser } from "./userSlicer";

export const checkUserThunk: ThunkActionCreater = () => (dispatch) => {
  axios(
    `http://${
      Platform.OS === "android" || Platform.OS === "ios"
        ? "192.168.2.252"
        : "localhost"
    }:3001/api/auth/check`
  )
    .then(({ data }) => dispatch(setUser({ ...data, status: "logged" })))
    .catch((e) => {
      console.log(e);
      dispatch(setUser({ status: "guest" }));
    });
};

export const logoutThunk: ThunkActionCreater = () => (dispatch) => {
  axios
    .post(
      `http://${
        Platform.OS === "android" || Platform.OS === "ios"
          ? "192.168.2.252"
          : "localhost"
      }:3001/api/auth/logout`
    )
    .then(() => {dispatch(logoutUser()); dispatch(setStatus("guest"))})
    .catch((err) => console.log(err));
};

export const signUpThunk: ThunkActionCreater<SignUpType> =
  (userData) => (dispatch) => {
    axios
      .post<PlayerType>(
        `http://${
          Platform.OS === "android" || Platform.OS === "ios"
            ? "192.168.2.252"
            : "localhost"
        }:3001/api/auth/signup`,
        userData
      )
      .then(({ data }) => {
        dispatch(setName(data));
        dispatch(setStatus("logged"));
      })
      .catch(() => {
        dispatch(setError({ error: "Login zanyat" }));
        dispatch(setStatus("guest"));
      });
  };

export const loginThunk: ThunkActionCreater<LoginType> =
  (userData) => (dispatch) => {
    axios
      .post<BackendUserType>(
        `http://${
          Platform.OS === "android" || Platform.OS === "ios"
            ? "192.168.2.252"
            : "localhost"
        }:3001/api/auth/login`,
        userData
      )
      .then(({ data }) => dispatch(setUser({ ...data, status: "logged" })))
      .catch((err) => console.log(err));
  };

export const scoreThunk: ThunkActionCreater = () => (dispatch) => {
  axios(
    `http://${
      Platform.OS === "android" || Platform.OS === "ios"
        ? "192.168.2.252"
        : "localhost"
    }:3001/api/scores`
  )
    .then(({ data }) => dispatch(setScore(data.score)))
    .catch((err) => console.log(err));
};
