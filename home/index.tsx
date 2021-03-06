// tslint:disable:no-console
import {
	AppBar,
	Badge,
	Divider,
	Drawer,
	Icon,
	IconButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	MenuList,
	Toolbar,
	Tooltip,
	Typography,
	WithStyles
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import * as classNames from 'classnames';
import * as _ from 'lodash';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Switch } from 'react-router';
import { Link, Route, RouteComponentProps } from 'react-router-dom';
import { compose } from 'redux';
import { logout } from '../../../dbweb-core/login';
import MainComponent from '../../../dbweb-core/main/content';
import { elementRouterURL, IDept, IElement } from '../../../dbweb-core/model';
import * as rootActions from '../../../dbweb-core/root/action';
import { PROJECT_LABEL } from '../../../dbweb-core/store';
import withStatic from '../../../dbweb-core/withStatic';
import * as actions from './action';
import DeptList from './deptList';
import { clearText } from './label';
import LanguageMenuItem from './langMenuItem';
import messages from './locales';
import { VER } from './locales/ids';
import Menus from './menus';
import { NotFound } from './notfound';
import reducer, { IHomeStore } from './reducer';
import { clsNames, styles } from './style';
interface IHomeEvents {
	openMenu: () => any;
	hideMenu: () => any;
	toggleUserMenu: (open: boolean) => any;
	toggleLangMenu: (open: boolean) => any;
	setLanguage: (lang: string) => any;
}
interface IHomeProps extends IHomeEvents, IHomeStore, RouteComponentProps<any>, WithStyles<clsNames> {
	projectLabel: string;
	publicEles: IElement[];
	elements: IElement[];
	userName: string;
	dept: IDept;
	toRootDept: IDept[];
	nextLevelDept: IDept[];
	serviceVersion: number;
	brand: string;
	selElement: IElement;
	language: string;
}
interface IStates {
	userMenuAnchorEl: HTMLElement | null;
	langMenuAnchorEl: HTMLElement | null;
}
class Home extends React.PureComponent<IHomeProps, IStates> {
	constructor(props: IHomeProps) {
		super(props);
		this.state = {
			userMenuAnchorEl: null,
			langMenuAnchorEl: null
		};
		this.onUserIconClick = this.onUserIconClick.bind(this);
		this.onUserMenuClose = this.onUserMenuClose.bind(this);
		this.onLangIconClick = this.onLangIconClick.bind(this);
		this.onLangMenuClose = this.onLangMenuClose.bind(this);
		this.logout = this.logout.bind(this);
	}

	public render() {
		const { menuOpen, classes, elements, publicEles } = this.props;

		return (
			<div className={classes.appFrame}>
				{this.renderAppBar()}
				{this.renderLeftMenu()}
				<main
					className={classNames(classes.content, classes[`content-left`], {
						[classes.contentShift]: menuOpen,
						[classes['contentShift-left']]: menuOpen
					})}>
					<div className={classes['content-top']} />
					<Switch>
						{elements &&
							_.union(publicEles, elements).map<JSX.Element>(
								(val): any => {
									return (
										<Route key={val.Name} path={'/front/' + val.Name}>
											<MainComponent element={val} />
										</Route>
									);
								}
							)}
						<Route key="not found" component={NotFound} />
					</Switch>
				</main>
			</div>
		);
	}
	private renderUserMenu() {
		const { userMenuOpen, nextLevelDept, toRootDept } = this.props;
		const { userMenuAnchorEl } = this.state;
		return (
			<Menu
				id="userMenu"
				anchorEl={userMenuAnchorEl}
				open={userMenuOpen}
				onClose={this.onUserMenuClose}
				anchorReference="anchorEl"
				getContentAnchorEl={undefined} // 这一行必须要加，参见：https://github.com/mui-org/material-ui/issues/10804
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
				disableAutoFocusItem={true}>
				<MenuList role="menu">
					<MenuItem onClick={this.logout}>
						<ListItemIcon>
							<Icon>exit_to_app</Icon>
						</ListItemIcon>
						<ListItemText primary="退出系统" inset={true} />
					</MenuItem>
					{nextLevelDept.map(val => <DeptList key={val.Code} dept={val} />)}
					{toRootDept.length > 0 ? <Divider /> : null}
					{toRootDept.length > 0 ? toRootDept.map(val => <DeptList key={val.Code} dept={val} />) : null}
				</MenuList>
			</Menu>
		);
	}
	private renderAppBar() {
		const { language, menuOpen, classes, elements, publicEles, openMenu, userName, dept } = this.props;
		const selEleName = location.pathname.split('/');
		let selEle;

		if (selEleName.length > 2) {
			selEle = _.find(elements, { Name: decodeURIComponent(selEleName[2]) });
			if (!selEle) {
				selEle = _.find(publicEles, { Name: decodeURIComponent(selEleName[2]) });
			}
		}
		return (
			<AppBar
				className={classNames(classes.appBar, {
					[classes.appBarShift]: menuOpen
				})}>
				<Toolbar disableGutters={!menuOpen}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={openMenu}
						className={classNames(classes.menuButton, menuOpen && classes.hide)}>
						<Icon>menu</Icon>
					</IconButton>
					<Typography variant="title" color="inherit" noWrap={true} className={classes.toolbarText}>
						{selEle
							? clearText(language === 'en' ? selEle.LabelEN || selEle.Label : selEle.Label)
							: 'not found'}
					</Typography>

					<Tooltip title={userName + ' ' + dept.Code + '.' + dept.Name}>
						<IconButton color="inherit" onClick={this.onUserIconClick}>
							<Icon>account_circle</Icon>
						</IconButton>
					</Tooltip>
					{this.renderUserMenu()}
					<IconButton color="inherit">
						<Badge badgeContent={4} color="secondary">
							<Icon>notifications</Icon>
						</Badge>
					</IconButton>
					<IconButton
						color="inherit"
						style={{ marginRight: menuOpen ? 0 : 24 }}
						onClick={this.onLangIconClick}>
						<Icon>language</Icon>
					</IconButton>
					{this.renderLanguageMenu()}
				</Toolbar>
			</AppBar>
		);
	}
	private renderLanguageMenu() {
		const { langMenuAnchorEl } = this.state;
		const { langMenuOpen } = this.props;
		const languages = [{ code: 'en', name: 'English' }, { code: 'zh-CN', name: '中文(简体)' }];
		return (
			<Menu
				id="langMenu"
				anchorEl={langMenuAnchorEl}
				open={langMenuOpen}
				onClose={this.onLangMenuClose}
				anchorReference="anchorEl"
				getContentAnchorEl={undefined} // 这一行必须要加，参见：https://github.com/mui-org/material-ui/issues/10804
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
				disableAutoFocusItem={true}>
				<MenuList role="menu">
					{_.map(languages, lange => (
						<LanguageMenuItem
							key={lange.code}
							code={lange.code}
							name={lange.name}
							onClick={this.onLangMenuClose}
						/>
					))}
				</MenuList>
			</Menu>
		);
	}

	private renderLeftMenu() {
		const { menuOpen, classes, theme, projectLabel, hideMenu, brand, serviceVersion } = this.props;
		return (
			<Drawer
				variant="persistent"
				anchor="left"
				open={menuOpen}
				classes={{
					paper: classes.drawerPaper
				}}>
				<div className={classes.drawerHeader}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							paddingLeft: 20,
							color: theme ? theme.palette.grey['600'] : undefined
						}}>
						<Typography
							variant="title"
							color="inherit"
							noWrap={true}
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyItems: 'center',
								marginBottom: 4,
								fontWeight: theme ? theme.typography.fontWeightRegular : undefined
							}}>
							<Icon>{brand.length > 0 ? brand : 'home'}</Icon>
							<span>
								<FormattedMessage id={PROJECT_LABEL} defaultMessage={projectLabel} />
							</span>
						</Typography>
						<Typography variant="caption" color="inherit" noWrap={true}>
							<FormattedMessage id={VER} />:<Link
								style={{ textDecoration: 'none', color: 'inherit' }}
								to={elementRouterURL('version')}>
								{serviceVersion}
							</Link>
						</Typography>
					</div>
					<IconButton onClick={hideMenu} style={{ color: theme && theme.palette.grey['500'] }}>
						{theme && theme.direction === 'rtl' ? <Icon>chevron_right</Icon> : <Icon>chevron_left</Icon>}
					</IconButton>
				</div>
				<Divider />
				<Menus />
			</Drawer>
		);
	}

	private onUserIconClick(event: React.MouseEvent<HTMLElement>) {
		if (!this.props.userMenuOpen) {
			this.setState({ userMenuAnchorEl: event.currentTarget });
		} else {
			this.setState({ userMenuAnchorEl: null });
		}
		this.props.toggleUserMenu(!this.props.userMenuOpen);
	}
	private onLangIconClick(event: React.MouseEvent<HTMLElement>) {
		if (!this.props.langMenuOpen) {
			this.setState({ langMenuAnchorEl: event.currentTarget });
		} else {
			this.setState({ langMenuAnchorEl: null });
		}
		this.props.toggleLangMenu(!this.props.langMenuOpen);
	}
	private logout() {
		this.props.toggleUserMenu(false);
		this.props.toggleLangMenu(false);
		logout();
	}
	private onUserMenuClose() {
		this.setState({ userMenuAnchorEl: null });
		this.props.toggleUserMenu(false);
	}
	private onLangMenuClose() {
		this.setState({ langMenuAnchorEl: null });
		this.props.toggleLangMenu(false);
	}
}

const mapStateToProps = (state: any) => ({
	...state.home,
	userName: state.root.userName,
	elements: state.root.elements,
	publicEles: state.root.publicEles,
	projectLabel: state.root.projectLabel,
	dept: state.root.dept,
	brand: state.root.brand,
	serviceVersion: state.root.serviceVersion,
	toRootDept: state.root.toRootDept,
	nextLevelDept: state.root.nextLevelDept,
	language: state.root.language
});
const mapDispatchToProps = {
	openMenu: actions.doOpenMenu,
	hideMenu: actions.doHideMenu,
	toggleUserMenu: actions.doToggleUserMenu,
	toggleLangMenu: actions.doToggleLangMenu,
	setLanguage: rootActions.doSetLanguage
};
export default compose(
	withStyles(styles, { withTheme: true }),
	withStatic(reducer, messages),
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(Home);
