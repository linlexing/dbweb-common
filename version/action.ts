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
    resolve => (data: { refreshTime: Date; versions: IVersion[] }) => resolve(data)
);

export { doSetVersions };
