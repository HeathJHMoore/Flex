import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import firebase from 'firebase/app'
import 'firebase/auth'

import './MyNavbar.scss';



class MyNavBar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  };

  state = {
    isOpen: false,
  }

  toggle = () => {
    this.setState({isOpen: !this.state.isOpen})
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }  

  closeNav = () => {
    if (window.screen.width < 600) {
    this.setState({isOpen: !this.state.isOpen})
    }
  }

  render() {
    const { authed } = this.props;
    const buildNavbar = () => {
      if (authed) {
        return (
          <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={RRNavLink} to='/MyDashboard' onClick={this.closeNav}>My Dashboard</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to='/ExerciseDictionary' onClick={this.closeNav}>Exercise Dictionary</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to='/ExerciseStatistics' onClick={this.closeNav}>Workout Statistics</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={this.logMeOut}>Logout</NavLink>
          </NavItem>
          </Nav>
        );
      }
      return <Nav className="ml-auto" navbar />;
    };
    const navColor = 'rgb(2,48,118)'
    return (
      <div>
        <Navbar className="MyNavbar" expand="md">
          <NavbarBrand href="/" className="pl-2">Flex</NavbarBrand>
          <NavbarToggler><i class="fas fa-bars" onClick={this.toggle}></i></NavbarToggler>
          <Collapse isOpen={this.state.isOpen} navbar>
           {buildNavbar()}
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

export default MyNavBar;
