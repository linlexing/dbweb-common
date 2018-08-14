import {
	Button,
	Checkbox,
	createStyles,
	Dialog,
	DialogTitle,
	Divider,
	FormControl,
	Icon,
	IconButton,
	Input,
	InputAdornment,
	InputLabel,
	MenuItem,
	NativeSelect,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	Theme,
	WithStyles,
	withStyles
} from '@material-ui/core';
import * as React from 'react';
import { IElementComponent } from 'src/dbweb-core/eleContext';
import { eleComponent } from 'src/dbweb-core/store';
import * as actions from './action';
import { IRow } from './action';
import reducer from './reducer';
import { IFetchDataParam, ITerm, Order } from './service';

const styles = (theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			height: '100%'
		},
		formControl: {
			margin: theme.spacing.unit,
			minWidth: 120
			// fontSize: 12
		},
		tableContainer: {
			width: '100%',
			height: '100%',
			overflow: 'auto'
		},
		tableBody: {
			backgroundColor: '#fff'
		},
		selectEmpty: {
			marginTop: theme.spacing.unit * 2
		},
		tableCheckbox: {
			backgroundColor: '#fff',
			position: 'sticky',
			left: 0
		},
		tableCheckAll: {
			backgroundColor: '#fff',
			position: 'sticky',
			top: 0,
			zIndex: 2
		},
		tableHead: {
			backgroundColor: '#fff',
			position: 'sticky',
			top: 0,
			zIndex: 1
		},
		tablePagination: {
			backgroundColor: '#fff',
			position: 'sticky',
			bottom: 0
		},
		searchButton: {
			marginLeft: 10,
			marginBottom: 10
		},
		bottomToolBar: {
			position: 'absolute',
			bottom: 0,
			height: '2.5em',
			margin: 10,
			// fontSize: 14,
			zIndex: 999
		},
		toolbarButtonLeft: {
			borderRadius: '10px 0px 0px 10px'
		},
		toolbarButtonMiddle: {
			borderRadius: 0
		},
		toolbarButtonRight: {
			borderRadius: '0px 10px 10px 0px'
		},
		recordNum: {
			margin: 20
		},
		editSearch: {
			height: '50vh',
			width: '40vw',
			padding: 30
		},
		editSearchInput: {
			width: '100%',
			border: '1px solid',
			borderColor: '#80bdff',
			boxShadow: '0 0 0 0.1rem rgba(0,123,255,.25)'
		},
		dialogButton: {
			margin: 10,
			float: 'right'
		}
	});

interface IElasticViewProps extends WithStyles<typeof styles>, IElementComponent {
	fetchData: typeof actions.fetchData;
	data: IRow[];
	searchRequestData: IFetchDataParam;
}
class ElasticView extends React.PureComponent<IElasticViewProps> {
	public state = {
		// columns to be selected from db
		DisplayColumns: [
			{ Column: 'NAME', Label: '名称', Hidden: false, Order: Order.None },
			{ Column: 'LABEL', Label: '标签', Hidden: false, Order: Order.None },
			{ Column: 'CONTROLLER', Label: '模块', Hidden: false, Order: Order.None },
			{ Column: 'DEPT', Label: '部门代码', Hidden: false, Order: Order.None },
			{ Column: 'PUB', Label: '公共', Hidden: false, Order: Order.None },
			{ Column: 'CATEGORY', Label: '类别', Hidden: false, Order: Order.None }
		],
		column: '' /* "Column" field of the search parameter inputs */,
		operator: '' /* "Operator" field of the search parameter inputs */,
		searchContent: '' /* "Search For..." field of the search parameter inputs */,
		page: 0 /* current page*/,
		rowsPerPage: 50 /* rows per page */,
		selected: [''] /* ids of selected rows */,
		isEditSearchOpen: false /* state to control if editing search content list is open */,
		newSearchValue: '' /* stores the input value in the editing search content list window */
	};

	public componentWillMount() {
		if (this.props.element.SignStr) {
			// tslint:disable-next-line:no-console
			console.log('fetchdata');
			let { searchRequestData } = this.props;
			searchRequestData = {
				DisplayColumns: this.state.DisplayColumns
			};
			this.props.fetchData(this.props.element.Name, this.props.element.SignStr, searchRequestData);
		}
	}

	/* on click of the "select all rows" checkbox */
	public handleCheckAll = (event: any, checked: boolean) => {
		if (checked) {
			this.setState(state => ({ selected: this.props.data.map(n => n.id) }));
			return;
		}
		this.setState({ selected: [] });
	};

	/* returns if the row is selected */
	public isSelected = (id: any) => this.state.selected.indexOf(id) !== -1;

	/* on click of selecting a row */
	public handleClickRow = (event: any, id: string) => {
		const { selected } = this.state;
		const selectedIndex = selected.indexOf(id);
		let newSelected: any[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}
		this.setState({ selected: newSelected });
	};

	/* handle change of the "Column", "Operator", "Search for..." inputs */
	public handleChange = (name: string) => (event: any) => {
		this.setState({ [name]: event.target.value });
	};

	public handleChangePage = (event: any, page: number) => {
		this.setState({ page });
	};

	public handleChangeRowsPerPage = (event: any) => {
		this.setState({ rowsPerPage: event.target.value });
	};

	/* triggers search when enter is pressed when cursor is at "Search for" input */
	public handleKeyPress = (event: any) => {
		// Trigger search when Enter is pressed in textfield
		if (event.key === 'Enter') {
			this.handleSearch();
		}
	};

	public handleSearch = () => {
		let { searchRequestData } = this.props;
		const { column, operator, searchContent } = this.state;
		let QueryList: ITerm[] = [];
		if (column !== '' && operator !== '') {
			QueryList = [{ Column: column, Operate: operator, Value: searchContent }];
		}
		searchRequestData = {
			Query: QueryList,
			DisplayColumns: this.state.DisplayColumns
		};
		if (this.props.element.SignStr) {
			this.props.fetchData(this.props.element.Name, this.props.element.SignStr, searchRequestData);
		}
	};

	public handleCloseSearch = () => {
		this.setState({ isEditSearchOpen: false });
	};

	public handleOpenSearch = () => {
		this.setState({
			isEditSearchOpen: true,
			newSearchValue: this.state.searchContent.split(',').join('\n')
		});
	};

	public editSearchConfirm = () => {
		const arr = this.state.newSearchValue.split('\n');
		for (let i = 0; i < arr.length; i++) {
			let s = arr[i];
			if (s.includes(',')) {
				s = '"' + s + '"';
				arr[i] = s;
			}
		}
		const newValue = arr.join(',');
		this.setState({ searchContent: newValue });
		this.handleCloseSearch();
	};

	public onChangeEditSearch = (event: any) => {
		this.setState({ newSearchValue: event.target.value });
	};

	public render() {
		const { classes } = this.props;
		const { data } = this.props;
		const { rowsPerPage, page, DisplayColumns } = this.state;

		const tableRows: any = [];
		const tableHeaders: any = [];
		const columns: any = [];
		const columnOptions: any = [];

		const mapping = {};
		for (const column of DisplayColumns) {
			mapping[column.Column] = column.Label;
		}

		// tslint:disable-next-line:no-console
		// console.log(data);
		// tslint:disable-next-line:forin
		for (const key in mapping) {
			tableHeaders.push(<TableCell className={classes.tableHead}> {mapping[key]} </TableCell>);
			columns.push(DisplayColumns[key]);
			columnOptions.push(<option value={key}>{mapping[key]}</option>);
		}

		for (let i = 0; i < data.length; i++) {
			const tableCells = [];
			for (const key in data[i]) {
				if (mapping[key] !== undefined) {
					tableCells.push(
						<TableCell component="th" scope="row">
							{data[i][key]}
						</TableCell>
					);
				}
			}
			tableRows.push(<TableRow key={i}>{tableCells}</TableRow>);
		}
		return (
			<div className={classes.root}>
				<div>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="column">Column</InputLabel>
						<NativeSelect
							value={this.state.column}
							onChange={this.handleChange('column')}
							input={<Input name="column" id="column" />}>
							<option value="" />
							{columnOptions}
						</NativeSelect>
					</FormControl>

					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="operator">Operator</InputLabel>
						<Select
							value={this.state.operator}
							onChange={this.handleChange('operator')}
							input={<Input name="operator" id="operator" />}>
							<MenuItem value="" />
							<MenuItem value="=">=（等于）</MenuItem>
							<MenuItem value="?">?（包含）</MenuItem>
							<MenuItem value="?>">?>（前缀）</MenuItem>
							<MenuItem value="e">e（为空）</MenuItem>
							<MenuItem value="!=">!=（不等于）</MenuItem>
							<MenuItem value=">">>（大于）</MenuItem>
							<MenuItem value=">=">>=（大于等于）</MenuItem>
							<MenuItem value="<">&lt;（小于）</MenuItem>
							<MenuItem value="<=">&lt;=（小于等于）</MenuItem>
							<MenuItem value="!?">!?（不包含）</MenuItem>
							<MenuItem value="!?>">!?>（非前缀）</MenuItem>
							<MenuItem value="<?">&lt;?（后缀）</MenuItem>
							<MenuItem value="!<?">!&lt;?（非后缀）</MenuItem>
							<MenuItem value="in">in（在列表）</MenuItem>
							<MenuItem value="!in">!in（不在列表）</MenuItem>
							<MenuItem value="~">~（正则）</MenuItem>
							<MenuItem value="!~">!~（非正则）</MenuItem>
							<MenuItem value="!e">!e（非空）</MenuItem>
							<MenuItem value="_">_（长度等于）</MenuItem>
							<MenuItem value="!_">!_（长度不等于）</MenuItem>
							<MenuItem value="_>">_>（长度大于）</MenuItem>
							<MenuItem value="_<">_&lt;（长度小于）</MenuItem>
						</Select>
					</FormControl>
					<FormControl>
						<InputLabel htmlFor="searchContent">Search for...</InputLabel>
						<Input
							value={this.state.searchContent}
							id="searchContent"
							onChange={this.handleChange('searchContent')}
							onKeyPress={this.handleKeyPress}
							endAdornment={
								<InputAdornment position="end">
									<IconButton>
										<Icon onClick={this.handleOpenSearch}>edit</Icon>
									</IconButton>
								</InputAdornment>
							}
						/>
						<Dialog
							onClose={this.handleCloseSearch}
							aria-labelledby="simple-dialog-title"
							open={this.state.isEditSearchOpen}>
							<DialogTitle id="simple-dialog-title">在列表的值编辑</DialogTitle>
							<Divider />
							<div className={classes.editSearch}>
								<Input
									multiline={true}
									rows={12}
									className={classes.editSearchInput}
									onChange={this.onChangeEditSearch}
									defaultValue={this.state.newSearchValue}
								/>
								<Button
									variant="contained"
									color="primary"
									className={classes.dialogButton}
									onClick={this.editSearchConfirm}>
									确定
								</Button>
								<Button
									variant="contained"
									className={classes.dialogButton}
									onClick={this.handleCloseSearch}>
									取消
								</Button>
							</div>
						</Dialog>
					</FormControl>

					<Button
						variant="contained"
						color="primary"
						className={classes.searchButton}
						onClick={this.handleSearch}>
						确定
					</Button>
				</div>
				<div className={classes.tableContainer}>
					<Paper>
						<Table className={classes.tableBody}>
							<TableHead>
								<TableRow>
									<TableCell
										className={`${this.props.classes.tableCheckbox} ${
											this.props.classes.tableCheckAll
										}`}>
										<Checkbox onChange={this.handleCheckAll} />
									</TableCell>
									{tableHeaders}
								</TableRow>
							</TableHead>
							<TableBody>
								{data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
									const rows = [];
									const isSelected = this.isSelected(n.id);
									// tslint:disable-next-line:forin
									for (const key in mapping) {
										rows.push(<TableCell>{n[key]}</TableCell>);
									}
									return (
										<TableRow
											hover={true}
											tabIndex={-1}
											key={n.id}
											// tslint:disable-next-line:jsx-no-lambda
											onClick={event => this.handleClickRow(event, n.id)}>
											<TableCell className={classes.tableCheckbox}>
												<Checkbox checked={isSelected} />
											</TableCell>
											{rows}
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</Paper>
				</div>
				<TablePagination
					className={classes.tablePagination}
					component="div"
					count={data.length}
					rowsPerPage={rowsPerPage}
					page={page}
					backIconButtonProps={{
						'aria-label': 'Previous Page'
					}}
					nextIconButtonProps={{
						'aria-label': 'Next Page'
					}}
					onChangePage={this.handleChangePage}
					onChangeRowsPerPage={this.handleChangeRowsPerPage}
					rowsPerPageOptions={[10, 25, 50]}
				/>
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
