import { Dispatch } from 'react-redux';
import { APIGet } from 'src/dbweb-core/api';
import { createAction } from 'typesafe-actions';

export interface IChangeLog {
	Version: number;
	Time: Date;
	Logs: string[];
}
export interface IVersion {
	Name: string;
	Logs: IChangeLog[];
	MaxVer: number;
}
const doSetVersions = createAction(
	'[version]doSetVersions',
	resolve => (data: { language?: string; versions: IVersion[] }) => resolve(data)
);
const doSetRefreshTime = createAction('[version]doSetRefreshTime', resolve => (data: Date) => resolve(data));
const fetchVersion = (ele: string, signStr?: string, language?: string) => {
	return (dispatch: Dispatch) => {
		APIGet<IVersion[]>(ele, 'version', signStr, language).then(data => {
			dispatch(doSetVersions({ language, versions: data.data }));
		});
	};
};

export { fetchVersion, doSetVersions, doSetRefreshTime };
