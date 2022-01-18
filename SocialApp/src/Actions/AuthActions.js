import firebase from '../config/fbConfig'

const db = firebase.firestore()

export const fetchUsers=()=>{
    return function(dispatch){
        db.collection('users').get().then((snapshot)=>{
            let data
            let users=[]
            snapshot.docs.forEach(doc=>{
                data = doc.data()
                data.id = doc.id
                users.push(data)
            })
            dispatch({
                type: 'FETCH_USERS',
                users})
        })
    }
}

export const signIn=(credentials)=>{
    return(dispatch)=>{
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(()=>{
            dispatch({ type: 'LOGIN_SUCCESS'})
        }).catch((err)=>{
            dispatch({ type: 'LOGIN_ERROR', error: err})
    })
}}

export const signOut=()=>{
    return(dispatch)=>{
        firebase.auth().signOut()
        .then(()=>{
            dispatch({ type: 'LOGOUT_SUCCESS'})
        }).catch((err)=>{
            dispatch({ type: 'LOGOUT_ERROR', error: err})
    })
}}

export const signUp=(credentials)=>{
    return(dispatch)=>{
        firebase.auth().createUserWithEmailAndPassword(
            credentials.email,
            credentials.password,
        ).then(()=>{
            var user = firebase.auth().currentUser
            user.updateProfile({
                displayName: credentials.username,
          })
        db.collection("users").doc(user.uid).set({
            id: user.uid,
            displayName: credentials.username,
            friendlist:[],
            friendrequests:[]
        })
    })
}}

export default signIn