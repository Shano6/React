import React from 'react'
import NewsCard from './NewsCard'
import {connect} from 'react-redux'
import Loading from './Loading'
import Categories from './Categories'

function NewsList(props) {
    if(props.news){
        return(
            <section className='dark'>    
                <Categories />    
            {props.news.length>0?
            props.news.map((e,i)=>
                <NewsCard key = {props.news[i].url} article={props.news[i]}/>
            ):<div className="noNews">Sorry, there are no recent news from this publisher</div>
        
        }
        </section> 
        )
    } else{
        return(<Loading />)
    }
}

const mapStateToProps=(state)=>({
    news: state.news
})


export default connect(mapStateToProps)(NewsList)
