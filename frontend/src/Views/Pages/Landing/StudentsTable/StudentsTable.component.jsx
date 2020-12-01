import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../Redux/Actions";

import { Table, Tag, Space } from "antd";

const { Column, ColumnGroup } = Table;

class StudentsTable extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchStudents();
    }

    render() {
        return (
            <Table dataSource={this.props.students}>
                <ColumnGroup title='Name'>
                    <Column title='Name' dataIndex='name' key='name' />
                    <Column
                        title='Username'
                        dataIndex='username'
                        key='usename'
                    />
                </ColumnGroup>
                <Column title='GPA' dataIndex='gpa' key='gpa' />
                <Column
                    title='Delete'
                    key='delete'
                    render={(text, record) => (
                        <Space size='middle'>
                            <a
                                onClick={() =>
                                    this.props.deleteStudentByUsername(
                                        record.username
                                    )
                                }
                            >
                                Delete
                            </a>
                        </Space>
                    )}
                />
            </Table>
        );
    }
}

const mapStateToProps = (state) => ({
    students: state.students,
});

export default connect(mapStateToProps, actions)(StudentsTable);
