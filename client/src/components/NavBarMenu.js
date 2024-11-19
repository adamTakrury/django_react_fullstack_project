import React from 'react';
import { Navbar, Nav } from 'react-bootstrap'; // Add Nav here
import { NavLink } from 'react-router-dom'; 
const NavBarMenu = () => {
    return (
        <div>
                    <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Products</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav className="mr-auto">
                <NavLink className="show-products-nav" to="/">Products</NavLink>
                <NavLink className="add-product-nav" to="/addProduct">Add Products</NavLink>
            </Nav>
            
        </Navbar>
        </div>
    );
};
export default NavBarMenu;
