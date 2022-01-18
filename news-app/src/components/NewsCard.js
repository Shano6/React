import React from 'react'
import {Link} from "react-router-dom";


export default function NewsCard(props) {
  
   const articleLink = { 
      pathname: `/qInTitle=${props.article.title}
      ${props.article.source.id?
         `&sources=${props.article.source.id}`:''}`, 
    };
    
    return (
    <article className="postcard dark red">
        <Link className="postcard__img_link" to={articleLink} state={{ article: props.article }}>
        <img className="postcard__img" src={
           props.article.urlToImage?
            props.article.urlToImage:
            'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg'} alt="" />	
        </Link>
        <div className="postcard__text">
        <Link className='a' to={articleLink} state={{ article: props.article }}>
           <h1 className="postcard__title red">{props.article.title}</h1>
         </Link> 
           <div className="postcard__subtitle small">
              <i className="fa fa-calendar mr-2"></i>{props.article.publishedAt.slice(0,10)}
              {props.article.author ? 
                  <span>
                     <i className="fa fa-user mr-2"></i>
                     {props.article.author}
                  </span> :'' 
               }
               {props.article.source ? 
                  <span>
                     <i className="fa fa-at mr-2"></i>
                     {props.article.source.name}
                  </span> :'' 
               }    
           </div>
           <div className="postcard__bar"></div>
           <div className="postcard__preview-txt">{props.article.description}</div>
           <ul className="postcard__tagbox">
           <Link className='a' to={articleLink} state={{ article: props.article }}>
              <li className="tag__item play red">
                 <i className="fa fa-angle-double-right mr-2"></i>Read More
              </li>
            </Link>
           </ul>
        </div>
     </article>  
    )
}



