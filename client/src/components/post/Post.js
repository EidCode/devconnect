import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getPost} from '../../actions/postAction'
import Spinner from '../common/spinner';
import PostItem from '../posts/PostItem';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import CommentForm from './CommentForm'
import CommentFeed from './CommentFeed'
class Post extends Component {
    componentDidMount() {
        
    
        this.props.getPost(this.props.match.params.id)
    }
    
    render() {
        const {post, loading} = this.props.posts;
        let postContent;
        if(post === null || loading || Object.keys(post).length === 0) {
            postContent = <Spinner />
        } else {
            postContent = (
                <div>
                    <PostItem post = {post} showAction = {false} />
                    <CommentForm postId = {post._id} />
                    <CommentFeed comments={post.comments} postId={post._id} />
                </div>
                
            )
        }
        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/feed" className="btn btn-light mb-3">Back To Feed</Link>
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    posts: state.posts,
    errors: state.errors
})

export default connect(mapStateToProps, {getPost})(Post);
