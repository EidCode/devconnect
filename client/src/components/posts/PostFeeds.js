import React, { Component } from 'react';
import {connect} from 'react-redux';
import PostItem from './PostItem';
import PropTypes from 'prop-types'

class PostFeeds extends Component {
    
    render() {
        const {posts} = this.props;
        
            
        
        return posts.map((post) => ( <PostItem key={post._id} post={post} /> ))
    }
}

PostFeeds.propTypes = {
    posts: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    auth: state.auth,
    
    
})

export default connect(mapStateToProps)(PostFeeds)