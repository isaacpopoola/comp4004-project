import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../Redux/Actions";
import { Typography, Table, Statistic, Row, Col } from 'antd';
const { Text } = Typography;
const { Column } = Table


class StudentBalanceTable extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getStudentBalance();
    }

    render() {

        if (this.props.balance.length == 0) {
            console.log(this.props);
            return <Text strong level={4}>LOADING</Text>
        }





        console.log(this.props.balance);

        return (
            <>
                <>
                    <Row style={{ marginBottom: "0.5em" }}>
                        <Statistic title="Total Balance (CAD)" value={this.props.balance.student.balance} precision={2} />
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Table dataSource={this.props.balance.courses}>
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
                                    title='Cost'
                                    dataIndex='price'
                                    key='coursePrice'
                                />
                            </Table>
                        </Col>
                    </Row>
                </>

            </>
        )
    }
}

const mapStateToProps = (state) => ({
    balance: state.studentBalance,
});

export default connect(mapStateToProps, actions)(StudentBalanceTable);
