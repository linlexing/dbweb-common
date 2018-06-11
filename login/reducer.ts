import { ActionType, getType } from "typesafe-actions";

import * as actions from "./action";

export interface ILoginState {
  readonly username: string;
  readonly password: string;
  isLoginPending: boolean;
  isLoginSuccess: boolean;
  isloginError: boolean;
}

type Actions = ActionType<typeof actions>;
export default (
  state: ILoginState = {
    username: "",
    password: "",
    isLoginPending: false,
    isLoginSuccess: false,
    isloginError: false
  },
  action: Actions
): ILoginState => {
  switch (action.type) {
    case getType(actions.saveUser):
      return {
        ...state,
        username: action.payload
      };
    case getType(actions.savePassword):
      return {
        ...state,
        password: action.payload
      };
    case getType(actions.setLoginPending):
      return {
        ...state,
        isLoginPending: action.payload
      };
    case getType(actions.setLoginSuccess):
      return {
        ...state,
        isLoginSuccess: action.payload
      };
    case getType(actions.setLoginError):
      return {
        ...state,
        isloginError: action.payload
      };
    default:
      return state;
  }
};
