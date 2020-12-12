import React, { useState } from "react";
import StudentsTable from "./StudentsTable/StudentsTable.component";
import CoursesTable from "./CoursesTable.component";
import AdminCourseTable from "./AdminCourseTable.component";
import EnrolledCoursesTable from "./EnrolledCoursesTable.component";
import StudentDeliverablesCollapse from "./StudentDeliverablesCollapse.component";
import StudentBalanceTable from "./StudentBalanceTable.component";
import StudentCalendar from "./StudentCalendar.component";
import Transcript from "./Transcript.component";

import * as actions from "../../../Redux/Actions";
import { connect } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
    Menu,
    Modal,
    Form,
    Input,
    Button,
    InputNumber,
    Typography,
} from "antd";
const { Title } = Typography;

export const menus = {
    Student: (
        <>
            <Menu.Item key='1'>Home</Menu.Item>
            <Menu.Item key='2'>My Courses</Menu.Item>
            <Menu.Item key='3'>Registration</Menu.Item>
            <Menu.Item key='4'>Deliverables</Menu.Item>
            <Menu.Item key='5'>Balance</Menu.Item>
            <Menu.Item key='6'>Calendar</Menu.Item>
            <Menu.Item key='7'>Transcript</Menu.Item>
        </>
    ),

    Admin: (
        <>
            <Menu.Item key='1'>Home</Menu.Item>
            <Menu.Item key='2'>Courses</Menu.Item>
            <Menu.Item key='3'>Students</Menu.Item>
        </>
    ),
};

export const views = {
    Student: {
        Registration: () => {
            return (
                <div>
                    Registration
                    <CoursesTable />
                </div>
            );
        },
        MyCourses: () => {
            return (
                <div>
                    My Courses <EnrolledCoursesTable />
                </div>
            );
        },
        Deliverables: (props) => {
            return (
                <div style={{ padding: "0.5em" }}>
                    <Title level={3}>Deliverables</Title>
                    <StudentDeliverablesCollapse />
                </div>
            );
        },
        Balance: (props) => {
            return (
                <div style={{ padding: "0.5em" }}>
                    <Title level={3}>Balance</Title>
                    <StudentBalanceTable />
                </div>
            );
        },
        Calendar: (props) => {
            return (
                <div style={{ padding: "0.5em" }}>
                    <Title level={3}>Calendar</Title>
                    <StudentCalendar />
                </div>
            );
        },
        Transcript: () => {
            return (
                <div style={{ padding: "0.5em" }}>
                    <Title level={3}>Transcript</Title>
                    <Transcript />
                </div>
            );
        },
    },

    Admin: {
        Home: () => {
            return <div>Home</div>;
        },
        Courses: connect(
            null,
            actions
        )((props) => {
            props.fetchAllCourses();
            const [isModalVisible, setIsModalVisible] = useState(false);

            const toggleModal = () => {
                setIsModalVisible(!isModalVisible);
            };

            const [form] = Form.useForm();

            return (
                <div>
                    <div style={{ padding: "0.7em 0", float: "right" }}>
                        <Button type='primary' onClick={toggleModal}>
                            Create Course
                        </Button>
                    </div>
                    <div>
                        <AdminCourseTable />
                    </div>
                    <Modal
                        centered
                        title='Create Course'
                        visible={isModalVisible}
                        onOk={() => {
                            form.validateFields()
                                .then(async (values) => {
                                    const {
                                        course_code,
                                        course_name,
                                        course_descr,
                                        course_registration_deadline,
                                        course_drop_deadline,
                                        course_student_limit,
                                        course_credits,
                                        price,
                                        course_duration,
                                        course_time,
                                        course_day,
                                    } = values;
                                    let prereqs = values.prereqs
                                        ? values.prereqs.split(",")
                                        : null;
                                    if (prereqs)
                                        prereqs = prereqs.map((s) => s.trim());
                                    form.resetFields();
                                    await props.createCourse(
                                        course_code,
                                        course_name,
                                        course_descr,
                                        course_registration_deadline,
                                        course_drop_deadline,
                                        course_student_limit,
                                        course_credits,
                                        price,
                                        course_duration,
                                        course_time,
                                        course_day,
                                        prereqs
                                    );
                                })
                                .then((res) => {
                                    toggleModal();
                                });
                        }}
                        onCancel={toggleModal}
                        width={800}
                    >
                        <Form
                            // {...layout}
                            form={form}
                            className='create-course-form'
                            labelCol={{ span: 5 }}
                            name='basic'
                            initialValues={{ remember: true }}
                            layout='horizontal'
                        >
                            <Form.Item
                                required
                                label='Course Code'
                                name='course_code'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input the course code!",
                                    },
                                ]}
                            >
                                <Input id='create-course-coursecode' />
                            </Form.Item>

                            <Form.Item
                                required
                                label='Course Name'
                                name='course_name'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input the course name!",
                                    },
                                ]}
                            >
                                <Input id='create-course-coursename' />
                            </Form.Item>

                            <Form.Item
                                required
                                label='Course Description'
                                name='course_descr'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input the course description!",
                                    },
                                ]}
                            >
                                <Input.TextArea id='create-course-coursedescr' />
                            </Form.Item>
                            <Form.Item
                                label='Prerequisites'
                                name='prereqs'
                                rules={[
                                    {
                                        required: false,
                                        message: "Input any prerequisites",
                                    },
                                ]}
                            >
                                <Input
                                    id='prereqs'
                                    placeholder='Comma separated prerequisites'
                                />
                            </Form.Item>

                            <Form.Item
                                required
                                label='Registration Deadline'
                                name='course_registration_deadline'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input the registration deadline!",
                                    },
                                ]}
                            >
                                <Input id='create-course-courseregistrationdeadline' />
                            </Form.Item>

                            <Form.Item
                                required
                                label='Drop Deadline'
                                name='course_drop_deadline'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input the drop deadline!",
                                    },
                                ]}
                            >
                                <Input id='create-course-coursedropdeadline' />
                            </Form.Item>

                            <Form.Item
                                required
                                label='Course Day'
                                name='course_day'
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input the course day!",
                                    },
                                ]}
                            >
                                <Input
                                    id='create-course-courseday'
                                    placeholder='Comma separated days'
                                />
                            </Form.Item>

                            <Form.Item
                                required
                                label='Course Time'
                                name='course_time'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input the course time!",
                                    },
                                ]}
                            >
                                <Input
                                    style={{ width: 90 }}
                                    id='create-course-coursetime'
                                    placeholder='HH:MM'
                                />
                            </Form.Item>

                            <Form.Item
                                required
                                label='Duration (Hours)'
                                name='course_duration'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input the course duration!",
                                    },
                                ]}
                            >
                                <InputNumber
                                    min={0}
                                    step={0.5}
                                    id='create-course-courseduration'
                                />
                            </Form.Item>
                            <Form.Item
                                required
                                label='Student Limit'
                                name='course_student_limit'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input the student limit!",
                                    },
                                ]}
                            >
                                <InputNumber id='create-course-coursestudentlimit' />
                            </Form.Item>

                            <Form.Item
                                required
                                label='Course Credits'
                                name='course_credits'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input the course credits!",
                                    },
                                ]}
                            >
                                <InputNumber
                                    min={0}
                                    step={0.5}
                                    id='create-course-coursecredits'
                                />
                            </Form.Item>

                            <Form.Item
                                required
                                label='Price'
                                name='price'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input the course price!",
                                    },
                                ]}
                            >
                                <InputNumber
                                    formatter={(value) =>
                                        `$ ${value}`.replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                        )
                                    }
                                    parser={(value) =>
                                        value.replace(/\$\s?|(,*)/g, "")
                                    }
                                    min={0}
                                    step={10}
                                    id='create-course-courseprice'
                                />
                            </Form.Item>

                            {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            {failed && "Wrong credentials"}
                        </Form.Item> */}
                        </Form>
                    </Modal>
                    <ToastContainer />
                </div>
            );
        }),
        Students: connect(
            null,
            actions
        )((props) => {
            props.fetchStudents();
            const [isModalVisible, setIsModalVisible] = useState(false);

            const [form] = Form.useForm();

            const toggleModal = () => {
                setIsModalVisible(!isModalVisible);
            };
            return (
                <div>
                    <div style={{ padding: "0.7em 0", float: "right" }}>
                        <Button type='primary' onClick={toggleModal}>
                            Create Student
                        </Button>
                    </div>
                    <div>
                        <StudentsTable />
                    </div>
                    <Modal
                        title='Create Student'
                        visible={isModalVisible}
                        onOk={() => {
                            form.validateFields()
                                .then(async (values) => {
                                    const { name, username, password } = values;
                                    form.resetFields();
                                    props.createStudent(
                                        name,
                                        username,
                                        password
                                    );
                                })
                                .then((res) => {
                                    toggleModal();
                                });
                        }}
                        onCancel={toggleModal}
                    >
                        <Form
                            // {...layout}
                            form={form}
                            className='signin-form'
                            labelCol={{ span: 5 }}
                            name='basic'
                            initialValues={{ remember: true }}
                        >
                            <Form.Item
                                required
                                label='Full Name'
                                name='name'
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input the name!",
                                    },
                                ]}
                            >
                                <Input id='student-name' />
                            </Form.Item>
                            <Form.Item
                                required
                                label='Username'
                                name='username'
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input the username!",
                                    },
                                ]}
                            >
                                <Input id='student-username' />
                            </Form.Item>

                            <Form.Item
                                label='Password'
                                name='password'
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input the password!",
                                    },
                                ]}
                            >
                                <Input.Password id='student-password' />
                            </Form.Item>

                            {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            {failed && "Wrong credentials"}
                        </Form.Item> */}
                        </Form>
                    </Modal>
                    <ToastContainer />
                </div>
            );
        }),
    },
};

// module.exports = { menus }
