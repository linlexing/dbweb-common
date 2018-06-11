import { createAction } from 'typesafe-actions';

const changeUserName = createAction('[index]changeUserName', resolve => (val: string) => resolve(val));
export { changeUserName };

// const SET_LOGIN_PENDING = "SET_LOGIN_PENDING";
// const SET_LOGIN_SUCCESS = "SET_LOGIN_SUCCESS";
// const SET_LOGIN_ERROR = "SET_LOGIN_ERROR";

const setLoginPending = createAction('setLoginPending', resolve => (isLoginPending: boolean) =>
    resolve(isLoginPending)
);

const setLoginSuccess = createAction('setLoginSuccess', resolve => (isLoginSuccess: boolean) =>
    resolve(isLoginSuccess)
);

const setLoginError = createAction('setLoginError', resolve => (isLoginError: boolean) => resolve(isLoginError));

const saveUser = createAction('saveUser', resolve => (user: string) => resolve(user));

const savePassword = createAction('savePassword', resolve => (passwd: string) => resolve(passwd));

export { saveUser, savePassword, setLoginError, setLoginPending, setLoginSuccess };
