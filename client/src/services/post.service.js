import axios from 'axios';

const getDataByStartAndEnd = (arr, start, end) => {
    return arr.slice(start, end)
}

export async function get3rdPartyPosts() {
    return fetch(`https://jsonplaceholder.typicode.com/posts`).then((response) => {
        return response.json();
    })
}


export async function get3rdPartyComments() {
    return fetch(`https://jsonplaceholder.typicode.com/comments`).then((response) => {
        return response.json();
    })
}

export const fetchPosts = (pageNumber) => {
    return async (dispatch) => {
        //  first we take data from thrid party
        get3rdPartyPosts().then((response) => {
            // the nwe take saved from server
            return getAllPostFromMyLibrery()
                .then(async (savedPostRes) => {
                    const savedPost = savedPostRes.data.allPosts;
                    const thirdPartyPosts = response;
                    // now we run on what wetake from thrid party checking agains what we saved and if its exist in our nmongo db we marke saved as true
                    for (let i = 0; i < thirdPartyPosts.length; i++) {
                        const existed = savedPost.filter(x => x.postId === thirdPartyPosts[i].id).length;
                        if (existed > 0) {
                            thirdPartyPosts[i].saved = true;
                        }
                    }
                    return thirdPartyPosts;
                })
        }).then((data) => {
            return dispatch({
                type: "SHOW_POSTS",
                payload: {
                    data: getDataByStartAndEnd(data, ((data.length / 10) * pageNumber) - 10, (data.length / 10) * (pageNumber)),
                    page: pageNumber,
                    per_page: 10,
                    total: data.length,
                    total_pages: data.length / 10
                }
            })
        });
    }
}

export const getSinglePostAction = (thirdPartyPostId) => {
    const postIdAsNumber = parseInt(thirdPartyPostId, 10)
    return async (dispatch) => {
        // getting third party comments
        const thirdPartyComments = await get3rdPartyComments()
        const thirdPartyPostComments = thirdPartyComments.filter(x => x.postId === postIdAsNumber);
        // getting our saved commnets
        const savedComments = await getSavedCommentForAPost(thirdPartyPostId);

        if (savedComments && savedComments.length > 0) {


            // check if third is in our comment/ if we saved him
            for (let i = 0; i < thirdPartyPostComments.length; i++) {
                const existed = savedComments.filter(x => x.commentId === thirdPartyPostComments[i].id)[0];
                if (existed) {
                    thirdPartyPostComments[i].saved = true;
                    thirdPartyPostComments[i].body = existed.body;
                }
            }

        }
        // thirdPartyPostComments;

        const postsResponse = await get3rdPartyPosts();
        return dispatch({
            type: "SHOW_SINGLE_POST_DETAILS",
            payload: {
                post: postsResponse.filter(x => x.id === postIdAsNumber)[0],
                comments: thirdPartyPostComments.filter(x => x.postId === postIdAsNumber)
            }
        })

    }
}


export async function addPostToMyLibrery(post) {
    try {
        await axios.post(`http://localhost:3000/new_post`, post);
    } catch (e) {
        console.error(e)
    }
}

export async function removePostFromMyLibrery(postId) {
    try {
        await axios.delete(`http://localhost:3000/delete_post/${postId}`);
    } catch (e) {
        console.error(e)
    }
}

export function getAllPostFromMyLibrery() {
    return axios.get(`http://localhost:3000/get_all_saved_posts`)
}

export async function getSavedCommentForAPost(postId) {
    try {
        const commentPostRes = await axios.get(`http://localhost:3000/gat_all_comments_post/${postId}`)
        return commentPostRes.data;
    } catch (e) {
        console.error(e);
    }

}

export async function addCommentToMyLibrery(comment) {
    try {
    await axios.post(`http://localhost:3000/new_comment`, comment);
    }catch(e){
        console.error(e)
    };
}

export async function removeCommentFromMyLibrery(commentId) {
    try {
        await axios.delete(`http://localhost:3000/delete_comment${commentId}`);
    } catch (e) {
        console.error(e)
    }
}

export async function getAllCommentOfAPost(postId) {
    return axios.get(`http://localhost:3000/gat_all_comments${postId}`)
}

export async function updateComment(commentId) {
    try {
        await axios.put(`http://localhost:3000/update_comment${commentId}`);
    } catch (e) {
        console.error(e)
    }
}

