import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authAction';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/textFieldComponent'

class Login extends Component {

    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
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
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }

        if(nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(newUser)
    }
    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {errors} = this.props;
        
        return (
            <div>
                 <div className="login">
                        <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your DevConnector account</p>
                            <form action="dashboard.html" onSubmit={this.onSubmit}>
                                <TextFieldGroup 
                                    type='email'
                                    name="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    errors={errors.email}
                                />
                                <TextFieldGroup 
                                    type='password'
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    errors={errors.password}
                                />
                                
                                
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                            </div>
                        </div>
                        </div>
                </div>
            </div>
        )
    }
}


    Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, {loginUser})(withRouter(Login));