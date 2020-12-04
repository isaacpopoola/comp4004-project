import React, { useState } from "react";
import StudentsTable from "./StudentsTable/StudentsTable.component";
import CoursesTable from "./CoursesTable.component";
import AdminCourseTable from "./AdminCourseTable.component";
import EnrolledCoursesTable from "./EnrolledCoursesTable.component";

import * as actions from "../../../Redux/Actions";
import { connect } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Layout, Menu, Modal, Form, Input, Button, DatePicker, InputNumber } from "antd";
// const { Header, Content, Footer, Sider } = Layout;
// const { SubMenu } = Menu;


export const menus = {
    Student: (
        <>
            <Menu.Item key='1'>Home</Menu.Item>
            <Menu.Item key='2'>My Courses</Menu.Item>
            <Menu.Item key='3'>Registration</Menu.Item>
            <Menu.Item key='4'>Calendar</Menu.Item>
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
            )
        },
        MyCourses: () => {
            return (
                <div>
                    My Courses <EnrolledCoursesTable />
                </div>
            )
        },
    },

    Admin: {
        Home: () => {
            return (
                <div>Home</div>
            )
        },
        Courses: connect(null, actions)((props) => {
            props.fetchAllCourses();
            const [isModalVisible, setIsModalVisible] = useState(false);

            const toggleModal = () => {
                setIsModalVisible(!isModalVisible);
            }

            const [form] = Form.useForm();

            return (
                <div>
                    <div style={{ padding: '0.7em 0', float: 'right' }}>
                        <Button type="primary" onClick={toggleModal}>Create Course</Button>
                    </div>
                    <div>
                        <AdminCourseTable />
                    </div>
                    <Modal
                        centered
                        title="Create Course"
                        visible={isModalVisible}
                        onOk={() => {
                            form.validateFields()
                                .then(async (values) => {
                                    const { course_code, course_name, course_descr, course_registration_deadline, course_drop_deadline, course_student_limit, course_credits } = values;
                                    form.resetFields();
                                    props.createCourse(course_code, course_name, course_descr, course_registration_deadline, course_drop_deadline, course_student_limit, course_credits);
                                }).then(res => {
                                    toggleModal();
                                })
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
                        >
                            <Form.Item
                                required
                                label='Course Code'
                                name='course_code'
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input the course code!",
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
                                        message: "Please input the course name!",
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
                                        message: "Please input the course description!",
                                    },
                                ]}
                            >
                                <Input.TextArea id='create-course-coursedescr' />
                            </Form.Item>

                            <Form.Item
                                required
                                label='Registration Deadline'
                                name='course_registration_deadline'
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input the registration deadline!",
                                    },
                                ]}
                            >
                                <DatePicker  id='create-course-courseregistrationdeadline' />
                            </Form.Item>

                            <Form.Item
                                required
                                label='Drop Deadline'
                                name='course_drop_deadline'
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input the drop deadline!",
                                    },
                                ]}
                            >
                                <DatePicker  id='create-course-coursedropdeadline' />
                            </Form.Item>

                            <Form.Item
                                required
                                label='Student Limit'
                                name='course_student_limit'
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input the student limit!",
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
                                        message: "Please input the course credits!",
                                    },
                                ]}
                            >
                                <InputNumber min={0} step={0.5} id='create-course-coursecredits' />
                            </Form.Item>


                            {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            {failed && "Wrong credentials"}
                        </Form.Item> */}
                        </Form>
                    </Modal>
                        <ToastContainer />
                </div>
            )
        }),
        Students: connect(null, actions)((props) => {
            props.fetchStudents();
            const [isModalVisible, setIsModalVisible] = useState(false);

            const [form] = Form.useForm();

            const toggleModal = () => {
                setIsModalVisible(!isModalVisible);
            }
            return <div>
                <div style={{ padding: '0.7em 0', float: 'right' }}>
                    <Button type="primary" onClick={toggleModal}>Create Student</Button>
                </div>
                <div>
                    <StudentsTable />
                </div>
                <Modal
                    title="Create Student"
                    visible={isModalVisible}
                    onOk={() => {
                        form.validateFields()
                            .then(async (values) => {
                                const { name, username, password } = values;
                                form.resetFields();
                                props.createStudent(name, username, password)
                            }).then(res => {
                                toggleModal();
                            })
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
        }
        )
    }
};



// module.exports = { menus }
