import React, { Component } from "react";
import "./LandingPage.scss";
import LandingNavBar from "./Navbar/Navbar.component";
import SignInModal from "./SignInModal/Modal.component";
import { toast, ToastContainer } from "react-toastify";
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

    handleLogout = () => {
        const { cookies } = this.props;
        cookies.remove("username");
        cookies.remove("type");
        toast.success("Logged Out");
        this.handleSignIn();
    };

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
                    this.setState({ currentview: "Home" });
                    break;
                case "2":
                    this.setState({ currentview: "Courses" });
                    break;
                case "3":
                    this.setState({ currentview: "Students" });
                    break;
                default:
                    break;
            }
        } else if (type === "Student") {
            switch (key) {
                case "1":
                    this.setState({ currentview: "Home" });
                    break;
                case "2":
                    this.setState({ currentview: "MyCourses" });
                    break;
                case "3":
                    this.setState({ currentview: "Registration" });
                    break;
                default:
                    break;
            }
        }
    };

    route = (type, menu) => {
        switch (type) {
            case "Student":
                switch (menu) {
                    case "MyCourses":
                        return <views.Student.MyCourses />;
                    case "Registration":
                        return <views.Student.Registration />;
                }
                break;
            case "Admin":
                switch (menu) {
                    case "Home":
                        return <views.Admin.Home />;
                    case "Courses":
                        return <views.Admin.Courses />;
                    case "Students":
                        return <views.Admin.Students />;
                }
                break;
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
                                handleLogout={this.handleLogout}
                            />
                        </Header>
                        <Content style={{ margin: "0 16px" }}>
                            {this.route(type, this.state.currentview)}
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

export default withCookies(LandingPage);
