import { Dispatch } from 'redux';
import { APIPost } from 'src/dbweb-core/api';
import { createAction } from 'typesafe-actions';

import { IFetchDataParam } from './service';

export interface IRow {
    id: string;
    [key: string]: any;
}
interface IElasticViewFetchDataResult {
    Data: IRow[];
}
const fetchData = (eleName: string, signStr: string, param: IFetchDataParam) => {
    return (dispatch: Dispatch) => {
        APIPost<IElasticViewFetchDataResult>(eleName, 'esviewFetchData', signStr, param).then(val => {
            dispatch(doSetData(val.data));
        });
    };
};
const doSetData = createAction('[elasticView]doSetData', resolve => (val: IElasticViewFetchDataResult) => resolve(val));
export { fetchData, doSetData };
