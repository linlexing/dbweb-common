import { Button, Input } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { RouteComponentProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import { APIGet } from '../../../dbweb-core/api';
import { IElementComponent } from '../../../dbweb-core/eleContext';
import { eleComponent } from '../../../dbweb-core/store';
import * as actions from './action';
import message from './locales';
import { HERE } from './locales/ids';
import reducer from './reducer';

interface IIndex extends RouteComponentProps<any>, IElementComponent {
	userName: string;
	userNameChange: (event: any) => any;
}
class Index extends React.PureComponent<IIndex> {
	public render() {
		return (
			<div>
				<FormattedMessage id={HERE} />
				{this.props.element.Name}
				<Button onClick={this.click}>click me</Button>
				<Input value={this.props.userName} onChange={this.props.userNameChange} />
			</div>
		);
	}
	private click() {
		APIGet('index', 'test').then(() => alert('ok'));
	}
}
const mapState = (state: any) => {
	return state || { userName: '' };
};
const mapDispatch = (dispatch: Dispatch) => {
	return {
		userNameChange: (event: any) => dispatch(actions.changeUserName(event.target.value))
	};
};
export default eleComponent(mapState, mapDispatch, reducer, message)(Index);
