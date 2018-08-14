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
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { IElementComponent } from '../../../dbweb-core/eleContext';
import { eleComponent } from '../../../dbweb-core/store';
import * as actions from './action';
import Select from './inlineSelect';
import messages from './locales';
import { BUTTON_OK, OPERATE, SELECT_COLUMN, VALUE } from './locales/ids';
import { IRecordViewFetchDataResult } from './model';
import { operates, operatesEN } from './operate';
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
		width: 180,
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
	tableRow: {
		backgroundColor: theme.palette.common.white,
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.background.default
		}
	},
	tableHead: {
		'& th': {
			backgroundColor: theme.palette.grey['300'],
			color: theme.palette.common.black,
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

interface IElasticViewProps extends WithStyles<typeof styles>, IElementComponent, InjectedIntlProps {
	language: string;
	fetchData: typeof actions.fetchData;
	data: IRecordViewFetchDataResult;
	queryFunc?: string;
	queryColumn?: string;
	queryOperate?: string;
	queryValue?: string;
}

class RecordView extends React.PureComponent<IElasticViewProps> {
	public componentWillMount() {
		this.props.fetchData(this.props.element.Name, this.props.element.SignStr!);
	}
	public render() {
		const { classes, data } = this.props;
		const titles = data.DisplayColumns.map(val => <TableCell key={val.Name}>{val.Name}</TableCell>);
		const rows = data.Rows.map(row => {
			return (
				<TableRow key={row.Key} role="checkbox" className={classes.tableRow}>
					<TableCell numeric={true}>{row.RowNum + 1}</TableCell>
					<TableCell padding="checkbox">
						<Checkbox />
					</TableCell>
					{data.DisplayColumns.map(val => (
						<TableCell numeric={val.Type === 'INT' || val.Type === 'FLOAT'} key={val.Name}>
							{row.Data[val.Name]}
						</TableCell>
					))}
				</TableRow>
			);
		});
		return (
			<div className={classes.root}>
				{this.renderSearch()}
				<div className={classes.tableContainer}>
					<Table className={classes.table}>
						<TableHead className={classes.tableHead}>
							<TableRow>
								<TableCell>序号</TableCell>
								<TableCell padding="checkbox">
									<Checkbox />
								</TableCell>
								{titles}
							</TableRow>
						</TableHead>
						<TableBody>{rows}</TableBody>
					</Table>
				</div>
				{this.renderProcess()}
			</div>
		);
	}
	private renderProcess() {
		const { classes } = this.props;
		return (
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
		);
	}
	private renderSearch() {
		const { classes, intl, language, data } = this.props;
		const fieldList = data.Columns.map(val => ({ value: val.Name, label: val.Name }));
		return (
			<div>
				<Select
					id="edtColumn"
					options={fieldList}
					className={classNames(classes.queryControl, classes.edtColumn)}
					placeholder={intl.formatMessage({ id: SELECT_COLUMN })}
				/>
				<Select
					id="edtOperate"
					options={_.map(language === 'en' ? operatesEN : operates, (v, k) => ({
						value: k,
						label: k + '(' + v + ')'
					}))}
					className={classNames(classes.queryControl, classes.edtOperate)}
					placeholder={intl.formatMessage({ id: OPERATE })}
				/>
				<TextField
					id="edtValue"
					label={intl.formatMessage({ id: VALUE })}
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
						<Icon>search</Icon>
						<FormattedMessage id={BUTTON_OK} />
					</Button>
				</div>
			</div>
		);
	}
}

const mapState = (state: IElasticViewState, rootState: any) => {
	return {
		language: rootState.root.language,
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

const StyledRecordView = injectIntl(withStyles(styles)(RecordView));
export default eleComponent(mapState, mapDispatch, reducer, messages)(StyledRecordView);
