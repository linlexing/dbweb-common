import { ActionType, getType } from "typesafe-actions";

import * as actions from "./action";

interface IIndexState {
    readonly userName: string;
}
type Actions = ActionType<typeof actions>;
export default (state: IIndexState = { userName: "" }, action: Actions): IIndexState => {
    switch (action.type) {
        case getType(actions.changeUserName):
            return {
                ...state,
                userName: action.payload
            };
        default:
            return state;
    }
};
