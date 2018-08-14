import { ActionType, getType } from 'typesafe-actions';

import * as actions from './action';
import { IRecordViewFetchDataResult } from './model';
export interface IElasticViewState {
	readonly data?: IRecordViewFetchDataResult;
	readonly queryFunc?: string;
	readonly queryColumn?: string;
	readonly queryOperate?: string;
	readonly queryOpeFunc?: string;
	readonly queryOpeColumn?: string;
	readonly queryValue?: string;
}

type Actions = ActionType<typeof actions>;
export default (state: IElasticViewState = {}, action: Actions): IElasticViewState => {
	switch (action.type) {
		case getType(actions.doSetData):
			return {
				...state,
				data: action.payload
			};
		default:
			return state;
	}
};
