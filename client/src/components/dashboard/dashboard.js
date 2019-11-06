import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getCurrentProfile, deleteProfile} from '../../actions/profileActions';
import Spinner from '../common/spinner';
import {Link} from 'react-router-dom';
import ProfileMethods from './profileMethods';
import DisplayExperiences from './DisplayExperiences';
import DisplayEducations from './DisplayEducation';


class Dashboard extends Component {
    componentDidUpdate() {
        if(this.props.auth.isAuthenticated === false) {
            this.props.history.push('/login')
        } 
    }

    componentDidMount(){
        this.props.getCurrentProfile();
        console.log(this.props)
        
        
    }

    onDeleteClick(e) {
        this.props.deleteProfile();
    }
    render() {
        const {profile, loading} = this.props.profile;
        const {user} = this.props.auth;
        let currentProfileContent;
        if(profile === null || loading) {
            currentProfileContent = <Spinner />
        } else {
            if(Object.keys(profile).length > 0) {
                currentProfileContent = (
                    <div>
                        <p className="lead text-muted"> Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>
                        <ProfileMethods />
                        <h3>Experiences</h3>
                        <DisplayExperiences experiences={profile.experiences} />
                        <h3>Education</h3>
                        <DisplayEducations educations={profile.education} />
                        <div style={{marginBottom: '60px'}}></div>
                        <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete Profile</button>
                    </div>
                )
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
                            <h4>Experiences</h4>
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

export default connect(mapStateToProps, {getCurrentProfile, deleteProfile})(Dashboard)
