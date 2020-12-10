import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../Redux/Actions";
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "./StudentCalendar.scss";
import { RRule, RRuleSet, rrulestr } from 'rrule'
import { Typography } from "antd";
const { Text } = Typography;

const allViews = Object.keys(Views).map(k => Views[k]);
moment.locale("en")
const localizer = momentLocalizer(moment);

class StudentCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    componentDidMount() {
        this.props.fetchEnrolledCourses();
    }


    render() {

        if (this.props.events.length == 0) {
            console.log(this.props);
            return <Text strong level={4}>LOADING</Text>
        }

        return (
            <div>
                <Calendar
                    localizer={localizer}
                    events={this.props.events}
                    views={[Views.MONTH, Views.WEEK, Views.AGENDA]}
                    defaultView={Views.WEEK}
                    startAccessor="start"
                    endAccessor="end"
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { enrolledCourses } = state;
    const events = { courses: [], delivs: [] };
    var rDays = {
        Sunday: RRule.SU,
        Monday: RRule.MO,
        Tuesday: RRule.TU,
        Wednesday: RRule.WE,
        Thursday: RRule.TH,
        Friday: RRule.FR,
        Saturday: RRule.SA
    }

    //first get date rule for each course
    var rules = []
    enrolledCourses.forEach(course => {
        var tempRule = new RRule({
            freq: RRule.WEEKLY,
            dtstart: new Date(Date.UTC(2020, 8, 7, 0, 0, 0)),
            until: new Date(Date.UTC(2020, 11, 30, 0, 0, 0)),
            count: 35,
            interval: 1,
            byweekday: course.course_day.split(",").map((str, index) => rDays[str.trim()])
        });
        console.log(course.course_day.split(",").map((str, index) => rDays[str.trim()]))

        rules.push(tempRule.all());
    })

    var uniqueIds = 0
    console.log(rules);
    //next map rrule course dates to event objects for react-big-calendar
    rules.forEach((dates, index) => {
        dates.forEach((dateObj) => {
            var startTime = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), parseInt(enrolledCourses[index].course_time.split(":")[0].trim()), parseInt(enrolledCourses[index].course_time.split(":")[1].trim()));
            startTime.setDate(startTime.getDate() + 1) //rrule offsets the day by 1 for some dumb reason
            var endTime = new Date(startTime.toISOString())
            endTime.setTime(startTime.getTime() + (enrolledCourses[index].course_duration*60*60*1000))
            events.courses.push({
                id: uniqueIds++,
                title: `${enrolledCourses[index].course_code} Lecture`,
                allDay: false,
                start: startTime,
                end: endTime
            })
        })
    })

    //next, do the same, but for deliverables
    enrolledCourses.forEach((course, index) => {
        course.deliverables.forEach((deliv, index) => {
            var due_date = new Date(deliv.due_date);
            var start = new Date(due_date.getFullYear(), due_date.getMonth(), due_date.getDate());
            var end = new Date(start.toISOString());

            events.delivs.push({
                id: uniqueIds++,
                title: `${deliv.course_code}: ${deliv.description} due @${due_date.getHours()}:${due_date.getMinutes()}`,
                allDay: true,
                start: start,
                end: end
            })
        })
    })


    return {
        events: events.courses.concat(events.delivs)
    }
};

export default connect(mapStateToProps, actions)(StudentCalendar);
