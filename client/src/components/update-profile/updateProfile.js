import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextAreaField from '../common/textAreaField';
import SelectGroup from '../common/selectGroup';
import TextFieldGroup from '../common/textFieldComponent';
import InputGroup from '../common/inputGroup';
import {withRouter} from 'react-router-dom';
import {createProfile, getCurrentProfile} from '../../actions/profileActions';
import isEmpty from '../../utils/isEmpty';

class CreateProfile extends Component {
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

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const profileData = {
            handle: this.state.handle,
            website: this.state.website,
            location: this.state.location,
            company: this.state.company,
            status: this.state.status,
            facebook: this.state.facebook,
            twitter: this.state.twitter,
            linkedin: this.state.linkedin,
            instgram: this.state.instgram,
            youtube: this.state.youtube,
            skills: this.state.skills,
            bio: this.state.bio,
            githubusername: this.state.githubusername,
        }
        this.props.createProfile(profileData, this.props.history)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    componentDidUpdate() {
        if(this.props.auth.isAuthenticated === false) {
            this.props.history.push('/login')
        } 
    }

    componentDidMount() {
        this.props.getCurrentProfile();
        if(this.props.auth.isAuthenticated === false) {
            this.props.history.push('/login')
        } 
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }

        if(nextProps.profile.profile) {
            const profile = nextProps.profile.profile;
            const skillsCSV =  profile.skills.join(',');
            profile.handle = !isEmpty(profile.handle) ? profile.handle : '';
            profile.company = !isEmpty(profile.company) ? profile.company : '';
            profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
            profile.location = !isEmpty(profile.location) ? profile.location : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.twitter = !isEmpty(profile.twitter) ? profile.twitter : '';
            profile.facebook = !isEmpty(profile.facebook) ? profile.facebook : '';
            profile.instgram = !isEmpty(profile.instgram) ? profile.instgram : '';
            profile.linkedin = !isEmpty(profile.linkedin) ? profile.linkedin : '';
            profile.youtube = !isEmpty(profile.youtube) ? profile.youtube : '';
            profile.status = !isEmpty(profile.status) ? profile.status : '';

            this.setState({
                handle: profile.handle,
                company: profile.company,
                location: profile.location,
                website: profile.website,
                bio: profile.bio,
                githubusername: profile.githubusername,
                twitter: profile.twitter,
                instgram: profile.instgram,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
                youtube: profile.youtube,
                skills: skillsCSV,
                status: profile.status
            })
            
        }
    }
    

    
    render() {
        const {errors, displaySocialNetworks} = this.state;

        let secialInputs;
        if(displaySocialNetworks) {
            secialInputs = (
                <div>
                    <InputGroup 
                        name="twitter"
                        placeholder="Twitter profile url"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        icon="fab fa-twitter"
                        errors={errors.twitter}
                    />
                    <InputGroup 
                        name="facebook"
                        placeholder="facebook profile url"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        icon="fab fa-facebook"
                        errors={errors.facebook}
                    />
                    <InputGroup 
                        name="linkedin"
                        placeholder="linkedin profile url"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        icon="fab fa-linkedin"
                        errors={errors.linkedin}
                    />
                    <InputGroup 
                        name="youtube"
                        placeholder="youtube profile url"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        icon="fab fa-youtube"
                        errors={errors.youtube}
                    />
                    <InputGroup 
                        name="instagram"
                        placeholder="instagram profile url"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        icon="fab fa-instagram"
                        errors={errors.instagram}
                    />
                </div>
            )
        }
        const options = [
            {label: '* select professional status', value: 0},
            {label: 'developer', value: 'developer'},
            {label: 'junior developer', value: 'junior developer'},
            {label: 'senior developer', value: 'senior developer'},
            {label: 'manager', value: 'manager'},
            {label: 'student', value: 'student'},
            {label: 'teacher', value: 'teacher'},
            {label: 'intern', value: 'intern'},
            {label: 'other', value: 'other'}
        ]
        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Edit Profile</h1>
                            <p className="lead text-center">
                                lets get some information about your life
                            </p>
                            <small className="d-block pb-3">* = Required Field</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup 
                                    name="handle"
                                    placeholder="* profile handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    errors={errors.handle}
                                    info="Unique handle for your profile url"
                                />
                                <SelectGroup 
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    errors={errors.status}
                                    options= {options}
                                    info="what is your position"
                                />
                                <TextFieldGroup 
                                    name="company"
                                    placeholder="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    errors={errors.company}
                                    
                                />
                                <TextFieldGroup 
                                    name="website"
                                    placeholder="website"
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    errors={errors.website}
                                    
                                />
                                <TextFieldGroup 
                                    name="location"
                                    placeholder="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    errors={errors.location}
                                    
                                />
                                <TextFieldGroup 
                                    name="skills"
                                    placeholder="skills"
                                    value={this.state.skills}
                                    onChange={this.onChange}
                                    errors={errors.skills}
                                    
                                />
                                <TextFieldGroup 
                                    name="githubusername"
                                    placeholder="githubusername"
                                    value={this.state.githubusername}
                                    onChange={this.onChange}
                                    errors={errors.githubusername}
                                    
                                />
                                <TextAreaField 
                                    name="bio"
                                    placeholder="bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    errors={errors.bio}
                                    
                                />
                                <div className="mb-3">
                                    <button type="button" onClick={() => {
                                        this.setState(prevState => ({
                                            displaySocialNetworks: !prevState.displaySocialNetworks
                                        }))
                                    }} className="btn btn-light">Add Aocial Networks</button>
                                    <span className="text-muted">Optional</span>
                                </div>
                                {secialInputs}
                                <input type="submit" value="Submit" className="btn btn-info btn-block" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
}


const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(CreateProfile));