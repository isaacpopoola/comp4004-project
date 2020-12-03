import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Space } from "antd";
import * as actions from "../../../Redux/Actions";

const { Column, ColumnGroup } = Table;

class AdminCoursesTable extends Component {
    componentDidMount() {
        this.props.fetchAllCourses();
    }

    render() {
        return (
            <Table dataSource={this.props.courses}>
                <Column
                    title='Course Name'
                    dataIndex='course_name'
                    key='coursename'
                />
                <Column
                    title='Course Code'
                    dataIndex='course_code'
                    key='courseCode'
                />
                <Column
                    title='Course Description'
                    dataIndex='course_descr'
                    key='courseDescr'
                />
                <Column
                    title='Course Credits'
                    dataIndex='course_credits'
                    key='courseCredits'
                />

                <Column
                    title='Registration Deadline'
                    dataIndex='course_registration_deadline'
                    key='registrationDeadline'
                />
                <Column
                    title='Drop Deadline'
                    dataIndex='course_drop_deadline'
                    key='dropDeadline'
                />
                <Column
                    title='Course Limit'
                    dataIndex='course_student_limit'
                    key='studentLimit'
                />
                {/* <Column title='Spots Available' dataIndex='course_drop_deadline' key='dropDeadline' /> */}

                <Column
                    title='Cancel'
                    dataIndex='cancel'
                    key='cancel'
                    render={(text, record) => (
                        <Space size='middle'>
                            <a
                                onClick={() => {
                                    this.props.cancelCourse(record.course_code);
                                }}
                            >
                                Cancel Course
                            </a>
                        </Space>
                    )}
                />
            </Table>
        );
    }
}

const mapStateToProps = (state) => ({
    courses: state.courses,
});

export default connect(mapStateToProps, actions)(AdminCoursesTable);