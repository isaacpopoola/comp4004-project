import React from "react";
import { Modal, Button, Form, Input } from "antd";

const SignInModal = (props) => {

    const [ form ] = Form.useForm();
    const onSubmit = evt =>{
      evt.preventDefault();
      props.handleSignIn()
    }
    
    return (
        <Modal
        className="sign-in-modal"
        title="Sign In"
        visible={props.signinmodal}
        onOk={onSubmit}
        okText = 'Sign In'
        
        closable={false}
        centered
      // confirmLoading={false} //use redux for this
      >
        <Form
          // {...layout}
          className="signin-form"
          labelCol={{span: 5}}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          // onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input id="sign-in-username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password id="sign-in-password"/>
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
