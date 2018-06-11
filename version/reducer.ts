import { ActionType, getType } from 'typesafe-actions';

import * as actions from './action';
import { IVersion } from './action';

interface IIndexState {
    readonly refreshTime?: Date;
    readonly versions?: IVersion[];
}
type Actions = ActionType<typeof actions>;
export default (state: IIndexState = {}, action: Actions): IIndexState => {
    switch (action.type) {
        case getType(actions.doSetVersions):
            return {
                refreshTime: action.payload.refreshTime,
                versions: action.payload.versions
            };
        default:
            return state;
    }
};
