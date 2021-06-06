import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Collapse,
  NavbarToggler,
  Navbar,
  Nav,
  NavItem,
} from 'reactstrap';
import LogoutButton from './buttons/LogoutButton';
import LoginButton from './buttons/LoginButton';

const NavBar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar light expand='md'>
        <Link className='navbar-brand' to='/' >Swimmer Buddy</Link>
        <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='mr-auto' navbar>
              <NavItem>
                <Link className='nav-link' to='/collections'>Collections</Link>
              </NavItem>
              <NavItem>
                <Link className='nav-link' to='/workouts'>Workouts</Link>
              </NavItem>
            </Nav>
            { !user && <LoginButton /> }
            { user && <LogoutButton /> }
          </Collapse>
      </Navbar>
    </div>
  );
};

NavBar.propTypes = {
  user: PropTypes.any
};

export default NavBar;
