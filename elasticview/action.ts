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
            // tslint:disable-next-line:no-console
            console.log(val.data)

            dispatch(doSetData(val.data));
            // tslint:disable-next-line:no-console
            console.log("fetch end")
        });

    };
};
const doSetData = createAction('[elasticView]doSetData', resolve => (val: IElasticViewFetchDataResult) => resolve(val));
const changeOperator = createAction('[elasticView]changeOperator', resolve => (val: string) => resolve(val));
export { fetchData, doSetData, changeOperator };
