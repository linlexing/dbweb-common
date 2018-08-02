import { ActionType, getType } from 'typesafe-actions';

import * as actions from './action';
import { IVersion } from './action';

interface IIndexState {
	readonly language?: string;
	readonly refreshTime?: Date;
	readonly versions?: IVersion[];
}
type Actions = ActionType<typeof actions>;
export default (state: IIndexState = {}, action: Actions): IIndexState => {
	switch (action.type) {
		case getType(actions.doSetVersions):
			return {
				...state,
				language: action.payload.language,
				versions: action.payload.versions
			};
		case getType(actions.doSetRefreshTime):
			return {
				...state,
				refreshTime: action.payload
			};
		default:
			return state;
	}
};
