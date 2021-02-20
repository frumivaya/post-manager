import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSinglePostAction } from '../services/post.service';
class Librery extends Component {
    
    componentWillMount() {
        this.props.getPost(this.postID);
    }
}

const mapStateToProps = state => {
    return {
        postComment: state.postsReducer.postActive
    }
}

const mapDispatchToProps = disaptch => {
    return {
        getPost(postID) {
            disaptch(getSinglePostAction(postID));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Librery);