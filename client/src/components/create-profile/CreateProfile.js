import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class CreateProfile extends Component {
    componentDidUpdate() {
        if(this.props.auth.isAuthenticated === false) {
            this.props.history.push('/login')
        } 
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated === false) {
            this.props.history.push('/login')
        } 
    }

    constructor() {
        super();
        this.state = {
            displaySocialNetworks: false,
            handle: '',
            website: '',
            location: '',
            company: '',
            status: '',
            facebook: '',
            twitter: '',
            linkedin: '',
            instgram: '',
            youtube: '',
            skills: '',
            bio: '',
            githubusername: '',
            errors: {}
        }
    }

    
    render() {
        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Create Your Profile</h1>
                            <p className="text-center">
                                lets get some information about your life
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps)(CreateProfile);