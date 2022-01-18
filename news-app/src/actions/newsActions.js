const apiKey = "9563e907b9b54259b8d86eb36f897b9e"

export const fetchNews=(source, keyword)=>{
    return function(dispatch){
        let url = 'https://newsapi.org/v2/everything?'

        if(keyword){
            url+= `qInTitle=${keyword}&`
        } else {
            url+= `q=a&`
        }

        if(source){
            url+=`sources=${source}&`
        }

        url += `apiKey=${apiKey}`

        const req = new Request(url);

        fetch(req)
            .then((response) => response.json())
            .then((responseData)=>{
                dispatch({
                    type: 'FETCH_NEWS',
                    news: responseData.articles
                }) 
             })
    }
}

export const fetchCategories=()=>{
    return function(dispatch){
        const url = `https://newsapi.org/v2/top-headlines/sources?apiKey=${apiKey}`

        const req = new Request(url);

        fetch(req)
            .then((response) => response.json())
            .then((responseData)=>{
                dispatch({
                    type: 'FETCH_CATEGORIES',
                    categories: responseData.sources.slice(0,20)
                }) 
             })
    }
}

export const fetchArticle=(params)=>{
    return function(dispatch){
        let url = 'https://newsapi.org/v2/everything?'
        url+= params+`&apiKey=${apiKey}`
        const req = new Request(url);


        fetch(req)
            .then((response) => response.json())
            .then((responseData)=>{
                if(responseData.status==='error'||responseData.totalResults===0){
                
                    dispatch({
                        type: 'ARTICLE_ERROR'
                    })
                } else{
                    dispatch({
                        type: 'FETCH_ARTICLE',
                        article: responseData.articles[0]
                    }) 
                }
                
             })
    }
}

export const clearErrors=()=>{
    return function(dispatch){
        dispatch({
            type: 'CLEAR_ERROR'
        })
    }
}

