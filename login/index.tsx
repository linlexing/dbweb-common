import "./index.css";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Snackbar from "@material-ui/core/Snackbar";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import createStyles from "@material-ui/core/styles/createStyles";
import CloseIcon from "@material-ui/icons/Close";
import * as React from "react";
import { Dispatch } from "redux";
import { eleComponent } from "src/dbweb-core/store";

import { IElementComponent } from "../../../dbweb-core/eleContext";
import { savePassword, saveUser, setLoginError } from "./action";
import reducer from "./reducer";

import { login } from "../../../dbweb-core/login";

// import { connect } from "react-redux";

const styles = createStyles({
  root: {
    flexGrow: 1,
    backgroundColor: "#eafbff7a",
    height: "100vh"
  },
  flex: {
    flex: 1
  },
  loginButton: {
    width: "100%",
    marginBottom: "20px"
  },
  loginInput: {
    width: "100%"
  }
});

interface IProps
  extends WithStyles<typeof styles>,
    IElementComponent {
  login: () => any;
  saveUser: (user: string) => any;
  savePassword: (password: string) => any;
  setLoginError: (isLoginError: boolean) => any;
  isLoginSuccess: boolean;
  isloginError: boolean;
  username: string;
  password: string;
}

class LoginPage extends React.PureComponent<IProps> {
  public state = {
    isOpenSuccess: true,
    isOpenError: true
  };

  constructor(props: IProps) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
  }

  public onChangeUser = (e: any) => {
    this.props.saveUser(e.target.value);
  };

  public onChangePassword = (e: any) => {
    this.props.savePassword(e.target.value);
  };

  public closeSuccessMsg = (e: any) => {
    this.setState({ isOpenSuccess: false });
  };

  public closeErrorMsg = (e: any) => {
    this.setState({ isOpenError: false });
  };

  public componentWillMount() {
    this.setState({ isOpenSuccess: false, isOpenError: false });
  }

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className="loginHeader" />
        <div className="login-message-container">
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            open={this.props.isLoginSuccess && this.state.isOpenSuccess}
            autoHideDuration={6000}
            onClose={this.closeSuccessMsg}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="login-message-success">登录成功</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.closeSuccessMsg}
              >
                {" "}
                <CloseIcon />
              </IconButton>
            ]}
          />
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            open={this.props.isloginError && this.state.isOpenError}
            onClose={this.closeErrorMsg}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="login-message-error">用户名或密码错误</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.closeErrorMsg}
              >
                {" "}
                <CloseIcon />
              </IconButton>
            ]}
          />
        </div>

        <Card className="loginFormContainer">
          <form className="loginForm">
            <FormControl className={classes.loginInput}>
              <InputLabel htmlFor="login-username">用户名</InputLabel>
              <Input
                id="login-username"
                type="user"
                name="user"
                onChange={this.onChangeUser}
              />
            </FormControl>
            <br />
            <FormControl className={classes.loginInput}>
              <InputLabel htmlFor="login-password">密码</InputLabel>
              <Input
                id="login-password"
                type="password"
                name="password"
                onChange={this.onChangePassword}
              />
            </FormControl>
            <br />

            <div className="login-action-container">
              <Button
                variant="contained"
                size="large"
                color="primary"
                className={classes.loginButton}
                onClick={this.onLogin}
              >
                登录
              </Button>
              <Button
                variant="outlined"
                size="large"
                color="primary"
                className={classes.loginButton}
              >
                忘记密码？
              </Button>
            </div>
            <div className="loginForm-header">登录</div>
          </form>
        </Card>
      </div>
    );
  }
  private onLogin() {
    // tslint:disable-next-line:no-console
    console.log(this.props.username);
    // tslint:disable-next-line:no-console
    console.log(this.props.password);
    login({
      userName: this.props.username,
      password: this.props.password
    }).catch(err => {
      // tslint:disable-next-line:no-console
      console.log(err);
      this.props.setLoginError(true);
      this.setState({ isOpenError: true });
    });
    this.setState({ isOpenSuccess: true, isOpenError: false });
    // tslint:disable-next-line:no-console
    console.log(this.state.isOpenError);
  }
}

const mapStateToProps = (state: any) => {
  return {
    isLoginPending: state.isLoginPending,
    isLoginSuccess: state.isLoginSuccess,
    isloginError: state.isloginError,
    username: state.username,
    password: state.password
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    saveUser: (user: string) => dispatch(saveUser(user)),
    savePassword: (password: string) => dispatch(savePassword(password)),
    setLoginError: (isLoginError: boolean) =>
      dispatch(setLoginError(isLoginError))
  };
};

const StyledLoginPage = withStyles(styles)(LoginPage);

export default eleComponent(mapStateToProps, mapDispatchToProps, reducer)(
  StyledLoginPage
);
