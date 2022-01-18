import React from 'react'
import store from '../store';
import { fetchNews } from '../actions/newsActions';

export default function Search() {
    const search = React.createRef();
    const onSearch = () =>{
        store.dispatch(fetchNews(undefined, search.current.value))
    }

    return (
        <form className='searchForm' role="search" onSubmit={(e)=>e.preventDefault()}>
            <label htmlFor="search">Search for stuff</label>
            <input ref={search} id="search" type="search" placeholder="Search..." autoFocus required autoComplete="off"/>
            <button type="button" onClick={onSearch}>Go</button>    
        </form>
    )
}
