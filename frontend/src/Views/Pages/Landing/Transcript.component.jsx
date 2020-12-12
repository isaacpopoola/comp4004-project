import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "antd";
import * as actions from "../../../Redux/Actions";

const { Column } = Table;

class Transcript extends Component {
    componentDidMount() {
        this.props.fetchFinalGradesForStudent();
    }
    render() {
        return (
            <Table dataSource={this.props.finalGrades}>
                <Column
                    title='Course Code'
                    dataIndex='course_code'
                    key='courseCode'
                />
                <Column title='Grade' dataIndex='grade' key='grade' />
                <Column title='Status' dataIndex='status' key='status' />
            </Table>
        );
    }
}

const mapStateToProps = (state) => ({
    finalGrades: state.finalGrades,
});

export default connect(mapStateToProps, actions)(Transcript);
