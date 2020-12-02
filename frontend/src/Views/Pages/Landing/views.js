import React, { useState } from "react";
import StudentsTable from "./StudentsTable/StudentsTable.component";
import CoursesTable from "./CoursesTable.component";
import EnrolledCoursesTable from "./EnrolledCoursesTable.component";

import { Layout, Menu, Breadcrumb, Modal, Form, Input, Button } from "antd";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export const menus = {
    Student: (
        <>
            <Menu.Item key='1'>Home</Menu.Item>
            <Menu.Item key='2'>My Courses</Menu.Item>
            <Menu.Item key='3'>Registration</Menu.Item>
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
    Student: {
        registration: (
            <div>
                Registration
                <CoursesTable />
            </div>
        ),
        myCourses: (
            <div>
                My Courses <EnrolledCoursesTable />
            </div>
        ),
    },

    Admin: {
        home: <div>Home</div>,
        courses: <div>Courses</div>,
        students: (
            <div>
                Students
                <StudentsTable />
            </div>
        ),
    },
};

// module.exports = { menus }
