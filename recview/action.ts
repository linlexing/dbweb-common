import { Dispatch } from 'redux';
import { createAction } from 'typesafe-actions';
import { APIPost } from '../../../dbweb-core/api';
import { IFetchDataParam, IRecordViewFetchDataResult } from './model';

const fetchData = (eleName: string, signStr: string, param?: IFetchDataParam) => {
	return (dispatch: Dispatch) => {
		APIPost<IRecordViewFetchDataResult>(eleName, 'recviewFetchData', signStr, param).then(val => {
			// tslint:disable-next-line:no-console
			console.log(val.data);

			dispatch(doSetData(val.data));
			// tslint:disable-next-line:no-console
			console.log('fetch end');
		});
	};
};
const doSetData = createAction('[recView]doSetData', resolve => (val: IRecordViewFetchDataResult) => resolve(val));
const doSetQueryColumn = createAction('[recView]doSetQueryColumn', resolve => (val: string) => resolve(val));
const doSetQueryOperate = createAction('[recView]doSetQueryOperate', resolve => (val: string) => resolve(val));
const doSetQueryValue = createAction('[recView]doSetQueryValue', resolve => (val: string) => resolve(val));
const changeOperator = createAction('[recView]changeOperator', resolve => (val: string) => resolve(val));
export { fetchData, doSetData, changeOperator, doSetQueryColumn, doSetQueryOperate, doSetQueryValue };
