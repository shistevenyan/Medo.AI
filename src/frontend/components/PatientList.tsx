import React from "react";
import axios from "axios";
import PatientEditor from "./PatientEditor";
import "../styles/PatientList.css";


interface Patient {
    id: string;
    name: string;
    ahcNum: number;
}
interface PatientState {
    patientId?: string | undefined;
    patients: Array<Patient>;
}

export default class PatientList extends React.Component<{ token: string },
    PatientState> {
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
        // no results displayed, an empty table
    }

    public reloadPatientData(newPatientId : string, oldPatientId : string) {
        axios({
            method: "GET",
            url: `/api/patients/${newPatientId}`,
            headers: {
                Authorization: this.props.token
            }
        }).then((res) => {
            this.setState(prevState => {
                let newPatients = prevState.patients.filter(patient => patient.id != oldPatientId);
                newPatients.push(res.data);
                return {
                    patientId: undefined,
                    patients: newPatients
                }
            })
        })
    }

    public render() {
        if (this.state.patientId) {
            return <PatientEditor token={this.props.token}
                patientId = {this.state.patientId}
                handleSaved={(newPatientId, oldPatientId) => { 
                    // TODO: Reload patient list
                    this.reloadPatientData(newPatientId, oldPatientId);
                }}
                
                handleCancel={() => {
                    this.setState({
                        ...this.state,
                        patientId: undefined
                    });
                }}
            />;
        }
        return <div className="patients">
            <h4 id="patient-header">Patients</h4>
            <table className="table">
                
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Alberta Health Care #</th>
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
                <td>{p.ahcNum}</td>
                <td>
                    <button onClick={oc} className="btn btn-danger">
                    Edit
                    </button>
                </td>
            </tr>;
        });
    }
}