import React from 'react'
import People from './People'
import Posts from './Posts'

export default function Searchresults(props) {
    const filterKeyWord=props.match.params.keyword
    return (
        <div>
            <People userNameFilter={filterKeyWord}/>
            <Posts searchKeyword={filterKeyWord}/>
        </div>
    )
}
