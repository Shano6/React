import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {signOut} from '../Actions/AuthActions'
import store from '../Store'
import {Redirect} from 'react-router-dom'

function Header(props) {
    const [searchState,setSearchState]= useState({
        keyword:'',
    })

    const [requestState, setRequestState] = useState('')

    const handleChange=(e)=>{
        setSearchState({
            keyword:e.target.value
        })
    }

    if (props.friendRequests.length>0 && requestState==='') {
        setRequestState(`Friend Requests(${props.friendRequests.length})`)
    }
    
    store.subscribe(function(){
        if (store.getState().friendRequests.length>0) {
            setRequestState(`Friend Requests(${store.getState().friendRequests.length})`)
        } else{
            setRequestState('')
        }
    })

    if(props.auth.isLoaded && !props.auth.uid) return <Redirect to='/Login'/>
    if(window.location.pathname !== '/Login' && window.location.pathname !== '/Register'){
    return (
        <nav>
            <img src="" alt=""/>
            <div className="search">
                <input onChange={(e)=>handleChange(e)} className="searchTxt" name="search" type="text" placeholder="Search..."/>
                <Link to={`/Search/${searchState.keyword}`}>
                    <input className="searchBtn" type="button" id="searchButton" />
                </Link>
            </div>
            <ul>
                <Link to="/Requests">
                    <li className='navLinks' id='friendRequests'>{requestState ===''? '':requestState}</li>
                </Link>
                <Link to='/'>
                    <li className='navLinks'>Home</li>
                </Link>
                <Link to='/People'>
                    <li className='navLinks'>People</li>
                </Link>
                <Link to='/Chat'>
                    <li className='navLinks'>Chat</li>
                </Link>
                <Link to={`/profile/${props.auth.uid}`}>
                    <li className='navLinks'>Profile</li>
                </Link>
                <Link to='/'>
                    <li onClick={props.signOut} >
                        <p className='navLinks'>Log Out</p>
                    </li>
                </Link>      
 
            </ul>
        </nav>
    )
}else{
    return null}

}

const mapStateToProps=(state)=>({
    auth: state.firebase.auth,
    friendRequests: state.friendRequests
  })

const mapDispatchToProps=(dispatch)=>({
    signOut: ()=>{dispatch(signOut())}
})


export default connect(mapStateToProps,mapDispatchToProps)(Header);