import firebase from '../config/fbConfig'

const db = firebase.firestore()

export const fetchFriendStatus=(userid)=>{
    return function(dispatch){
        var userid
        let getRequests=()=>{
            firebase.auth().onAuthStateChanged((user)=> {
                  userid = user.uid
                  db.collection('users').doc(userid).get().then((snapshot)=>{
                    let frequests
                    if(typeof snapshot.data() === 'undefined'){
                        getRequests()
                    }else{
                        frequests=snapshot.data().friendrequests
                    }
                    dispatch({
                        type: 'FETCH_FRIEND_REQUESTS',
                        frequests});
                    frequests.forEach(element => {
                        dispatch({
                            type: 'UPDATE_FRIEND_STATUS',
                            userid:element,
                            friendStatus: "Confirm Friend Request"
                        }) 
                    });
                })
            });
        }
        getRequests()
    }
}

export const upDateFriendStatus=(userid, friendStatus)=>{
    return function(dispatch){
        dispatch({
            type: 'UPDATE_FRIEND_STATUS',
            userid,
            friendStatus
        })
    }
}
