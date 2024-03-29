import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authAction';
import {clearCurrentProfile} from '../../actions/profileActions';
import PropTypes from 'prop-types';


class Navbar extends Component {
    onLogoutClick(e) {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
        
    }

    
    render() {
        const {isAuthenticated, user} = this.props.auth;
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/feed">Posts Feed</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link" onClick={this.onLogoutClick.bind(this)}>Logout
                        <img src={user.avatar} style={{'width': '25px', 'marginLeft': '5px'}} className="rounded-circle"/>
                    </a> 
                    
                </li>
                
            </ul>
        );
        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        )
        return (
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                    <div className="container">
                    <Link className="navbar-brand" to="/">DevConnector</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                        <Link className="navbar-brand" to="/profiles">Developers</Link>
                        </li>
                        </ul>
                        {isAuthenticated ? authLinks : guestLinks} 
                        
                    </div>
                    </div>
                </nav>
            
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired 
    
}


const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default  connect(mapStateToProps, {logoutUser, clearCurrentProfile})(Navbar);