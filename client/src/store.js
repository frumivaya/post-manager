import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import sitesReducer from './reducers/sitesReducer';
import postsReducer from './reducers/postsReducer';

const store = createStore(
    combineReducers({
        sitesReducer,
        postsReducer
    }),
    {},
    applyMiddleware(thunk)
)

export default store;