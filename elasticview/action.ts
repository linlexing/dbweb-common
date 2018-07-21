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
			console.log(val.data);

			dispatch(doSetData(val.data));
			// tslint:disable-next-line:no-console
			console.log('fetch end');
		});
	};
};
const doSetData = createAction('[elasticView]doSetData', resolve => (val: IElasticViewFetchDataResult) => resolve(val));
const doSetQueryColumn = createAction('[elasticView]doSetQueryColumn', resolve => (val: string) => resolve(val));
const doSetQueryOperate = createAction('[elasticView]doSetQueryOperate', resolve => (val: string) => resolve(val));
const doSetQueryValue = createAction('[elasticView]doSetQueryValue', resolve => (val: string) => resolve(val));
const changeOperator = createAction('[elasticView]changeOperator', resolve => (val: string) => resolve(val));
export { fetchData, doSetData, changeOperator, doSetQueryColumn, doSetQueryOperate, doSetQueryValue };
