import { ActionType, getType } from 'typesafe-actions';

import * as actions from './action';
import { IRow } from './action';

export interface IElasticViewState {
	readonly data?: IRow[];
	readonly queryFunc?: string;
	readonly queryColumn?: string;
	readonly queryOperate?: string;
	readonly queryOpeFunc?: string;
	readonly queryOpeColumn?: string;
	readonly queryValue?: string;
}
interface TermRow {
	func?: string;
	column?: string;
	operate?: string;
	opeFunc?: string;
	opeColumn?: string;
	value?: string;
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
