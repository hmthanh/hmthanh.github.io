import { LOGIN, LOGIN_FAILED, LOGIN_SUCCESS } from "../../constants/ActionType";
import { UrlApi } from "../../shares/baseUrl";
import { fetchFrom } from "../../utils/fetchHelper";

export const login = (data) => (dispatch) => {
  dispatch(LoginLoading());
  return (
    fetchFrom(UrlApi + "/api/auth", "POST", data)
      //.then(response => response.json())
      .then((response) => {
        // console.log(response)
        dispatch(LoginSuccess(response));
      })
      .catch((err) => {
        console.log(err);
        dispatch(LoginFailed());
      })
  );
};

export const relogin = (uId) => (dispatch) => {
  dispatch(LoginLoading());
  return (
    fetchFrom(UrlApi + "/api/auth/relogin", "POST", { uId })
      //.then(response => response.json())
      .then((response) => {
        console.log("relogin", response);
        dispatch(LoginSuccess(response));
      })
      .catch((err) => {
        console.log(err);
        dispatch(LoginFailed());
      })
  );
};

export const logout = () => (dispatch) => {
  dispatch(LoginSuccess({}));
};

export const LoginLoading = () => ({
  type: LOGIN,
});

export const LoginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const LoginFailed = (errMsg = "không thể kết nối đến server!!!") => ({
  type: LOGIN_FAILED,
  payload: errMsg,
});
