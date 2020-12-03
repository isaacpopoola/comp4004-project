import React, { useState } from "react";
import StudentsTable from "./StudentsTable/StudentsTable.component";
import CoursesTable from "./CoursesTable.component";
import AdminCourseTable from "./AdminCourseTable.component";

import * as actions from "../../../Redux/Actions";
import { connect } from "react-redux";


import { Layout, Menu, Modal, Form, Input, Button, notification, message } from "antd";
import { createStudent } from "../../../Redux/Actions";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


export const menus = {
    Student: (
        <>
            <Menu.Item key='1'>Home</Menu.Item>
            <Menu.Item key='2'>Classes</Menu.Item>
            <Menu.Item key='3'>Resgistration</Menu.Item>
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
    Student: {},

    Admin: {
        Home: () => {
            return (
                <div>Home</div>
            )
        },
        Courses: (props) => {
            const [isModalVisible, setIsModalVisible] = useState(false);

            const toggleModal = () => {
                setIsModalVisible(!isModalVisible);
            }
            return (
                <div>
                    <div style={{ padding: '0.7em 0', float: 'right' }}>
                    <Button type="primary" onClick={toggleModal}>Create Course</Button>
                </div>
                <div>
                    <AdminCourseTable />
                </div>
                    
                </div>
            )
        },
        Students: connect(null, actions)((props) => {
            props.fetchStudents();
            const [isModalVisible, setIsModalVisible] = useState(false);
            const [failed, setFailed] = useState(false);


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
                                const { username, name } = values;
                                form.resetFields();
                                props.createStudent({ username, name, password: "temppassword" })
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
                            <Input id='sign-in-username' />
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
                            <Input id='sign-in-username' />
                        </Form.Item>

                        <Form.Item
                            label='Password'
                            name='password'
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input.Password id='sign-in-password' />
                        </Form.Item>

                        {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            {failed && "Wrong credentials"}
                        </Form.Item> */}
                    </Form>
                </Modal>
            </div>
        }
        )
    }
};



// module.exports = { menus }
