import React, { Component } from "react";
import { connect } from "react-redux";
import "./LandingPage.scss";
import LandingNavBar from "./Navbar/Navbar.component";
import SignInModal from "./SignInModal/Modal.component";
import CoursesTable from "./CoursesTable.component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Layout, Menu, Breadcrumb, Modal, Form, Input, Button } from "antd";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            collapsed: false,
            signinmodal: true,
        };
    }

    onCollapse = (collapsed) => this.setState({ collapsed });

    handleSignup = () => this.setState({ redirect: true });

    handleSignInModalVisibile = () =>
        this.setState({ signinmodal: !this.state.signinmodal });

    handleSignIn = () => {
        this.setState({ signinmodal: !this.state.signinmodal });
    };

    render() {
        const { collapsed, signinmodal } = this.state;

        return (
            <>
                <Layout style={{ minHeight: "100vh" }}>
                    <Sider
                        collapsible
                        collapsed={collapsed}
                        onCollapse={this.onCollapse}
                    >
                        <div className='logo' />
                        <Menu
                            theme='dark'
                            defaultSelectedKeys={["1"]}
                            mode='inline'
                        >
                            <Menu.Item key='1'>Option 1</Menu.Item>
                            <Menu.Item key='2'>Option 2</Menu.Item>
                            <SubMenu key='sub1' title='User'>
                                <Menu.Item key='3'>Tom</Menu.Item>
                                <Menu.Item key='4'>Bill</Menu.Item>
                                <Menu.Item key='5'>Alex</Menu.Item>
                            </SubMenu>
                            <SubMenu key='sub2' title='Team'>
                                <Menu.Item key='6'>Team 1</Menu.Item>
                                <Menu.Item key='8'>Team 2</Menu.Item>
                            </SubMenu>
                            <Menu.Item key='9'>Files</Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className='site-layout'>
                        <Header
                            className='site-layout-background'
                            style={{ padding: 0 }}
                        >
                            <LandingNavBar
                                onClick={this.handleSignup}
                                handleSignin={this.handleSignInModalVisibile}
                            />
                        </Header>
                        <Content style={{ margin: "0 16px" }}>
                            <Breadcrumb style={{ margin: "16px 0" }}>
                                <Breadcrumb.Item>User</Breadcrumb.Item>
                                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                            </Breadcrumb>
                            <div
                                className='site-layout-background'
                                style={{ padding: 24, minHeight: 360 }}
                            >
                                Bill is a cat.
                            </div>
                            <CoursesTable />
                        </Content>
                        <Footer style={{ textAlign: "center" }}>
                            Ant Design ©2018 Created by Ant UED
                        </Footer>
                    </Layout>
                </Layout>

                <SignInModal
                    signinmodal={signinmodal}
                    handleSignIn={this.handleSignIn}
                />
                <ToastContainer autoClose={1300} />
            </>
        );
    }
}

// const mapStateToProps = (state) => {};

// const mapDispatchToProps = (dispatch) => {};
// export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

export default LandingPage;
