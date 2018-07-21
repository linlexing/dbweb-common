import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import { IElementComponent } from 'src/dbweb-core/eleContext';
import { eleComponent } from 'src/dbweb-core/store';
import * as actions from './action';
import { IRow } from './action';
import reducer, { IElasticViewState } from './reducer';
const styles = (theme: Theme) => ({});
interface IElasticViewProps extends WithStyles<typeof styles>, IElementComponent {
	fetchData: typeof actions.fetchData;
	data: IRow[];
	queryFunc?: string;
	queryColumn?: string;
	queryOperate?: string;
	queryValue?: string;
}
class ElasticView extends React.PureComponent<IElasticViewProps> {
	public componentWillMount() {
		if (this.props.element.SignStr) {
			// tslint:disable-next-line:no-console
			console.log('fetchdata');

			const searchRequestData = {};
			this.props.fetchData(this.props.element.Name, this.props.element.SignStr, searchRequestData);
		}
	}

	public render() {
		const { queryColumn, queryFunc } = this.props;
		return (
			<div>
				<TextField id="columnFun" select={true} label="函数" value={queryFunc} />

				<TextField id="columnName" select={true} label="指标" value={queryColumn} />
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
