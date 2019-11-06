import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {addLike, deletePost, unLike} from '../../actions/postAction';
import PropTypes from 'prop-types';

class PostItem extends Component {
    findUserLike(likes) {
        const {auth} = this.props
        if(likes.filter(like => like.user === auth.user.id).length > 0) {
            return true
        } else {
            return false
        }
    }
    onAddLike(postId) {
        
        this.props.addLike(postId)
    }
    onDeleteLike(postId) {
        
        this.props.unLike(postId)
    }

    onDeleteClick(id) {
        this.props.deletePost(id)
    }

    render() {
        
        const { post, auth, showAction} = this.props;
        return (
            <div>
                <div className="posts" key={post._id} >
            
            <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-2">
                <a href="profile.html">
                    <img className="rounded-circle d-none d-md-block" src={post.avatar}
                    alt="" />
                </a>
                <br />
                <p className="text-center">{post.name}</p>
                </div>
                <div className="col-md-10">
                <p className="lead">{post.text}</p>

                {showAction ? (<span>
                    <button type="button" className="btn btn-light mr-1" onClick={this.onAddLike.bind(this, post._id)}>
                    <i className={classnames("fas fa-thumbs-up", {
                        'text-info' : this.findUserLike(post.likes)
                    })}></i>
                <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button type="button" className="btn btn-light mr-1" onClick={this.onDeleteLike.bind(this, post._id)}>
                    <i className="text-secondary fas fa-thumbs-down"></i>
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1"> 
                    Comments
                </Link>
                {post.user === auth.user.id ? (<button type="button" className="btn btn-danger mr-1" onClick={this.onDeleteClick.bind(this, post._id)}>
                    <i className="fas fa-times" />
                </button>) : null}
                </span>) : null}
                
                 
                </div>
            </div>
                    </div>

        </div>
            </div>
        )
    }
}

PostItem.defaultProps = {
    showAction: true
}

PostItem.propTypes = {
    addLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    unLike: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
    
})

export default connect(mapStateToProps, {addLike, deletePost, unLike})(PostItem)