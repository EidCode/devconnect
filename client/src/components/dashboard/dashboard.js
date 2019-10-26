import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getCurrentProfile} from '../../actions/profileActions';
import Spinner from '../common/spinner';
import {Link} from 'react-router-dom'

class Dashboard extends Component {
    componentDidUpdate() {
        if(this.props.auth.isAuthenticated === false) {
            this.props.history.push('/login')
        } 
    }

    componentDidMount(){
        this.props.getCurrentProfile();
        
        
    }
    render() {
        const {profile, loading} = this.props.profile;
        const {user} = this.props.auth;
        let currentProfileContent;
        if(profile === null || loading) {
            currentProfileContent = <Spinner />
        } else {
            if(Object.keys(profile) > 0) {
                currentProfileContent = <h4>Display Profile</h4>
            } else {
                currentProfileContent = (
                    <div>
                        <p className="lead text-muted"> Welcome {user.name}</p>
                        <p className="lead text-muted"> You Didnt Creat a Profile Yet Check This</p>
                        <Link className="btn btn-lg btn-info" to="/create-profile">Create Profile</Link>
                    </div>
                )
            }
        }
        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {currentProfileContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard)
