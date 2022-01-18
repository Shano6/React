import firebase from '../config/fbConfig'

const db = firebase.firestore()


export const fetchCurrentUsersFriendRequests=(userid)=>{
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

export const addFriend=(currentUserId, addedUserId, friendState)=>{
    return function(dispatch){
        db.collection("users").doc(addedUserId)
        .get().then(function(doc) {
            let friendrequests=doc.data().friendrequests
            let addedUserFriendList=doc.data().friendlist
            if (friendState==='Add Friend') {
                db.collection("users").doc(addedUserId).update( 
                    {friendrequests: 
                        [...friendrequests,currentUserId]
                }).then(dispatch({
                    type: 'UPDATE_FRIEND_STATUS',
                    userid: addedUserId,
                    friendStatus:'Friend Request Sent'
                }))
            }else if (friendState==='Friend Request Sent'){
                db.collection("users").doc(addedUserId).update( 
                    {friendrequests: 
                        [...friendrequests]
                        .filter((e)=>e!==currentUserId)
                    }).then(dispatch({
                        type: 'UPDATE_FRIEND_STATUS',
                        userid: addedUserId,
                        friendStatus:'Add Friend'
                    }))
            } else{
                db.collection("users").doc(addedUserId).update( 
                    {friendlist: 
                        [...addedUserFriendList]
                        .filter((e)=>e!==currentUserId)
                    })
                db.collection("users").doc(currentUserId)
                .get().then(function(e) {
                    let currentUserfriendList=e.data().friendlist
                    db.collection("users").doc(currentUserId).update( 
                        {friendlist: 
                            [...currentUserfriendList]
                            .filter((e)=>e!==addedUserId)
                        }).then(dispatch({
                            type: 'UPDATE_FRIEND_STATUS',
                            userid: addedUserId,
                            friendStatus:'Add Friend'
                        }))
                })
            }
        }
    )}
}

export const confirmFriendRequest=(currentUserId, addedUserId)=>{
    return function(dispatch){
        db.collection("users").doc(addedUserId)
        .get().then(function(doc) {
            let friendrequests=doc.data().friendrequests
            let friendlist=doc.data().friendlist
                db.collection("users").doc(addedUserId).update( 
                    {friendlist:[...friendlist, currentUserId]
                }).then(
                    db.collection('users').doc(currentUserId)
                    .get().then(function(doc){
                        let currentUserfriendList=doc.data().friendlist
                        db.collection('users').doc(currentUserId).update(
                            {friendrequests: 
                                [...friendrequests]
                                .filter((e)=>e!==addedUserId),
                                friendlist:[...currentUserfriendList,addedUserId]}
                    ).then(
                        dispatch({
                            type: 'CONFIRM_FRIEND_REQUEST',
                            addedUserId}),
                        dispatch({
                            type: 'UPDATE_FRIEND_STATUS',
                            userid: addedUserId,
                            friendStatus:'Remove Friend'
                        })
                    )
                })
            )     
        }
    )
}
}