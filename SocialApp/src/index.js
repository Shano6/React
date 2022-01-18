import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {ReactReduxFirebaseProvider} from 'react-redux-firebase'
import store, {rrfProps} from './Store'
import {fetchPosts} from './Actions/PostActions'
import firebase from './config/fbConfig'
import {fetchUsers} from './Actions/AuthActions'
import {fetchCurrentUsersFriendRequests} from './Actions/FriendActions'
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    store.dispatch(fetchPosts())
    store.dispatch(fetchUsers())
    store.dispatch(fetchCurrentUsersFriendRequests())
  }
});

ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <App /> 
        </ReactReduxFirebaseProvider>
      </Provider>                
      </React.StrictMode>,
  
    document.getElementById('root')
  );



export default store


reportWebVitals();
