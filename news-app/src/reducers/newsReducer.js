let initialstate=[]

let newsReducer=(state=initialstate, action)=>{
    
    switch(action.type){
        case 'FETCH_NEWS':
            return {...state, news: action.news}
        case 'FETCH_CATEGORIES':
            return {...state, categories: action.categories}
        case 'FETCH_ARTICLE':
            return {...state, article: action.article}
        case 'ARTICLE_ERROR':
            return {...state, article: 'Error'}
        case 'CLEAR_ERROR':
            console.log(state)
            return {...state, article: undefined}
        default:
            return state       
    }
}

export default newsReducer;