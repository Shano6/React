import {createStore, applyMiddleware } from 'redux';
import rootReducer from './Reducers/rootReducer'
import thunk from 'redux-thunk'
import {getFirebase} from 'react-redux-firebase'
import firebase from './config/fbConfig'
import {createFirestoreInstance} from 'redux-firestore'

const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument({getFirebase})));

export const rrfProps={
    firebase,
    config:{},
    dispatch: store.dispatch,
    createFirestoreInstance
}

export default store