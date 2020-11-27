import React, { useState } from "react";

import { Layout, Menu, Breadcrumb, Modal, Form, Input, Button } from "antd";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export const menus = {
    "Student": <>
        <Menu.Item key='1'>Home</Menu.Item>
        <Menu.Item key='2'>Classes</Menu.Item>
        <Menu.Item key='3'>Resgistration</Menu.Item>
        <Menu.Item key='4'>Calendar</Menu.Item>
    </>,
    
    "Admin": <>
        <Menu.Item key='1'>Home</Menu.Item>
        <Menu.Item key='2'>Courses</Menu.Item>
        <Menu.Item key='3'>Students</Menu.Item>
    </>

}

export const views = {
    "Student": {

    },

    "Admin": {
        "home": <div>
            Home
        </div>,
        "courses": <div>
            Courses
        </div>,
        "students": <div>
            Students
        </div>
    }
}



// module.exports = { menus }



