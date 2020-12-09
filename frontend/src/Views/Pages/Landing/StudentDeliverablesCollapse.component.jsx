import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../Redux/Actions";
import { Collapse, Card, Col, Row, Button, Typography, Modal } from 'antd';
const { Panel } = Collapse
const { Text } = Typography;

class StudentDeliverablesCollapse extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount() {
        this.props.fetchEnrolledCourses();
    }


    formatDate(d) {
        var date = new Date(d);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        var string = ` ${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`
        return string;
    }

    async submitDeliverable(deliv_id){
        var answers = ["correct", "wrong"]
        var submission = answers[Math.floor(Math.random() * answers.length)];
        await this.props.submitDeliverable(deliv_id, submission);
        this.update();
    }

    update() {
        this.props.fetchEnrolledCourses();
        this.forceUpdate();
    }
    render() {
        console.log(this.props.enrolledCourses)
        return (
            <>
                <Collapse>
                    {this.props.enrolledCourses.map((data, index) =>
                        <Panel header={data.course_code} key={index}>
                            <div className="site-card-wrapper">
                                <Row gutter={16}>
                                    {data.deliverables.map((data2, index) =>
                                        <Col span={8}>
                                            <Card title={data2.description}>
                                                <Row>
                                                    <Col span={8}>
                                                        <Text strong>Grade</Text>: {data2.grade==null ? " Not Submitted" : ` ${data2.grade}%`}
                                                    </Col>
                                                    <Col span={8} offset={8}>
                                                        <Button onClick={() => this.submitDeliverable(data2.id)} disabled={data2.grade!=null}>Submit</Button>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Text strong>Due Date: </Text> 
                                                    {this.formatDate(data2.due_date)}
                                                </Row>
                                            </Card>
                                        </Col>
                                    )}
                                </Row>
                            </div>
                        </Panel>
                    )}
                </Collapse>
            </>
        )
    }
}


const mapStateToProps = (state) => ({
    enrolledCourses: state.enrolledCourses,
});

export default connect(mapStateToProps, actions)(StudentDeliverablesCollapse);
