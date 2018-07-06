import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Paper from '@material-ui/core/Paper';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import { IElementComponent } from 'src/dbweb-core/eleContext';
import { eleComponent } from 'src/dbweb-core/store';

import * as actions from './action';
import { IRow } from './action';
import reducer from './reducer';
import { IFetchDataParam, ITerm, Order } from './service';

import Button from '@material-ui/core/Button';

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',


    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        fontSize: 12,

    },
    tableContainer: {
        height: "80vh",
        overflowY: 'scroll'
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    table: {
        minWidth: 700,

    },
    tableHead: {
        backgroundColor: "#fff",
        position: "sticky",
        top: 0
    },
    tablePagination: {
        backgroundColor: "#fff",
        position: "sticky",
        bottom: 0
    },
    searchButton: {
        marginLeft: 10,
        marginBottom: 10
    },
    bottomToolBar: {
        position: "absolute",
        bottom: 0,
        height: "2.5em",
        margin: 10,
        fontSize: 14,
        zIndex: 999
    },
    toolbarButtonLeft: {
        borderRadius: "10px 0px 0px 10px",
    },
    toolbarButtonMiddle: {
        borderRadius: 0
    },
    toolbarButtonRight: {
        borderRadius: "0px 10px 10px 0px",
    },
    recordNum: {
        margin: 20
    }
});


interface IElasticViewProps extends WithStyles<typeof styles>, IElementComponent {
    fetchData: typeof actions.fetchData;
    data: IRow[];
    searchRequestData: IFetchDataParam
}
class ElasticView extends React.PureComponent<IElasticViewProps> {
    public state = {

        DisplayColumns: [
            { Column: "NAME", Label: "名称", Hidden: false, Order: Order.None },
            { Column: "LABEL", Label: "标签", Hidden: false, Order: Order.None },
            { Column: "CONTROLLER", Label: "模块", Hidden: false, Order: Order.None },
            { Column: "DEPT", Label: "部门代码", Hidden: false, Order: Order.None },
            { Column: "PUB", Label: "公共", Hidden: false, Order: Order.None },
            { Column: "CATEGORY", Label: "类别", Hidden: false, Order: Order.None },
        ],
        column: '',
        operator: '',
        searchContent: '',
        page: 0,
        rowsPerPage: 50
    };


    public componentWillMount() {
        if (this.props.element.SignStr) {
            // tslint:disable-next-line:no-console
            console.log('fetchdata');
            // this.props.fetchData(this.props.element.Name, this.props.element.SignStr, { Query: [{ Column: "DEPT", Operate: "=", Value: "r" }] });
            let { searchRequestData } = this.props;
            searchRequestData = {
                DisplayColumns: this.state.DisplayColumns
            }
            this.props.fetchData(this.props.element.Name, this.props.element.SignStr, searchRequestData);
        }
    }

    public handleChange = (name: string) => (event: any) => {
        this.setState({ [name]: event.target.value });
    };

    public handleChangePage = (event: any, page: number) => {
        this.setState({ page });
    };

    public handleChangeRowsPerPage = (event: any) => {
        this.setState({ rowsPerPage: event.target.value });
    };

    public handleKeyPress = (event: any) => {
        // Trigger search when Enter is pressed in textfield
        if (event.key === 'Enter') {
            this.handleSearch();
        }
    }

    public handleSearch = () => {
        let { searchRequestData } = this.props;
        const { column, operator, searchContent } = this.state;
        let QueryList: ITerm[] = [];
        if (column !== "" && operator !== "") {
            QueryList = [{ Column: column, Operate: operator, Value: searchContent }];
        }
        searchRequestData = {
            Query: QueryList,
            DisplayColumns: this.state.DisplayColumns
        }
        if (this.props.element.SignStr) {
            this.props.fetchData(this.props.element.Name, this.props.element.SignStr, searchRequestData);
        }
    }

    public render() {
        const mapping = {
            "NAME": "名称",
            "LABEL": "标签",
            "CONTROLLER": "模块",
            "DEPT": "部门代码",
            "PUB": "公共",
            "CATEGORY": "类别"
        }
        const { classes } = this.props;
        const { data } = this.props;
        const { rowsPerPage, page } = this.state;

        const tableRows: any = []
        const tableHeaders: any = []
        const columns: any = []
        const columnOptions: any = []

        // tslint:disable-next-line:no-console
        console.log(data)
        // tslint:disable-next-line:forin
        // data = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        for (const key in mapping) {
            if (mapping[key] !== undefined) {
                tableHeaders.push(<TableCell className={classes.tableHead} > {mapping[key]} </TableCell>);
                columns.push(mapping[key]);
                columnOptions.push(<option value={key}>{mapping[key]}</option>)
            }

        }
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < data.length; i++) {
            const tableCells = []
            // tslint:disable-next-line:forin
            for (const key in data[i]) {
                if (mapping[key] !== undefined) {
                    tableCells.push(
                        <TableCell component="th" scope="row">
                            {data[i][key]}
                        </TableCell>

                    );
                }
            }
            tableRows.push(<TableRow key={i}>{tableCells}</TableRow>)
        }
        return (
            <div>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="column">Column</InputLabel>
                        <NativeSelect
                            value={this.state.column}
                            onChange={this.handleChange('column')}
                            input={<Input name="column" id="column" />}
                        >

                            <option value="" />
                            {columnOptions}
                        </NativeSelect>

                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="operator">Operator</InputLabel>
                        <NativeSelect
                            value={this.state.operator}
                            onChange={this.handleChange('operator')}
                            input={<Input name="operator" id="operator" />}
                        >
                            <option value="" />
                            <option value="=">=（等于）</option>
                            <option value="?">?（包含）</option>
                            <option value="?>">?>（前缀）</option>
                            <option value="e">e（为空）</option>
                            <option value="!=">!=（不等于）</option>
                            <option value=">">>（大于）</option>
                            <option value=">=">>=（大于等于）</option>
                            <option value="<">&lt;（小于）</option>
                            <option value="<=">&lt;=（小于等于）</option>
                            <option value="!?">!?（不包含）</option>
                            <option value="!?>">!?>（非前缀）</option>
                            <option value="<?">&lt;?（后缀）</option>
                            <option value="!<?">!&lt;?（非后缀）</option>
                            <option value="in">in（在列表）</option>
                            <option value="!in">!in（不在列表）</option>
                            <option value="~">~（在列表）</option>
                            <option value="!~">!~（非正则）</option>
                            <option value="!e">!e（非空）</option>
                            <option value="_">_（长度等于）</option>
                            <option value="!_">!_（长度不等于）</option>
                            <option value="_>">_>（长度大于）</option>
                            <option value="_<">_&lt;（长度小于）</option>
                        </NativeSelect>

                    </FormControl>
                    <FormControl>
                        <TextField
                            id="searchContent"
                            label="Search for..."
                            margin="normal"
                            onChange={this.handleChange("searchContent")}
                            onKeyPress={this.handleKeyPress}
                        />

                    </FormControl>

                    <Button variant="contained" color="primary" className={classes.searchButton} onClick={this.handleSearch}>
                        确定
                    </Button>

                </div>
                <div>
                    <Paper className={classes.tableContainer}>
                        <Table className={classes.table}>
                            <TableHead >
                                <TableRow>
                                    {tableHeaders}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* {tableRows} */}
                                {data
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(n => {
                                        const rows = []

                                        for (const key in mapping) {
                                            if (key != null) {
                                                rows.push(<TableCell>{n[key]}</TableCell>)
                                            }
                                        }
                                        return (
                                            <TableRow
                                                hover={true}
                                                tabIndex={-1}
                                                key={n.id}
                                            >
                                                {rows}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                        <TablePagination
                            className={classes.tablePagination}
                            component="div"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            backIconButtonProps={{
                                'aria-label': 'Previous Page',
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'Next Page',
                            }}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            rowsPerPageOptions={[10, 25, 50]}
                        />
                    </Paper>
                </div>
                <div className={classes.bottomToolBar}>
                    <span className={classes.recordNum}>记录总数：{data.length}</span>
                    <Button variant="outlined" size="small" className={classes.toolbarButtonLeft}>
                        新增
                    </Button>
                    <Button variant="outlined" size="small" className={classes.toolbarButtonMiddle}>
                        成批替换
                    </Button>
                    <Button variant="outlined" size="small" className={classes.toolbarButtonMiddle}>
                        导出数据
                    </Button>
                    <Button variant="outlined" size="small" className={classes.toolbarButtonMiddle}>
                        汇总
                    </Button>
                    <Button variant="outlined" size="small" className={classes.toolbarButtonRight}>
                        连续操作
                    </Button>
                </div>
            </div>
        );
    }
}
const mapState = (state: any) => {
    return {
        data: state.data
    };
};
const mapDispatch = {
    fetchData: actions.fetchData
};

const StyledElasticView = withStyles(styles)(ElasticView);
export default eleComponent(mapState, mapDispatch, reducer)(StyledElasticView);
