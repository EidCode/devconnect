import React, { Component } from 'react';
import PropTyeps from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authAction';
import TextFieldGroup from '../common/textFieldComponent';

class Register extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }
    

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
        }
        this.props.registerUser(newUser, this.props.history)
        
    }
    render() {
        const {errors} = this.state;
        const {user} = this.props.auth;
        console.log(this.props);
        
        return (
        <div className="register">
            {user ? user.name : null}
            <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">Create your DevConnector account</p>
                <form action="create-profile.html"
                onSubmit = {this.onSubmit}>
                    <TextFieldGroup 
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                        errors={errors.name}
                    />
                    <TextFieldGroup 
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        errors={errors.email}
                        info="this site use gravatar"
                    />
                    
                    <TextFieldGroup 
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        errors={errors.password}
                    />
                    
                    
                    <TextFieldGroup 
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={this.state.password2}
                        onChange={this.onChange}
                        errors={errors.password2}
                    />
                    <input 
                        type="submit" 
                        className="btn btn-info btn-block mt-4" 
                        />
                </form>
                </div>
            </div>
            </div>
  </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTyeps.func.isRequired,
    auth: PropTyeps.object.isRequired,
    errors: PropTyeps.object.isRequired
}

const mapSateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapSateToProps, {registerUser})(withRouter(Register));