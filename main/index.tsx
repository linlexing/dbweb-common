// tslint:disable:no-console
import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';

import { SetRootPath } from '../../../dbweb-core';
import Home from '../home';
import { ILoginResult, Login } from '../login';
import { IApp } from '../model/app';
import { IElement } from '../model/element';

export interface IMainProps {
    modules: any;// 所有的模块
    apiRootPath: string;// 访问Api时的根路径
}
interface IMainState {
    elements: IElement[]
    index: IElement | undefined
}
class Main extends React.Component<IMainProps & RouteComponentProps<any>, IMainState>{
    public state = {
        elements: [{
            Name: "Login",
            Controller: "login",
        }]
    } as IMainState
    private pubEles: IElement[];
    constructor(props: IMainProps & RouteComponentProps<any>) {
        super(props);
        this.onLogined = this.onLogined.bind(this);
    }
    public componentWillMount(): void {
        SetRootPath(this.props.apiRootPath);
        Login.getPublicElement().then((eles) => {
            this.pubEles = eles.data;
        });
    }
    public render() {
        const { modules } = this.props;
        const { elements, index } = this.state;
        let IndexComponent = null;
        if (index) {
            const app = {
                elements,
                index,
                modules,
            } as IApp
            const CompIndex = (props: any) => <Home {...props} app={app} />
            IndexComponent = <Route key={index.Name} component={CompIndex} />;
        }
        const InnerLogin = modules.login;
        const CompLogin = (props: any) => <InnerLogin {...props} onLogined={this.onLogined} />
        return (
            <Switch>
                <Route key="login" path="/front/login" component={CompLogin} />
                {IndexComponent}
            </Switch>
        );
    }
    private onLogined(data: ILoginResult) {
        const indexEle = _.find(data.Elements, { Name: data.IndexElement });
        if (!indexEle) {
            alert(`${data.IndexElement} is null`);
            return;
        }
        this.setState({
            // 需要去除login ，因为顶层已经route
            elements: _.filter([...this.pubEles, ...data.Elements], o => o.Name !== "login"),
            index: indexEle,
        })
        this.props.history.push(`/front/${data.IndexElement}`);

    }
}
const mapStateToProps = (state: any) => ({
    modules: state.modules,
    apiRootPath: state.apiRootPath,
})

export default connect<IMainProps>(mapStateToProps)(withRouter(Main))
