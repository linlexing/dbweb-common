import * as React from 'react';
import { Dispatch } from 'redux';
import { IElementComponent } from 'src/dbweb-core/eleContext';
import { eleComponent } from 'src/dbweb-core/store';

import * as actions from './action';
import reducer from './reducer';

interface IElasticViewProps extends IElementComponent {
    fetchData: typeof actions.fetchData;
}
class ElasticView extends React.PureComponent<IElasticViewProps> {
    public componentWillMount() {
        if (this.props.element.SignStr) {
            // tslint:disable-next-line:no-console
            console.log('fetchdata');
            this.props.fetchData(this.props.element.Name, this.props.element.SignStr, {});
        }
    }
    public render() {
        return <div>ElasticView</div>;
    }
}
const mapState = (state: any) => {
    return state;
};
const mapDispatch = (dispatch: Dispatch) => {
    return {
        fetchData: actions.fetchData
    };
};
export default eleComponent(mapState, mapDispatch, reducer)(ElasticView);
