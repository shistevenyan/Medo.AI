import React from "react";
import axios from "axios";
import "../styles/Login.css";

export default class Login extends React.Component<{
    handleLoggedIn: (token: string) => void
}, {
        message?: string,
        id: string,
        password: string
    }> {

    constructor(props: any) {
        super(props);
        this.state = {
            id: "",
            password: ""
        };
    }

    public render() {
        const msgElement = this.state.message ?
            <div className="alert alert-primary">{this.state.message}</div> :
            null;
        return (
            <div id="parent-container">
                <div id="login-container">
                    
                    <span id="login-header"> Medo Playground </span>
                    <input type="text" placeholder="ID" value={this.state.id}
                        className="form-control" onChange={this.updateId.bind(this)} />

                    <input type="password" placeholder="Password" value={this.state.password}
                        className="form-control"  onChange={this.updatePw.bind(this)} />

                    <button className="sign-button" onClick={this.handleLogin.bind(this)}>Login</button>
                    {msgElement}
                </div>
            </div>
        );
    }

    private updateId(evt: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            id: evt.target.value
        });
    }

    private updatePw(evt: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            password: evt.target.value
        });
    }

    private handleLogin() {
        axios.post("/api/login", {
            id: this.state.id,
            password: this.state.password
        }).then((res) => {
            this.setState({
                message: undefined
            });
            this.props.handleLoggedIn(res.data.token);
        }).catch((err) => {
            const res = err.response;
            this.setState({
                message: res.data.message || res.statusText
            });
        });
    }
}