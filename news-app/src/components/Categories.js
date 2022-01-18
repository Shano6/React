import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import store from '../store';
import { fetchNews } from '../actions/newsActions';
import Search from './Search';

function Categories(props) {
    const gap = 16;

    const carousel = React.createRef();
    const content = React.createRef();
    const next = React.createRef();
    const prev = React.createRef();

    const [width,setWidth] = useState();

    const onNext = () =>{
        carousel.current.scrollBy(width + gap, 0);
        if (carousel.current.scrollWidth !== 0) {
            prev.current.style.display = "flex";
        }
        if (content.current.scrollWidth - width - gap <= carousel.current.scrollLeft + width) {
            next.current.style.display = "none";
        }
    }
    
    const onPrev = () =>{
        carousel.current.scrollBy(-(width + gap), 0);
        if (carousel.current.scrollLeft - width - gap <= 0) {
            prev.current.style.display = "none";
        }
        if (!content.current.scrollWidth - width - gap <= carousel.current.scrollLeft + width) {
            next.current.style.display = "flex";
        }
    }

    const onCategory = (e) =>{
      const categoryId= e.target.attributes.getNamedItem('category-id').value
      store.dispatch(fetchNews(categoryId))
    }

    const onAll = () =>{
      store.dispatch(fetchNews())
    }

    useEffect(()=>{
        setWidth(carousel.current.offsetWidth);
    }, [carousel])

    return (
    <div className='searchContainer'>
      {props.categories? <Search />:''}
    <div id="wrapper">
      <div id="carousel" ref={carousel}>
        <div id="content" ref={content}>
        {props.categories? <div key='all' className='item' onClick={onAll}>All</div>:''}
        {props.categories ?
        props.categories.map((e,i)=>
                <div key={e.id} category-id={e.id} className='item' onClick={onCategory}>{e.name}</div>
            ):''}
        </div>
      </div>
      <button id="prev" onClick={onPrev} ref={prev}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 20 20"
        >
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path d="M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z" />
        </svg>
      </button>
      <button id="next" onClick={onNext} ref={next}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 20 20"
        >
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z" />
        </svg>
      </button>
    </div>
    </div>
    )
}

const mapStateToProps=(state)=>({
    categories: state.categories
})


export default connect(mapStateToProps)(Categories)
