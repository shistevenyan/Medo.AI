import React from "react";
import Login from "./components/Login";
import axios from "axios";
import PatientList from "./components/PatientList";

export default class App extends React.Component<{}, {
    token: string | null
}> {

    constructor(props: any) {
        super(props);
        const token = window.localStorage.getItem("token");
        this.state = {
            token
        };
    }

    public render() {
        if (!this.state.token) {
            return <Login handleLoggedIn={this.handleLoggedIn.bind(this)} />;
        }
        return <div>
            <button className="btn btn-default"
                onClick={this.reload.bind(this)}>
                Reload Data
            </button>
            <button className="btn btn-default"
                onClick={this.logout.bind(this)}>
                Logout
            </button>
            <PatientList token={this.state.token} />
        </div>;
    }

    private logout() {
        window.localStorage.clear();
        this.setState({
            token: null
        });
    }

    private reload() {
        axios({
            url: "/api/initialize",
            method: "POST",
            headers: {
                authorization: this.state.token
            }
        }).then(() => {
            // QUESTION: Do we have to do a page refresh?
            window.location = window.location;
        });
    }

    private handleLoggedIn(token: string) {
        window.localStorage.setItem("token", token);
        this.setState({
            token
        });
    }
}