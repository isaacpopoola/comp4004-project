import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Space } from "antd";
import * as actions from "../../../Redux/Actions";

const { Column } = Table;

export class EnrolledCoursesTable extends Component {
    componentDidMount() {
        this.props.fetchEnrolledCourses();
    }
    render() {
        return (
            <Table dataSource={this.props.enrolledCourses}>
                <Column
                    title='Course Code'
                    dataIndex='course_code'
                    key='courseCode'
                />
                <Column
                    title='Drop'
                    dataIndex='drop'
                    key='drop'
                    render={(text, record) => (
                        <Space size='middle'>
                            <a
                                onClick={() => {
                                    this.props.dropClass(record.course_code);
                                }}
                            >
                                Drop
                            </a>
                        </Space>
                    )}
                />
            </Table>
        );
    }
}

const mapStateToProps = (state) => ({
    enrolledCourses: state.enrolledCourses,
});

export default connect(mapStateToProps, actions)(EnrolledCoursesTable);
