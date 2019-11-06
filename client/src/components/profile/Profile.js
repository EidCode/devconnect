import React, { Component } from 'react';
import ProfileCreds from './ProfileCreds';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileGithub from './ProfileGithub';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/spinner';
import {Link} from 'react-router-dom';
import {getProfileByHandle} from '../../actions/profileActions'

class Profile extends Component {
    componentWillReceiveProps(nextProps) {
        if(nextProps.profile.profile === null && nextProps.profile.loading ) {
            this.props.history.push('/not-found')
        }
    }
    componentDidMount() {
        if(this.props.match.params.handle) {
            console.log(this.props)
            this.props.getProfileByHandle(this.props.match.params.handle)
        }
    }
    render() {
        const {profile, loading} =  this.props.profile;
        let profileContent;
        if(profile === null || loading) {
            profileContent = <Spinner />
        } else {
            profileContent = (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link className="btn btn-light mb-3 float-left" to="/profiles">Back To Profile</Link>
                        </div>
                        <div className="col-md-6" />
                    </div>
                    <ProfileHeader profile={profile} /> 
                    <ProfileAbout profile={profile} /> 
                    <ProfileCreds experiences = {profile.experiences} education={profile.education} /> 
                    <ProfileGithub /> 
                </div>
            )
        }

        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {profileContent}
                        </div>
                    </div>
                </div> 
               
            </div>
        )
    }
}


Profile.propTypes = {
    profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getProfileByHandle})(Profile);