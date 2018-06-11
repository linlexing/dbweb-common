import { createAction } from "typesafe-actions";

const changeUserName = createAction(
  "[index]changeUserName",
  resolve => (val: string) => resolve(val)
);
export { changeUserName };

// const SET_LOGIN_PENDING = "SET_LOGIN_PENDING";
// const SET_LOGIN_SUCCESS = "SET_LOGIN_SUCCESS";
// const SET_LOGIN_ERROR = "SET_LOGIN_ERROR";

const setLoginPending = createAction(
  "setLoginPending",
  resolve => (isLoginPending: boolean) => resolve(isLoginPending)
);

const setLoginSuccess = createAction(
  "setLoginSuccess",
  resolve => (isLoginSuccess: boolean) => resolve(isLoginSuccess)
);

const setLoginError = createAction(
  "setLoginError",
  resolve => (isLoginError: any) => resolve(isLoginError)
);

function callLoginApi(user: string, password: string, callback: any) {
  setTimeout(() => {
    if (user === "user" && password === "123456") {
      return callback(null);
    } else {
      return callback(new Error("Invalid email and password"));
    }
  }, 1000);
}

export function login() {
  return (dispatch: any, getState: any) => {
    setLoginPending(true);
    setLoginSuccess(false);
    setLoginError(null);

    const user = getState().username;
    const password = getState().password;

    callLoginApi(user, password, (error: any) => {
      setLoginPending(false);
      if (!error) {
        setLoginSuccess(true);
      } else {
        setLoginError(true);
      }
    });
  };
}

const saveUser = createAction("saveUser", resolve => (user: string) =>
  resolve(user)
);

const savePassword = createAction("savePassword", resolve => (passwd: string) =>
  resolve(passwd)
);

export {
  saveUser,
  savePassword,
  setLoginError,
  setLoginPending,
  setLoginSuccess
};
