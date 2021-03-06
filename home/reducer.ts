import { ActionType, getType } from 'typesafe-actions';

import * as actions from './action';

export interface IHomeStore {
	readonly menuOpen: boolean;
	readonly userMenuOpen: boolean;
	readonly langMenuOpen: boolean;
	readonly elementState: {};
}

type Actions = ActionType<typeof actions>;

export default (
	state: IHomeStore = { menuOpen: true, elementState: {}, userMenuOpen: false, langMenuOpen: false },
	action: Actions
): IHomeStore => {
	switch (action.type) {
		case getType(actions.doOpenMenu):
			return {
				...state,
				menuOpen: true
			};
		case getType(actions.doHideMenu):
			return {
				...state,
				menuOpen: false
			};
		case getType(actions.doToggleUserMenu):
			return {
				...state,
				userMenuOpen: action.payload
			};
		case getType(actions.doToggleLangMenu):
			return {
				...state,
				langMenuOpen: action.payload
			};
		default:
			return state;
	}
};
