let initialstate=[]

let friendStatusReducer=(state=initialstate, action)=>{
    switch(action.type){
        case 'UPDATE_FRIEND_STATUS':
            let userIndex=state.findIndex((e)=>e.id===action.userid)
            let copyState=[...state.slice(0,userIndex), ...state.slice(userIndex+1)]
            return [...copyState.concat({id: action.userid, status:action.friendStatus})]
        default:
            return state       
    }
}

export default friendStatusReducer;


