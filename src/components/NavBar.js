import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Collapse,
  NavbarToggler,
  Navbar,
  Nav,
  NavItem,
  UncontrolledDropdown, DropdownToggle,
  DropdownMenu, DropdownItem
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
                { user && <Link className='nav-link' to='/collections'>Collections</Link> }
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Workouts
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link className='nav-link' to='/workouts'>My Workouts</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link className='nav-link' to='/shared-workouts'>Shared Workouts</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
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
