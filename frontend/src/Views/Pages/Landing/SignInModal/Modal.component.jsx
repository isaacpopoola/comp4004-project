import React, { useState } from "react";
import { Modal, Form, Input } from "antd";
import api from "../../../../Services";
import { useCookies } from "react-cookie";

const SignInModal = (props) => {
    const [failed, setFailed] = useState(false);
    const [cookie, setCookie] = useCookies(["username"]);
    const [form] = Form.useForm();

    return (
        <Modal
            className='sign-in-modal'
            title='Sign In'
            visible={props.signinmodal}
            onOk={() => {
                form.validateFields()
                    .then(async (values) => {
                        const { username, password } = values;
                        form.resetFields();
                        api.login({ username, password, type: "Student" }).then(
                            (res) => {
                                if (res.status === 200) {
                                    setCookie("username", res.data.username, {
                                        path: "/",
                                    });
                                    setCookie("type", res.data.type, {
                                        path: "/",
                                    });
                                    props.handleSignIn();
                                } else {
                                    setFailed(true);
                                }
                            }
                        );
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
            <Form
                // {...layout}
                form={form}
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
        </Modal>
    );
};

export default SignInModal;
