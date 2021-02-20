import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCommentToMyLibrery, getSinglePostAction, removeCommentFromMyLibrery, updateComment } from '../services/post.service';

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editorsDictionary: {},
            postComment: {}
        };
    }

    componentWillMount() {
        this.props.getPost(this.postID);

    }

    componentDidMount() {
        console.log(`post comp mounted state is ${this.state}`);

    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.postID !== this.postID) {
            this.props.getPost(this.postID);
        }
    }

    get postID() {
        return this.props.match.params.postID;
    }

    async addToLibrery(comment) {
        await addCommentToMyLibrery(comment)
        await this.refrechLibrary();
    }

    async removeFromLibrery(commentId) {
        await removeCommentFromMyLibrery(commentId)
        await this.refrechLibrary();
    }

    async startComment(commentId) {
        this.setState({ editorsDictionary: { [commentId]: 'open' } })
    }

    async saveComment(commentsList, commentIdx) {
        this.addToLibrery(commentsList[commentIdx]);
        this.setState({ editorsDictionary: {} })
    }

    async refrechLibrary() {
        await this.props.getPost(this.postID);
    }


    async bodyInputChange(commentsList, commIdx, body) {
        console.log(`commentId: ${commentsList[commIdx].id}, the new body is: ${body} `)
        const newPostComment = this.state.postComment;
        commentsList[commIdx].body = body;
        newPostComment.comments = commentsList;

        this.setState({ postComment: newPostComment });


    }

    tmpComment = '';
    commentsDictionary = {};

    render() {

        if (!this.state.postComment.comments && this.props.postComment) {
            this.setState({ postComment: this.props.postComment });
        }

        const commentsList = this.state.postComment && this.state.postComment.comments ? this.state.postComment.comments : [];



        return (
            <div className="posts-page">
                {this.props.postComment && this.props.postComment.post ?
                    <div className="card-body">
                        <h1>post </h1>
                        <h5 className="card-title">{this.props.postComment.post.id}  {this.props.postComment.post.body}</h5>
                    </div>
                    : ''
                }
                <h3>comments</h3>
                <table className="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">id</th>
                            <th scope="col">postId</th>
                            <th scope="col">name</th>
                            <th scope="col">email</th>
                            <th scope="col">body</th>
                            <th scope="col">librery</th>
                            <th scope="col">actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commentsList && commentsList.length ? commentsList.map((comment, commIdx) =>
                            <tr>
                                <td scope="row">{commIdx}</td>
                                <td scope="row">{comment.id}</td>
                                <td scope="row">{comment.postId}</td>
                                <td scope="row">{comment.name}</td>
                                <td scope="row">{comment.email}</td>
                                {this.state.editorsDictionary && this.state.editorsDictionary[comment.id] && this.state.editorsDictionary[comment.id] === 'open' ?

                                    <td scope="row">
                                        <textarea type="text" className={'comment-section'} value={comment.body} onChange={(e) => this.bodyInputChange(commentsList, commIdx, e.target.value)} />
                                    </td>
                                    :
                                    <td scope="row">{comment.body}</td>}

                                <td scope="row">
                                    {
                                        comment.saved ? <button onClick={() => this.removeFromLibrery(comment.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                        </svg></button> :

                                            <button onClick={() => this.addToLibrery(comment)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-align-middle" viewBox="0 0 16 16">
                                                <path d="M6 13a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v10zM1 8a.5.5 0 0 0 .5.5H6v-1H1.5A.5.5 0 0 0 1 8zm14 0a.5.5 0 0 1-.5.5H10v-1h4.5a.5.5 0 0 1 .5.5z" />
                                            </svg></button>
                                    }
                                </td>
                                <td scope="row">
                                    {this.state.editorsDictionary && this.state.editorsDictionary[comment.id] && this.state.editorsDictionary[comment.id] === 'open' ?
                                        <button onClick={() => this.saveComment(commentsList, commIdx)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                                        </svg></button>
                                        :
                                        <button onClick={() => this.startComment(comment.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                            <path d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                                        </svg></button>
                                    }
                                </td>
                            </tr>
                        ) : ''}
                    </tbody>
                </table>
            </div>
        )
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
export default connect(mapStateToProps, mapDispatchToProps)(Post);