import { Avatar, Grid, List, ListItem, Paper, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { compose } from 'redux';
import { IElementComponent } from '../../../dbweb-core/eleContext';
import { eleComponent } from '../../../dbweb-core/store';
import { doSetRefreshTime, fetchVersion, IChangeLog, IVersion } from './action';
import reducer from './reducer';

interface IProps extends IElementComponent, WithStyles<typeof styles> {
	refreshTime?: Date;
	versions?: IVersion[];
	language?: string;
	rootLanguage: string;
	fetchVersion: typeof fetchVersion;
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
		const { element, refreshTime, language, rootLanguage } = this.props;
		// 超过15秒 或者 首次 或者 语言被切换
		if (
			!refreshTime ||
			(new Date().getTime() - new Date(refreshTime).getTime()) / 1000 > 15 ||
			language !== rootLanguage
		) {
			this.props.fetchVersion(element.Name, element.SignStr, rootLanguage);
			doSetRefreshTime(new Date());
		}
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
		(state, rootState) => ({
			...state,
			rootLanguage: rootState.root.language
		}),
		{ fetchVersion, doSetRefreshTime },
		reducer
	),
	withStyles(styles)
)(Version);
