import React from 'react'
import User from './User'
import {connect} from 'react-redux'
import store from '../Store'
import {Redirect} from 'react-router-dom'
import firebase from '../config/fbConfig'


function People(props) {
    let filteredUsers = props.userNameFilter === null ? props.allusers : props.allusers.filter((e)=>e.displayName.toUpperCase().includes(props.userNameFilter.toUpperCase()))

    if(window.location.pathname.includes('/Friends')){
        let currentUser= props.allusers.filter((e)=>e.id===props.auth.uid)
        if (currentUser) {
            filteredUsers = props.allusers.filter(
                function(e) {
                  return currentUser[0].friendlist.includes(e.id);
                },
            );
        }
    }

    const db = firebase.firestore()

    db.collection("cities").doc("SF")
        .onSnapshot(function(doc) {
            var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            console.log(source, " data: ", doc.data());
    });

    if(window.location.pathname.includes('/Request')){
        filteredUsers = props.allusers.filter((e)=>props.friendRequests.includes(e.id))
    }

    if(window.location.pathname.includes('/People')){
        filteredUsers = props.allusers
    }

    if(window.location.pathname === '/Requests' && store.getState().friendRequests.length<1) return <Redirect to='/'/>
    return (
        <div className='people'>
            {filteredUsers.map((user)=><User key={user.id} user={user}/>)}
        </div>
    )
}

const mapStateToProps=(state)=>({
    allusers: state.allusers,
    friendRequests: state.friendRequests,
    auth: state.firebase.auth
})

export default connect(mapStateToProps)(People);
