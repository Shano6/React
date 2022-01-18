import firebase from '../config/fbConfig'

const db = firebase.firestore()



export const updateChat=(chat)=>{
    return function(dispatch){
        dispatch({
            type: 'UPDATE_CHAT',
            data: chat
        })  
    }
}

export const sendMessage=(userid, message, docid)=>{
    return function(dispatch){
        let docRef=db.collection("chat").doc(docid)
        docRef.get().then(function(doc) {
            if (doc.exists) {
                let chatMessages=doc.data().messages
                docRef.set({
                    messages:[...chatMessages, {
                        messageid:'_' + Math.random().toString(36).substr(2, 9),
                        id: userid,
                        message:message
                    }]
                })
            } else {
                docRef.set({
                    messages:[{
                        messageid:'_' + Math.random().toString(36).substr(2, 9),
                        id: userid,
                        message:message
                    }]
                })
            }
        })
    }
}
