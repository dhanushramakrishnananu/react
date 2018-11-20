import {applyMiddleware, createStore, compose} from 'redux';
import rootReducer from './reducers/index.es6';
import thunk from 'redux-thunk';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
));
// export default createStore(
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//     rootReducer,
//     applyMiddleware(thunk)
// );
/* eslint-enable */


// import {applyMiddleware, createStore} from 'redux';
// import rootReducer from './reducers/index.es6';
// import thunk from 'redux-thunk';
//
// export default createStore(
//     rootReducer,
//     applyMiddleware(thunk)
// );