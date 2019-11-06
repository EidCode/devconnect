import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import TextAreaField from '../common/textAreaField';
import TextFieldGroup from '../common/textFieldComponent';
import PropTypes from 'prop-types';
import {AddExperience} from '../../actions/profileActions'

class AddExperiences extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            company: '',
            location: '',
            current: false,
            from: '',
            to: '',
            description: '',
            errors: {},
            disabled: false
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCheck = this.onCheck.bind(this);
    }
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
    componentWillReceiveProps(nextProps) {
        this.setState({errors: nextProps.errors})
    }

    onSubmit(e) {
        e.preventDefault(); 

        const newExperience = {
            title: this.state.title,
            company: this.state.company,
            location: this.state.location,
            current: this.state.current,
            from: this.state.from,
            to: this.state.to,
            description: this.state.description,
        }
        this.props.AddExperience(newExperience, this.props.history); 
        
    }
    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onCheck() {
        this.setState({
            current: !this.state.current,
            disabled: !this.state.disabled
            
        })
    }


    render() {

        const {errors} = this.state;
        return (
            <div className="add-experiences"> 
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link className="btn btn-light" to="/dashboard">Go Back</Link>
                            <h1 className="text-center display-4">Add Experiences</h1>
                            <p className="lead text-center">Add Any Job Or Experiences that you have had in the past</p>
                            <small className="d-block pb-3">* = Required fields</small>
                            <TextFieldGroup 
                                name="company"
                                placeholder="company"
                                value={this.state.company}
                                onChange={this.onChange}
                                errors={errors.company}
                            />
                            <TextFieldGroup 
                                name="title"
                                placeholder="Title"
                                value={this.state.title}
                                onChange={this.onChange}
                                errors={errors.title}
                            />
                            <TextFieldGroup 
                                name="location"
                                placeholder="location"
                                value={this.state.location}
                                onChange={this.onChange}
                                errors={errors.location}
                            />
                            <h6>From Date</h6>
                            <TextFieldGroup 
                                type="date"
                                name="from"
                                placeholder="from"
                                value={this.state.from}
                                onChange={this.onChange}
                                errors={errors.from}
                            />
                            <h6>To Date</h6>
                            <TextFieldGroup
                                type="date" 
                                name="to"
                                placeholder="to"
                                value={this.state.to}
                                onChange={this.onChange}
                                errors={errors.to}
                                disabled={this.state.disabled ? 'disabled' : ''}
                            />
                            
                            <div className="custom-control custom-checkbox" style={{marginBottom: '15px'}}>
                                <input 
                                    type="checkbox" 
                                    name="current"
                                    id="current"
                                    className="custom-control-input" 
                                    value= {this.state.current}
                                    checked= {this.state.current}
                                    onChange= {this.onCheck}
                                    
                                    />  
                                <label className="custom-control-label" for="current">You Currently Work</label>
                            </div>
                            <TextAreaField 
                                    name="description"
                                    placeholder="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    errors={errors.description}
                                    
                            />
                            <input type="submit" value="submit" className="btn btn-primary btn-block" onClick={this.onSubmit} />

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddExperiences.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    AddExperience: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
    errors: state.errors
})



export default connect(mapStateToProps, {AddExperience})(withRouter(AddExperiences));