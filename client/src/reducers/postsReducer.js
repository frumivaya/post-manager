const isLoggedLocalStorage = window.localStorage.getItem('isLogged');

const initState = {
    isLogged: (isLoggedLocalStorage !== null ? (isLoggedLocalStorage === 'true') : false),
    posts: {
        page: null,
        per_page: null,
        total: null,
        total_pages: null,
        data: [],
    },
    userActive: {
        id: null,
        first_name: null,
        last_name: null,
        avatar: null
    }
}

const postsReducer = (state = initState, action) => {

    switch (action.type) {
        case "LOGIN":
            window.localStorage.setItem('isLogged', action.payload);
            state = { ...state, isLogged: action.payload }
            break;
        case "SHOW_POSTS":
            state = { ...state, posts: action.payload }
            break;
        case "SHOW_SINGLE_POST_DETAILS":
            state = { ...state, postActive: action.payload }
            break;
        default:
            break;
    }
    return state;
}

export default postsReducer;