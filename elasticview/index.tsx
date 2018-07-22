import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import * as _ from 'lodash';
import * as React from 'react';
import { IElementComponent } from 'src/dbweb-core/eleContext';
import { eleComponent } from 'src/dbweb-core/store';
import * as actions from './action';
import { IRow } from './action';
import operates from './operate';
import reducer, { IElasticViewState } from './reducer';

const styles = (theme: Theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column' as 'column',
		flex: 'auto'
	},
	queryControl: {
		margin: theme.spacing.unit,
		minWidth: 120
		// fontSize: 12
	},
	tableContainer: {
		flex: 'auto',
		overflow: 'auto'
	},
	table: {
		whiteSpace: 'nowrap' as 'nowrap',
		width: 'auto'
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
		return (
			<div className={classes.root}>
				<div>
					<TextField id="edtColumn" select={true} label="指标" className={classes.queryControl} />
					<TextField id="edtOperate" select={true} label="运算符" className={classes.queryControl}>
						{_.map(operates, (v, k) => (
							<MenuItem value={k} key={k}>
								{k}（{v}）
							</MenuItem>
						))}
					</TextField>
					<TextField id="edtValue" label="值" className={classes.queryControl} />
					<Button variant="fab" mini={true} color="primary">
						<Icon>search</Icon>
					</Button>
				</div>
				<div className={classes.tableContainer}>
					<Table className={classes.table}>
						<TableHead>
							<TableRow>
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
							{data.map(n => {
								return (
									<TableRow key={n.id}>
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
