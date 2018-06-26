import { ActionType, getType } from 'typesafe-actions';

import * as actions from './action';
import { IRow } from './action';

interface IElasticViewState {
    readonly data?: IRow[];
}
type Actions = ActionType<typeof actions>;
export default (state: IElasticViewState = {}, action: Actions): IElasticViewState => {
    switch (action.type) {
        case getType(actions.doSetData):
            return {
                ...state,
                data: action.payload.Data
            };
        default:
            return state;
    }
};
