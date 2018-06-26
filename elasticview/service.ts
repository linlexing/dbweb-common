enum Order {
    None = 'NONE',
    Asc = 'ASC',
    Desc = 'DESC'
}
interface ITerm {
    Column: string;
    Operate: string;
    Value: string;
}
interface IDisplayColumn {
    Column: string;
    Hidden: boolean;
    Order: Order;
}
export interface IFetchDataParam {
    Query?: ITerm[];
    DisplayColumns?: IDisplayColumn[];
}
