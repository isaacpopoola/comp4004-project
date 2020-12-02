import React, { Component } from "react";
import { connect } from "react-redux";
import "./LandingPage.scss";
import LandingNavBar from "./Navbar/Navbar.component";
import SignInModal from "./SignInModal/Modal.component";
import CoursesTable from "./CoursesTable.component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withCookies } from "react-cookie";
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
            currentview: "home",
        };
    }

    onCollapse = (collapsed) => this.setState({ collapsed });

    handleSignup = () => this.setState({ redirect: true });

    handleSignInModalVisibile = () =>
        this.setState({ signinmodal: !this.state.signinmodal });

    handleSignIn = () => {
        this.setState({ signinmodal: !this.state.signinmodal });
    };

    menuItemClick = ({ item, key }) => {
        const { cookies } = this.props;
        const type = cookies.get("type") || "Student";
        if (type === "Admin") {
            switch (key) {
                case "1":
                    this.setState({ currentview: "home" });
                    break;
                case "2":
                    this.setState({ currentview: "courses" });
                    break;
                case "3":
                    this.setState({ currentview: "students" });
                    break;
                default:
                    break;
            }
        } else if (type === "Student") {
            switch (key) {
                case "1":
                    this.setState({ currentview: "home" });
                    break;
                case "2":
                    this.setState({ currentview: "myCourses" });
                    break;
                case "3":
                    this.setState({ currentview: "registration" });
                    break;
                default:
                    break;
            }
        }
    };

    render() {
        const { collapsed, signinmodal } = this.state;
        const { cookies } = this.props;
        const type = cookies.get("type") || "Student";
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
                            {menus[type]}
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
                            {views[type][this.state.currentview]}
                        </Content>
                    </Layout>
                </Layout>

                <SignInModal
                    signinmodal={signinmodal}
                    handleSignIn={this.handleSignIn}
                />
                <ToastContainer />
            </>
        );
    }
}

// const mapStateToProps = (state) => {};

// const mapDispatchToProps = (dispatch) => {};
// export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

export default withCookies(LandingPage);
