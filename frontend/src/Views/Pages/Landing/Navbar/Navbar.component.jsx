import React from "react";
import { Button } from "antd";
import "./Navbar.scss";

const Navbar = (props) => {
    return (
        <nav className='nav'>
            {/* eslint-disable-next-line */}
            <a className='signup' onClick={props.handleSignup}>
                Join Now
            </a>
            <Button type='primary'>Sign In</Button>
        </nav>
    );
};

export default Navbar;
