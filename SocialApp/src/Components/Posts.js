import React from 'react';
import Status from './Status';
import {connect} from 'react-redux'
// import {connect} from 'react-redux';
// import {firestoreConnect } from 'react-redux-firebase'

function Posts(props) {
    let filteredPosts
    let filterPosts=()=>{
        if(typeof(props.profileuserid) !== 'undefined'){
            filteredPosts=props.posts.filter((e)=>e.authoruserid===props.profileuserid)
        }else if (typeof(props.searchKeyword) !== 'undefined') {
            filteredPosts= props.posts.filter((e)=>e.author.toUpperCase().includes(props.searchKeyword.toUpperCase())||
            e.postcontent.toUpperCase().includes(props.searchKeyword.toUpperCase()))
        }else{
            filteredPosts=props.posts
        } 
    }

    filterPosts()

    return (
        <div>
            {filteredPosts.map((e)=>
            <Status  key={e.id} post={e} />)}
        </div>
    )
}

const mapStateToProps=(state)=>({
    posts: state.posts
})

export default connect(mapStateToProps)(Posts)

// export default compose(
//     connect(mapStateToProps),
//     firestoreConnect([
//         {collection: 'posts'}
//     ])
// )(Posts)                           ბევრი ვეჩალიჩე, მაგრამ ვერ ავამუშავე firestore.data და firestore.ordered ცარიელი მოდის



