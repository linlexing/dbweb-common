export interface IFetchDataParam {
	Divide: string[]; // 分隔行的主键值
	Order: string[]; // 排序的字段
	Field: string; // 字段
	Opt: string; // 运算符
	Value: string; // 值
	SelType: string; // 选择类型
	SelKeys: string[]; // 选择的主键
	Limit: number; // 每页最多行数
	DivideRowNum: number; // 开始行号
	RowCount: number; // 总记录数
	Pub: string; // 公用模板
	Pri: string; // 私有模板
}

interface IRowData {
	[key: string]: any;
}
interface IRenderRow {
	RowNum: number;
	Checked: boolean; // 是否被选中
	Key: string; // 该行关联的主键值，多字段用csv格式组合
	Data: IRowData;
}
interface IColumnType {
	Name: string;
	Type: string;
}
export interface IRecordViewFetchDataResult {
	Rows: IRenderRow[];
	Columns: IColumnType[];
	DisplayColumns: IColumnType[];
	RowCount: number; // 一般为0，除非最后一页，通过最后的序号得出总数
	DownRowNum: number; // 下一页用到的起始序号
	DownDivide: string; // 下一页用到的起始分界值
}
