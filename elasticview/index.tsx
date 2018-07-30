import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import * as classNames from 'classnames';
import * as _ from 'lodash';
import * as React from 'react';
import { IElementComponent } from '../../../dbweb-core/eleContext';
import { eleComponent } from '../../../dbweb-core/store';
import * as actions from './action';
import { IRow } from './action';
import Select from './inlineSelect';
import operates from './operate';
import reducer, { IElasticViewState } from './reducer';
const styles = (theme: Theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column' as 'column',
		flex: 'auto'
	},
	edtColumn: {
		width: 200,
		zIndex: 2
	},
	edtOperate: {
		width: 150,
		zIndex: 2
	},
	edtValue: {
		width: 300
	},
	queryControl: {
		marginLeft: theme.spacing.unit
	},
	tableContainer: {
		flex: 'auto',
		overflow: 'auto'
	},
	table: {
		whiteSpace: 'nowrap' as 'nowrap',
		width: 'auto'
	},
	tableHead: {
		'& th': {
			backgroundColor: 'white',
			position: 'sticky' as 'sticky',
			top: 0,
			zIndex: 1
		}
	},
	bottomBar: {
		padding: '4px 12px 6px 12px'
	},
	btnSearch: {
		marginBottom: 4
	}
});
let id = 0;
function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
	id += 1;
	return { id, name, calories, fat, carbs, protein };
}

const data = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Gingerbread', 356, 16.0, 49, 3.9)
];
interface IElasticViewProps extends WithStyles<typeof styles>, IElementComponent {
	fetchData: typeof actions.fetchData;
	data: IRow[];
	queryFunc?: string;
	queryColumn?: string;
	queryOperate?: string;
	queryValue?: string;
}

class ElasticView extends React.PureComponent<IElasticViewProps> {
	public render() {
		const { classes } = this.props;
		const fieldList = [
			{ value: 'chocolate', label: 'Chocolate' },
			{ value: 'strawberry', label: 'Strawberry' },
			{ value: 'vanilla', label: 'Vanilla' }
		];
		return (
			<div className={classes.root}>
				<div>
					<Select
						id="edtColumn"
						options={fieldList}
						className={classNames(classes.queryControl, classes.edtColumn)}
						placeholder="选择指标"
					/>
					<Select
						id="edtOperate"
						options={_.map(operates, (v, k) => ({ value: k, label: k + '(' + v + ')' }))}
						className={classNames(classes.queryControl, classes.edtOperate)}
						placeholder="运算符"
					/>
					<TextField
						id="edtValue"
						label="值"
						className={classNames(classes.queryControl, classes.edtValue)}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton>
										<Icon>edit</Icon>
									</IconButton>
								</InputAdornment>
							)
						}}
					/>
					<div className={classes.queryControl} style={{ display: 'inline-block' }}>
						<Button variant="contained" size="medium" color="primary" className={classes.btnSearch}>
							<Icon>search</Icon> 确定
						</Button>
					</div>
				</div>
				<div className={classes.tableContainer}>
					<Table className={classes.table}>
						<TableHead className={classes.tableHead}>
							<TableRow>
								<TableCell>序号</TableCell>
								<TableCell padding="checkbox">
									<Checkbox />
								</TableCell>
								<TableCell>Dessert (100g serving)</TableCell>
								<TableCell numeric={true}>
									Caloriesssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
								</TableCell>
								<TableCell numeric={true}>
									Fatfffffffffffffffffffffffffffffffffffffffffffffffffffffffff (g)
								</TableCell>
								<TableCell numeric={true}>
									Carbs
									(g)aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
								</TableCell>
								<TableCell numeric={true}>
									Protein
									(g)2222222222222222222222222222222222mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((n, i) => {
								return (
									<TableRow key={n.id} role="checkbox">
										<TableCell numeric={true}>{i + 1}</TableCell>
										<TableCell padding="checkbox">
											<Checkbox />
										</TableCell>
										<TableCell component="th" scope="row">
											{n.name}
										</TableCell>
										<TableCell numeric={true}>{n.calories}</TableCell>
										<TableCell numeric={true}>{n.fat}</TableCell>
										<TableCell numeric={true}>{n.carbs}</TableCell>
										<TableCell numeric={true}>{n.protein}</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</div>
				<div className={classes.bottomBar}>
					<IconButton color="default" disabled={true}>
						<Icon>chevron_left</Icon>
					</IconButton>
					<IconButton color="primary" title="记录总数">
						?
					</IconButton>
					<IconButton color="default">
						<Icon>chevron_right</Icon>
					</IconButton>
					{'   '}
					<Button>新增</Button>
					<Button>导入</Button>
					<Button>全部删除</Button>
				</div>
			</div>
		);
	}
}

const mapState = (state: IElasticViewState) => {
	return {
		data: state.data,
		queryFunc: state.queryFunc,
		queryColumn: state.queryColumn,
		queryOperate: state.queryOperate,
		queryValue: state.queryValue
	};
};
const mapDispatch = {
	fetchData: actions.fetchData
};

const StyledElasticView = withStyles(styles)(ElasticView);
export default eleComponent(mapState, mapDispatch, reducer)(StyledElasticView);
