let initialstate={}

let authReducer=(state=initialstate, action)=>{
    switch(action.type){
        case 'LOGIN_ERROR':
            alert('Login Error')
            return state

        case 'LOGIN_SUCCESS':
            console.log('login')
            return state
        
        case 'LOGOUT_ERROR':
            alert('Logout Error' ,action.error)
            return state
    
        case 'LOGOUT_SUCCESS':
            console.log('Logged Out')
            state=undefined
            console.log(state)
            return state

        case 'SIGN_UP_ERROR':
            alert('Sign Up Error')
            return state
        
        case 'SIGN_UP_SUCCESS':
            console.log('Registerd')
            return state
                
        default:
            console.log(state)
            return state       
    }
}

export default authReducer;