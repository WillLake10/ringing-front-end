import React from 'react';
import "./Navbar.css"
import {Link} from "react-router-dom";

function LoginItem(props) {
    return (
        <li style={{float: 'right'}}>
            <Link to={props.href} class="active">Log in</Link>
        </li>
    );
}

export default LoginItem;
