import React from 'react';
import userPic from '../img/user.jpg';
import {Link} from 'react-router-dom';
import {addFriend, confirmFriendRequest} from '../Actions/FriendActions'
import {connect, useDispatch} from 'react-redux';

function User(props) {
    const dispatch=useDispatch()
    let friendStatusArray= props.friendStatus.filter((e)=>e.id===props.user.id)[0] 
    let friendStatus=friendStatusArray? friendStatusArray.status:friendStatusArray

    
    if (!friendStatus && props.user) {
        if (props.user.friendlist.includes(props.auth.uid)){
            friendStatus='Remove Friend'
        }else if(props.user.friendrequests.includes(props.auth.uid)){
            friendStatus='Friend Request Sent'
        }else if(props.friendrequests.includes(props.user.id)){
            friendStatus='Confirm Friend Request'
        }else{
            friendStatus='Add Friend'
        }
    }

    let addFriendClick = ()=>{
        if (friendStatus==='Add Friend'){
            dispatch(addFriend(props.auth.uid, props.user.id, friendStatus))
        }else if(friendStatus==='Friend Request Sent'){
            dispatch(addFriend(props.auth.uid, props.user.id, friendStatus))
        }else if (friendStatus==='Confirm Friend Request'){
            dispatch(confirmFriendRequest(props.auth.uid, props.user.id))
        } else{
            dispatch(addFriend(props.auth.uid, props.user.id, friendStatus))
        }
    }

    return (
        <div className='status'>  
            <div className="author">
                <Link to={`/profile/${props.user.id}`}>
                    <img className="authorimg pplImg" src={userPic} alt="authorimg"/>
                </Link>
                    <div className="authornamedate pplName">
                        <Link to={`/profile/${props.user.id}`}>
                            <p>{props.user.displayName}</p>
                        </Link>
                    </div>
                    <span className="addFriendButtonContainerUser"  style={{display: props.auth.uid !==props.user.id ? '':'none'}}>
                        <button onClick={()=>addFriendClick()} className='addFriendButtonUser'>{friendStatus}</button>
                    </span>
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>(
    {
    allusers: state.allusers,
    loggeduser: state.firebase.auth,
    friendrequests: state.friendRequests,
    auth: state.firebase.auth,
    friendStatus: state.friendStatus
  })


export default connect(mapStateToProps)(User);
