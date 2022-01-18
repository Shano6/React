let initialstate=[]

let friendsReducer=(state=initialstate, action)=>{
    const reqeustIndex = state.findIndex(requestId => requestId === action.addedUserId)
    switch(action.type){
        case 'FETCH_FRIEND_REQUESTS':
            return [...state.concat(action.frequests)]
        case 'CONFIRM_FRIEND_REQUEST':
            return [...state.slice(0, reqeustIndex),
                ...state.slice(reqeustIndex+1)]
        default:
            return state       
    }
}


export default friendsReducer;


