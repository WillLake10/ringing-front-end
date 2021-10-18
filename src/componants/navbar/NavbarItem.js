import React from 'react';
import "./Navbar.css"
import {Link} from "react-router-dom";

function NavbarItem(props) {
    return (
        <li>
            <Link to={props.href}>{props.name}</Link>
        </li>
    );
}

export default NavbarItem;
