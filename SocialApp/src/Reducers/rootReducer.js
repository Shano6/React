import postsReducer from './postsReducer'
import usersReducer from './usersReducer'
import friendsReducer from './friendReducer'
// import authReducer from './authReducer'
import friendStatusReducer from './friendStatusReducer'
import chatReducer from './chatReducer'
import { combineReducers } from 'redux'
import { firebaseReducer} from 'react-redux-firebase'
// import { firestoreReducer } from 'redux-firestore'

const appReducer = combineReducers({
    firebase: firebaseReducer,
    friendRequests: friendsReducer,
    friendStatus: friendStatusReducer,
    chat: chatReducer,
    // auth: authReducer,
    // firestore: firestoreReducer,
    allusers: usersReducer,
    posts: postsReducer,
  })


  const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT_SUCCESS') {
      state = undefined
    }
  
    return appReducer(state, action)
  }

export default rootReducer;