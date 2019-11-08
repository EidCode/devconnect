import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/spinner';
import PostForm from './PostForm';
import {getPosts} from '../../actions/postAction';
import PostFeeds from './PostFeeds'

class Posts extends Component {
    

    componentDidMount(){
        this.props.getPosts();
    }
    render() {
        const {posts, loading} = this.props.posts;
        let postContent;
        if(posts === null || loading) {
            postContent = <Spinner />
        } else {
            postContent = <PostFeeds posts= {posts} />
        }
        

        return (
            <div className="feed">
                <div className="container">
                    <div className="col-md-12">
                        <PostForm />
                        {postContent}
                    </div>
                </div>
            </div>
        )
    }
}
Posts.propTypes = {
    getPosts: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
    auth: state.auth,
    posts: state.posts
})

export default connect(mapStateToProps, {getPosts})(Posts)