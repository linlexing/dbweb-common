import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { IController } from '../../dbweb-core/model/controller';

interface IIndex extends RouteComponentProps<any>, IController {

}
class Index extends React.Component<IIndex> {
    public render() {
        return <div>{this.props.element.Name}</div>;
    }
}
export default { Name: "index", Component: Index, Reducer: (state: any, action: any) => state }