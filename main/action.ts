import { createAction } from 'typesafe-actions';

import { IElement } from '../model/element';


const doIniti = createAction('initi', resolve => {
    return (data: {
        modules: object,
        apiRootPath: string
    }) => resolve(data);
})
const doRefresh = createAction('refresh', resolve => {
    return (elements: IElement[]) => resolve(elements);
})
export { doIniti, doRefresh }