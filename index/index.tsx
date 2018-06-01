import { Button, Input } from "@material-ui/core";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Dispatch } from "redux";

import { APIGet } from "../../../dbweb-core/api";
import { IElementComponent, withElement } from "../../../dbweb-core/eleContext";
import { IModule } from "../../../dbweb-core/model";
import { eleConnect } from "../../../dbweb-core/store";
import * as actions from "./action";
import reducer from "./reducer";

interface IIndex extends RouteComponentProps<any>, IElementComponent {
    userName: string;
    userNameChange: (event: any) => any;
}
class Index extends React.PureComponent<IIndex> {
    public render() {
        return (
            <div>
                这里是{this.props.element}
                <Button onClick={this.click}>click me</Button>
                <Input value={this.props.userName} onChange={this.props.userNameChange} />
            </div>
        );
    }
    private click() {
        APIGet("index", "test").then(() => alert("ok"));
    }
}
const mapState = (state: any, dstate: any) => {
    return dstate || { userName: "" };
};
const mapDispatch = (dispatch: Dispatch) => {
    return {
        userNameChange: (event: any) => dispatch(actions.changeUserName(event.target.value))
    };
};
export default {
    name: "index",
    component: withElement(eleConnect(mapState, mapDispatch)(Index)),
    reducer
} as IModule;
