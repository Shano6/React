let initialstate=[]


let postReducer=(state=initialstate, action)=>{
    const loggeduser= action.loggedUser
    const postIndex = state.findIndex(post => post.id === action.postid)
    let copyPost = state[postIndex]
    switch(action.type){
        case 'FETCH_POSTS':
            return [...state.concat(action.posts)]

        case 'LIKE':
            if(!state[postIndex].likedUsers.includes(loggeduser.uid)){
                copyPost.likedUsers.push(loggeduser.uid)
                return([
                    ...state.slice(0,postIndex), 
                    {...state[postIndex], likedUsers: copyPost.likedUsers}, 
                    ...state.slice(postIndex+1)])
            }else{
                let clearedList = copyPost.likedUsers.filter(id=>id !== loggeduser.uid)
                return(
                    [...state.slice(0,postIndex), 
                    {...state[postIndex], likedUsers: clearedList}, 
                    ...state.slice(postIndex+1)])
            }

        case 'ADD_COMMENT':    
            copyPost.comments.push({
                id:action.commentid,
                authoruserid: action.authoruserid,
                authorname: action.authorname,
                commenttext: action.comment
            })
            return(
                [...state.slice(0,postIndex), 
                {...state[postIndex], comments: copyPost.comments}, 
                ...state.slice(postIndex+1)] )
        
        case 'ADD_POST':
            return (
                [{
                id:action.postid,
                author: action.author,
                authoruserid: action.authoruserid,
                postdate: action.postdate,
                postcontent: action.postcontent,
                likedUsers: [],
                comments: []
                }, ...state])
        
        case 'DELETE_POST':
            return(
                [...state.slice(0, postIndex),
                ...state.slice(postIndex+1)]
                );
                
        default:
            return state       
    }
}


export default postReducer;


