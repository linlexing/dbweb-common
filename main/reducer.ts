import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';

import { IElement } from '../model/element';
import * as actions from './action';

interface IMainProps {
    todo: {
        readonly modules: any// 所有的模块
        readonly apiRootPath: string// 访问Api时的根路径
    }
    far: {
        readonly elements: ReadonlyArray<IElement>
    }
}
type Actions = ActionType<typeof actions>
export default combineReducers<IMainProps, Actions>({
    todo: (state, action) => {
        if (state) {
            return state
        } return { modules: null, apiRootPath: "abc" }
    },
    far: (state, action) => {
        if (state) {
            return state
        } else {
            return { elements: [] }
        }
    }
})


