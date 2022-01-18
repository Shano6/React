let initialstate=[]

let chatReducer=(state=initialstate, action)=>{
    switch(action.type){
        case 'UPDATE_CHAT':
            let newMessages
            if (action.data!==null) {
                let ids=[]
                state.forEach((e)=>ids.push(e.messageid))
                console.log(action.data, 'data')
                newMessages = action.data.filter((e)=>!ids.includes(e.messageid))
                return [...state.concat(newMessages)]
            } else{
                return []
            }

        default:
            return state       
    }
}


export default chatReducer;


