import React, { useState, useEffect } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { clearErrors, fetchArticle } from '../actions/newsActions';
import {connect} from 'react-redux'
import store from '../store';
import Loading from './Loading';


function NewsDetail(props) {
   const [state, setState] = useState();
   const navigate = useNavigate();
   const location = useLocation()

   // console.log(props.article)

   if(location.state&&!state) {
      setState({article:location.state.article})
   }else if(!state){
      store.dispatch(fetchArticle(location.pathname.substring(1)))
   }

   useEffect(() => {
      if(props.article&&!state){
         if(props.article==='Error'){
            navigate("/404");
            store.dispatch(clearErrors())
         } else{
            setState({article:props.article})
         }
      }
   }, [props.article, navigate, state])

if(state){
    return (
       state.article?
        <article className="postcard dark red detail">
        <img className="postcard__img" src={state.article.urlToImage} alt=''/>	
        <div className="postcard__text">
           <h1 className="postcard__title red">{state.article.title}</h1>
           <div className="postcard__subtitle small">
              <i className="fa fa-calendar mr-2"></i>{state.article.publishedAt.slice(0,10)}
              {state.article.author ? 
              <span>
                  <i className="fa fa-user mr-2"></i>
                  {state.article.author}
                  </span> :'' }
           </div>
           <div className="postcard__bar"></div>
           <div className="postcard__preview-txt">{state.article.content}</div>
           <ul className="postcard__tagbox">
              <Link className='a' to='/'>
              <li className="tag__item play red">
                 <i className="fa fa-home mr-2"></i>
                 Back to Home Page
              </li>
              </Link>
           </ul>
        </div>
     </article>  :
     <Loading />
    )
   } else{
      return(<Loading />)
   }
}

const mapStateToProps=(state)=>(
   {
   article: state.article
})


export default connect(mapStateToProps)(NewsDetail)

