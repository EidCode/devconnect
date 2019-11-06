import React, { Component } from 'react';
import TextAreaField from '../common/textAreaField';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addPost} from '../../actions/postAction'

class PostForm extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        this.setState({errors: nextProps.errors})
    }
    

    
    onChange(e) {
        this.setState({text: e.target.value})
    }
    onSubmit(e) {
        e.preventDefault();
        const newPost = {
            text: this.state.text,
            name: this.props.auth.user.name,
            avatar: this.props.auth.user.avatar
        };
        this.props.addPost(newPost);
        console.log(this.props)
        this.setState({text: '', errors: {}})

    }
    render() {
        const {errors} = this.state;
        return (
            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-header bg-info text-white">
                        Say Somthing...
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <TextAreaField
                                    placeholder="Add Post"
                                    name="text"
                                    value={this.state.text}
                                    onChange={this.onChange}
                                    errors={errors.text}
                                />
                            </div>
                        <button type="submit" className="btn btn-dark">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


const addStateToProps = (state) => ({ 
    auth: state.auth,
    errors: state.errors,
    posts: state.posts
})

export default connect(addStateToProps, {addPost})(PostForm);