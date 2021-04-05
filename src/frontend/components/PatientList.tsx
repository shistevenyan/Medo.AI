import React from "react";
import axios from "axios";
import PatientEditor from "./PatientEditor";

export default class PatientList extends React.Component<{ token: string },
    { patients: [], patientId?: string }> {
    constructor(props: any) {
        super(props);
        this.state = {
            patients: []
        };
    }

    public componentDidMount() {
        axios({
            method: "GET",
            url: "/api/patients",
            headers: {
                Authorization: this.props.token
            }
        }).then((res) => {
            this.setState({
                patients: res.data
            });
        });
        // QUESTION: What happens if the request fails?
    }

    public render() {
        if (this.state.patientId) {
            return <PatientEditor token={this.props.token}
                patientId={this.state.patientId}
                handleSaved={() => {
                    // TODO: Reload patient list
                    this.setState({
                        patientId: undefined
                    });
                }}
            />;
        }
        return <div className="patients">
            <h4>Patients</h4>
            <table className="table">
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                    {this.buildRows()}
                </tbody>
            </table>
        </div>;
    }

    private buildRows() {
        return this.state.patients.map((p: any) => {
            const oc = () => {
                this.setState({
                    patientId: p.id
                });
            };
            return <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>
                    <button onClick={oc} className="btn btn-default">
                    Edit
                    </button>
                </td>
            </tr>;
        });
    }
}