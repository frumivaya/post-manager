import React, { Component } from 'react';
import { connect } from 'react-redux';



import { addPostToMyLibrery, fetchPosts, removePostFromMyLibrery } from '../services/post.service';

class Posts extends Component {

    componentWillMount() {
        this.props.getPosts(this.pageNumber);
    }

    get pageNumber() {
        const isPageNumberExist = typeof this.props.match.params.pageNumber !== 'undefined';
        return (isPageNumberExist ? this.props.match.params.pageNumber : 1);
    }

    render() {
        const pagesButtonsRender = this.getPagesButtonsRender();
        return (
            <div className="posts-page">
                <table className="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">postId</th>
                            <th scope="col">userId</th>
                            <th scope="col">title</th>
                            <th scope="col">body</th>
                            <th scope="col">librery</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.posts ? this.props.posts.data.map((post, postIdx) =>
                            <tr>
                                <td scope="row" onClick={() => this.handlerClickUser(post.id)}>{postIdx}</td>
                                <td scope="row" onClick={() => this.handlerClickUser(post.id)}>{post.id}</td>
                                <td scope="row" onClick={() => this.handlerClickUser(post.id)}>{post.userId}</td>
                                <td scope="row" onClick={() => this.handlerClickUser(post.id)}>{post.title}</td>
                                <td scope="row" onClick={() => this.handlerClickUser(post.id)}>{post.body}</td>
                                <td>
                                    {
                                        post.saved ?
                                            <button onClick={() => this.removeFromList(post.id)}>remove</button> :
                                            <button onClick={() => this.addToList(post)}>add</button>
                                    }
                                </td>
                            </tr>
                        ) : ''}
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {pagesButtonsRender}
                    </ul>
                </nav>

            </div>
        )
    }


    getPagesButtonsRender() {
        let pagesButtonsRender = [];
        for (let i = 1; i <= this.props.posts.total_pages; i++) {
            pagesButtonsRender.push(<li key={i} className="page-item">
                <button className="page-link" onClick={() => this.handlerClickPage(i)}>{i}</button>
            </li>);
        }
        return pagesButtonsRender;
    }

    handlerClickPage(pageNumber) {
        if (this.props.posts.page !== pageNumber) {
            this.props.history.push(`/posts/${pageNumber}`);
            this.props.getPosts(pageNumber);
        }
    }

    handlerClickUser(postId) {
        this.props.history.push(`/post/${postId}`);
    }

    async addToList(post) {
        await addPostToMyLibrery(post)
        await this.refrechLibrery();
    }


    async removeFromList(postId) {
        await removePostFromMyLibrery(postId);
        await this.refrechLibrery();
    }

    async refrechLibrery() {
        await this.props.getPosts(this.pageNumber);
    }
}

const mapStateToProps = state => {
    return {
        posts: state.postsReducer.posts
    }
}

const mapDispatchToProps = disaptch => {
    return {
        getPosts(pageNumber) {
            disaptch(fetchPosts(pageNumber));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);