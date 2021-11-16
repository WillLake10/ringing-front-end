import React from 'react';
import "./Navbar.css"
import NavbarItem from "./NavbarItem";
import LoginItem from "./LoginItem";

const Navbar = () => {
    return (
        <header className="header">
            <div className='navbar'>
                <ul className="navbar">
                    <NavbarItem href={'/'} name={'Home'}/>
                    <NavbarItem href={'/method/search'} name={'Methods'}/>
                    <NavbarItem href={'/towers'} name={'Towers'}/>
                    <NavbarItem href={'/performances'} name={'Performances'}/>
                    <LoginItem href={'/login'} name={'Log In'}/>
                </ul>
            </div>
        </header>
    );
}
export default Navbar;
