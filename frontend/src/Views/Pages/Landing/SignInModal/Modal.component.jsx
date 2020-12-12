import React, { useState } from "react";
import { Modal, Form, Input, Tabs } from "antd";
import api from "../../../../Services";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

const { TabPane } = Tabs;

const SignInModal = (props) => {
    const [failed, setFailed] = useState(false);
    const [isLogin, setIsLogin] = useState("1");
    const [cookie, setCookie] = useCookies(["username"]);
    const [signInForm] = Form.useForm();
    const [registerForm] = Form.useForm();

    const onTabChange = (key) => {
        setIsLogin(key);
    };

    return (
        <Modal
            className='sign-in-modal'
            title='Sign In'
            visible={props.signinmodal}
            onOk={() => {
                (isLogin === "1" ? signInForm : registerForm)
                    .validateFields()
                    .then(async (values) => {
                        if (isLogin === "1") {
                            const { username, password } = values;
                            signInForm.resetFields();
                            api.login({
                                username,
                                password,
                            }).then((res) => {
                                if (res.status === 200) {
                                    setCookie("username", res.data.username, {
                                        path: "/",
                                    });
                                    setCookie("type", res.data.type, {
                                        path: "/",
                                    });
                                    props.handleSignIn();
                                } else {
                                    if (
                                        res.data.message ==
                                        "Student has not been approved"
                                    ) {
                                        toast.error(
                                            `Student has not been approved`
                                        );
                                    }
                                    setFailed(true);
                                }
                            });
                        } else if (isLogin === "2") {
                            const { username, password, name } = values;
                            registerForm.resetFields();
                            api.register({
                                username,
                                password,
                                name,
                                type: "Student",
                            }).then((res) => {
                                if (res.status === 201) {
                                    toast.success("Successfully registered!");
                                    setIsLogin("1");
                                } else {
                                    toast.error(res.data.message);
                                }
                            });
                        } else {
                            alert(isLogin);
                        }
                    })
                    .catch((info) => {
                        console.log("Validate Failed:", info);
                    });
            }}
            okText='Sign In'
            closable={false}
            centered
            // confirmLoading={false} //use redux for this
        >
            <Tabs
                defaultActiveKey='1'
                onChange={onTabChange}
                activeKey={isLogin}
            >
                <TabPane tab='Sign In' key='1'>
                    <Form
                        // {...layout}
                        form={signInForm}
                        className='signin-form'
                        labelCol={{ span: 5 }}
                        name='basic'
                        initialValues={{ remember: true }}
                    >
                        <Form.Item
                            label='Username'
                            name='username'
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username!",
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

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            {failed && "Wrong credentials"}
                        </Form.Item>
                    </Form>
                </TabPane>
                <TabPane tab='Register' key='2'>
                    <Form
                        // {...layout}
                        form={registerForm}
                        className='signin-form'
                        labelCol={{ span: 5 }}
                        name='basic'
                        initialValues={{ remember: true }}
                    >
                        <Form.Item
                            label='Username'
                            name='username'
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username!",
                                },
                            ]}
                        >
                            <Input id='register-username' />
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
                            <Input.Password id='register-password' />
                        </Form.Item>
                        <Form.Item
                            label='Name'
                            name='name'
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your name!",
                                },
                            ]}
                        >
                            <Input id='register-name' />
                        </Form.Item>
                    </Form>
                </TabPane>
            </Tabs>
        </Modal>
    );
};

export default SignInModal;
