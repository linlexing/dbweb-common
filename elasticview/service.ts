export enum Order {
    None = 'NONE',
    Asc = 'ASC',
    Desc = 'DESC'
}
export interface ITerm {
    Column: string;
    Operate: string;
    Value: string;
}
interface IDisplayColumn {
    Column: string;
    Label: string;
    Hidden: boolean;
    Order: Order;
}
export interface IFetchDataParam {
    Query?: ITerm[];
    DisplayColumns?: IDisplayColumn[];
}
