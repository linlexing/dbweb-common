import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { IController } from './model/controller';


interface IIndex extends RouteComponentProps<any>, IController {

}
class Index extends React.Component<IIndex> {
    public render() {
        return <div>{this.props.element.Name}</div>;
    }
}
export default withRouter(Index);