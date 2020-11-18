import React from "react";
import { Modal, Button, Form, Input } from "antd";

const SignInModal = (props) => {
    return (
        <Modal
        title="Log In"
        visible={props.signinmodal}
        onOk={props.handleSignIn}
        closable={false}
        centered
      // confirmLoading={false} //use redux for this
      >
        <Form
          // {...layout}
          labelCol={{span: 5}}
          name="basic"
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item 
            wrapperCol={{offset: 8, span: 16}}
          >
            
          </Form.Item>
        </Form>

      </Modal>
    );
};

export default SignInModal;
