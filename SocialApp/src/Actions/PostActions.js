import store from '../Store'
import firebase from '../config/fbConfig'

const db = firebase.firestore()

export const fetchPosts=()=>{
    return function(dispatch){
        db.collection('posts').orderBy('fulldate', 'desc').get().then((snapshot)=>{
            let data
            let posts=[]
            snapshot.docs.forEach(doc=>{
                data = doc.data()
                data.id = doc.id
                posts.push(data)
            })
            dispatch({
                type: 'FETCH_POSTS',
                posts})
        })
    }
}

export const likePost=(id, liked, loggedUser)=>{
    return function(dispatch){
        db.collection("posts").doc(id)
        .get().then(function(doc) {
            let likedUsers=doc.data().likedUsers
                db.collection("posts").doc(id).update( 
                    {likedUsers: 
                        !liked?
                        [...likedUsers,loggedUser.uid]:
                        [...likedUsers]
                        .filter((e)=>e!==loggedUser.uid)
                    }).then(()=>{
                dispatch({
                    type: 'LIKE',
                    postid: id,
                    loggedUser: loggedUser})
            })
        }); 
    }
}

export const addComment=(comment)=>{
    const currentPostIndex = store.getState().posts.findIndex(post => post.id === comment.postId)
    const commentSection = store.getState().posts[currentPostIndex].comments
    
    const newCommentId=commentSection.length === 0 ? 1 : commentSection[commentSection.length-1].id+1
    return function(dispatch){
        db.collection("posts").doc(comment.postId)
        .get().then(function(doc) {
            let comments=doc.data().comments
                db.collection("posts").doc(comment.postId).update( 
                    {comments: 
                        [...comments,
                            {
                            id: newCommentId,
                            authoruserid: comment.authoruserid, 
                            authorname: comment.author, 
                            commenttext: comment.commenttext}]
                        .filter((e)=>e!==comment.authoruserid)
                    }).then(()=>{ 
                dispatch({
                    type: 'ADD_COMMENT',
                    postid: comment.postId,
                    commentid:newCommentId,
                    comment:comment.commenttext,
                    authorname: comment.author,
                    authoruserid: comment.authoruserid})
            })
        }); 
    }
}

export const addPost=(post)=>{
    return(dispatch, getState ,{getFirebase})=>{
        const firestore = getFirebase().firestore();
        firestore
            .collection('posts')
            .add({
                ...post
        })
            .then((docRef)=>{
                console.log()
                dispatch({
                    type: 'ADD_POST',
                    postid: docRef.id,
                    postdate: post.postdate,
                    postcontent: post.postcontent,
                    author: post.author,
                    authoruserid: post.authoruserid
            })
        }).catch(err =>{
            console.log('error while posting', err)
    })  
}}

export const delPost=(postid)=>{
    return function(dispatch){
        db.collection("posts").doc(postid).delete()
        .then(()=>{
            dispatch({
                type: 'DELETE_POST',
                postid})
        })
    }
}
