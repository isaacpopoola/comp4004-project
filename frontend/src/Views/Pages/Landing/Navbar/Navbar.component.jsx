import React from "react";
import { Button } from "antd";
import "./Navbar.scss";

const Navbar = (props) => {
    return (
        <nav className='nav'>
            <Button
                className='signin'
                type='primary'
                onClick={props.handleLogout}
            >
                Log Out
            </Button>
        </nav>
    );
};

export default Navbar;
