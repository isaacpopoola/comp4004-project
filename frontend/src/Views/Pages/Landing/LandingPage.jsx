import React, { Component } from "react";
import { connect } from "react-redux";
import "./LandingPage.scss";
import LandingNavBar from "./Navbar/Navbar.component";
import SignInModal from "./SignInModal/Modal.component";
// import StudentsTable from "./StudentsTable/StudentsTable.component";

import { menus, views } from "./views";

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
            currentview: 'home'
        };
    }

    onCollapse = (collapsed) => this.setState({ collapsed });

    handleSignup = () => this.setState({ redirect: true });

    handleSignInModalVisibile = () =>
        this.setState({ signinmodal: !this.state.signinmodal });

    handleSignIn = () => {
        this.setState({ signinmodal: !this.state.signinmodal });
    };

    menuItemClick = ({ item, key}) => {
        switch (key) {
            case '1':
                this.setState({ currentview: 'home' });
                break;
            case '2':
                this.setState({ currentview: 'courses' });
                break;
            case '3':
                this.setState({ currentview: 'students' });
                break;
            default:
                break;
        }

    }

    render() {
        const { collapsed, signinmodal } = this.state;
        console.log(this.state.currentview);
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
                            onSelect={this.menuItemClick}
                        >
                            {menus["Admin"]} {/**TODO: change "Admin" to a user type variable */}
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
                            {/* <Breadcrumb style={{ margin: "16px 0" }}>
                                <Breadcrumb.Item>User</Breadcrumb.Item>
                                <Breadcrumb.Item>Bill</Breadcrumb.Item>

                            </Breadcrumb> */}
                                          
                            {views["Admin"][this.state.currentview]} {/**TODO: change "Admin" to a user type variable */}
                            {/* <StudentsTable /> */}
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
            </>
        );
    }
}

// const mapStateToProps = (state) => {};

// const mapDispatchToProps = (dispatch) => {};
// export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

export default LandingPage;
