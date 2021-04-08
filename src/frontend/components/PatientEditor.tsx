import React from "react";
import axios from "axios";
import "../styles/PatientEditor.css";

export default class PatientEditor extends React.Component<{
    handleSaved: (newPatientId: string, oldPatientId: string ) => void,
    token: string,
    patientId: string | null
}, {
        message?: string,
        id: string,
        name: string,
        ahcNum: string
    }> {

    constructor(props: any) {
        super(props);
        this.state = {
            id: "",
            name: "",
            ahcNum: ""
        };
    }

    public componentDidMount() {
        if (this.props.patientId) {
            axios({
                url: `/api/patients/${this.props.patientId}`,
                headers: {
                    authorization: this.props.token
                }
            }).then((res) => {
                this.setState({
                    ...res.data
                });
            });
        }
    }

    public render() {
        const msgElement = this.state.message ?
            <div className="alert alert-primary">{this.state.message}</div> :
            null;
        return (
            <div id="editor-container">
                {msgElement}
                <input type="text" placeholder="ID" value={this.state.id}
                    className="form-control" onChange={this.updateId.bind(this)} />
                <input type="text" placeholder="Name" value={this.state.name}
                    className="form-control" onChange={this.updateName.bind(this)} />
                <input type="text" placeholder="AHC #" value={this.state.ahcNum}
                    className="form-control" onChange={this.updateAhc.bind(this)} />
                <div id="button-container">
                    <button className="btn btn-success" onClick={this.handleSave.bind(this)}>Save</button>
                    <button className="btn btn-danger" onClick={this.handleCancel.bind(this)}>Cancel</button>
                </div>
                
            </div>
        );
    }

    private updateAhc(evt: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            ahcNum: evt.target.value
        });
    }

    private updateId(evt: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            id: evt.target.value
        });
    }

    private updateName(evt: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            name: evt.target.value
        });
    }

    private handleSave() {
        const data = {
            id: this.state.id,
            ahcNum: this.state.ahcNum,
            name: this.state.name
        };
        axios({
            method: "POST",
            url: `/api/patients/${this.props.patientId}`,
            headers: {
                authorization: this.props.token
            },
            data
        }).then(() => {
            console.log("XX");
            this.setState({
                message: undefined
            });
            this.props.handleSaved(this.state.id, this.props.patientId!);
        }).catch((err) => {
            const res = err.response;
            this.setState({
                message: res.data.message || res.statusText
            });
        });
    }

    private handleCancel() {
        window.location = window.location;
    }
}