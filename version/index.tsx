import { Avatar, Grid, List, ListItem, Paper, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { Dispatch } from 'react-redux';
import { compose } from 'redux';
import { IElement } from 'src/dbweb-core/model';

import { APIGet } from '../../../dbweb-core/api';
import { IElementComponent } from '../../../dbweb-core/eleContext';
import { eleComponent } from '../../../dbweb-core/store';
import { doSetVersions, IChangeLog, IVersion } from './action';
import reducer from './reducer';

interface IProps extends IElementComponent, WithStyles<typeof styles> {
	refreshTime?: Date;
	versions?: IVersion[];
	getVersion: (element: IElement, refreshTime?: Date) => any;
}
const styles = (theme: Theme) => ({
	root: {
		padding: 40,
		flexGrow: 1,
		overflow: 'auto'
	},
	paper: theme.mixins.gutters({
		paddingTop: 16,
		paddingBottom: 16,
		marginTop: theme.spacing.unit * 3
	}),
	avatar: {
		margin: 10
	},
	listItem: {
		padding: '8 12'
	}
});

class Version extends React.PureComponent<IProps> {
	constructor(props: IProps) {
		super(props);
		this.state = {};
	}
	public componentWillMount() {
		this.props.getVersion(this.props.element, this.props.refreshTime);
	}
	public render() {
		const { classes } = this.props;
		const verLogs = (log: IChangeLog) => (
			<ListItem key={log.Version} style={{ paddingTop: 0, paddingBottom: 0 }}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'flex-start'
					}}>
					<Typography variant="subheading" style={{ paddingTop: 12 }}>
						{new Date(log.Time).toJSON().substr(0, 10)}
					</Typography>
					<List style={{ paddingTop: 10, paddingBottom: 0 }}>
						{log.Logs.map((one, idx) => (
							<ListItem style={{ paddingTop: 2, paddingBottom: 2 }} key={idx}>
								{one}
							</ListItem>
						))}
					</List>
				</div>
			</ListItem>
		);
		const moduleVer = (ver: IVersion) => (
			<Grid item={true} key={ver.Name}>
				<Paper className={classes.paper}>
					<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
						<Typography variant="title">{ver.Name}</Typography>
						<Avatar className={classes.avatar}>{ver.MaxVer}</Avatar>
					</div>
					<List>{ver.Logs.map(verLogs)}</List>
				</Paper>
			</Grid>
		);
		if (this.props.versions) {
			return (
				<div className={classes.root}>
					<Grid container={true} spacing={16} direction="column">
						{this.props.versions.map(moduleVer)}
					</Grid>
				</div>
			);
		} else {
			return null;
		}
	}
}
export default compose(
	eleComponent(
		state => state,
		(dispatch: Dispatch, ownProps: any) => ({
			getVersion: (element: IElement, refreshTime?: string) => {
				// tslint:disable-next-line:no-console
				console.log('refreshtime', refreshTime, typeof refreshTime);
				if (!refreshTime || (new Date().getTime() - new Date(refreshTime).getTime()) / 1000 > 15) {
					APIGet<IVersion[]>(element.Name, 'version', element.SignStr).then(data => {
						dispatch(doSetVersions({ refreshTime: new Date(), versions: data.data }));
					});
				}
			}
		}),
		reducer
	),
	withStyles(styles)
)(Version);
