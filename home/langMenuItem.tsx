import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import * as React from 'react';
import { connect } from 'react-redux';
import * as rootActions from 'src/dbweb-core/root/action';
interface IProps {
	code: string;
	name: string;
	onClick?: () => void;
	language: string;
	setLanguage: (lang: string) => any;
}
class LanguageMenuItem extends React.PureComponent<IProps> {
	constructor(props: IProps) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}
	public render() {
		const { code, name, language } = this.props;
		return (
			<MenuItem onClick={this.onClick} key={code}>
				{language === code ? (
					<ListItemIcon>
						<Icon>flag</Icon>
					</ListItemIcon>
				) : null}
				<ListItemText primary={name} inset={true} />
			</MenuItem>
		);
	}
	private onClick() {
		this.props.setLanguage(this.props.code);
		if (this.props.onClick) {
			this.props.onClick();
		}
	}
}
export default connect(
	(state: any) => ({
		language: state.root.language
	}),
	{ setLanguage: rootActions.doSetLanguage }
)(LanguageMenuItem);
