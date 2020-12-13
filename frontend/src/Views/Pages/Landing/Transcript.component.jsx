import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Space, Typography } from "antd";
import * as actions from "../../../Redux/Actions";
const { Text } = Typography;

const { Column } = Table;

class Transcript extends Component {

    componentDidMount() {
        this.props.fetchFinalGradesForStudent();
    }


    render() {

        if (this.props.finalGrades.length == 0) {
            console.log(this.props);
            return <Text strong level={4}>LOADING</Text>
        }

        const sendRequest = (course_code) => {
            var grade = {}
            this.props.finalGrades.forEach(element => {
                if (element.course_code == course_code) {
                    grade = element;
                    return;
                }
            });

            if (grade.status == "SAT" || grade.status == "UNSAT") {
                return <div>Request</div>
            } else {
                return <a onClick={() => {
                    this.props.requestSAT(course_code)
                    this.forceUpdate()
                    }}>
                    Request
                        </a>
            }
        }
        return (
            <Table dataSource={this.props.finalGrades}>
                <Column
                    title='Course Code'
                    dataIndex='course_code'
                    key='courseCode'
                />
                <Column 
                title='Grade'
                key='grade'
                render={(text, record) => {
                    switch(text.status){
                        case "WITHDRAWN":
                            return <div>WDN</div>
                        case "SAT":
                            return <div>SAT</div>
                        case "UNSAT":
                            return <div>UNSAT</div>
                    }

                    return <div>{text.grade}%</div>
                }}
                />
                <Column title='Status' dataIndex='status' key='status' />
                <Column 
                title='Request SAT/UNSAT' 
                key='satunsat'
                render={(text, record) => (
                    <Space>
                        {sendRequest(record.course_code)}
                    </Space>
                )}
                />
            </Table>
        );
    }
}

const mapStateToProps = (state) => ({
    finalGrades: state.finalGrades,
});

export default connect(mapStateToProps, actions)(Transcript);
