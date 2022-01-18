let initialstate=[]

let usersReducer=(state=initialstate, action)=>{
    switch(action.type){
        case 'FETCH_USERS':
            return [...state.concat(action.users)]
        default:
            return state       
        }
    }
    
    
export default usersReducer;