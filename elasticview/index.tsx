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
        height: "76vh",
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
});


interface IElasticViewProps extends WithStyles<typeof styles>, IElementComponent {
    fetchData: typeof actions.fetchData;
    data: IRow[];
}
class ElasticView extends React.PureComponent<IElasticViewProps> {
    public state = {
        column: '',
        operator: '',
        page: 0,
        rowsPerPage: 50
    };

    public componentWillMount() {
        if (this.props.element.SignStr) {
            // tslint:disable-next-line:no-console
            console.log('fetchdata');
            // this.props.fetchData(this.props.element.Name, this.props.element.SignStr, { Query: [{ Column: "DEPT", Operate: "=", Value: "r" }] });
            this.props.fetchData(this.props.element.Name, this.props.element.SignStr, {});
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

        // tslint:disable-next-line:no-console
        console.log(data)
        // tslint:disable-next-line:forin
        // data = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        for (const key in data[1]) {
            if (mapping[key] !== undefined) {
                tableHeaders.push(<TableCell className={classes.tableHead} > {mapping[key]} </TableCell>);
                columns.push(mapping[key]);
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
                            <option value="NAME">名称</option>
                            <option value="LABEL">标签</option>
                            <option value="DEPT">部门代码</option>
                            <option value="DEPT-NAME">部门代码</option>
                            <option value="CATEGORY">类别</option>
                            <option value="CONTROLLER">模块</option>
                            <option value="PUB">公共</option>
                            <option value="OWNER">角色使用次数</option>
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
                        />

                    </FormControl>

                    <Button variant="contained" color="primary" className={classes.searchButton}>
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

                                                role="checkbox"

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
    // changeOperator: actions.changeOperator
};

const StyledElasticView = withStyles(styles)(ElasticView);
export default eleComponent(mapState, mapDispatch, reducer)(StyledElasticView);
