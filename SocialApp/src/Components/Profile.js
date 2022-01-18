import React from 'react';
import coverImage from '../img/defaultCover.png';
import userPic from '../img/user.jpg';
import Posts from './Posts';
import {addFriend, confirmFriendRequest} from '../Actions/FriendActions'
import {connect, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';

function Profile(props) {
    const dispatch=useDispatch()
    let profileuser=props.allusers.filter((e)=>e.id===props.match.params.id)[0]
    let render= typeof profileuser!=='undefined'
    let friendStatusArray= props.friendStatus.filter((e)=>e.id===profileuser.id)[0] 
    let friendStatus=friendStatusArray? friendStatusArray.status:friendStatusArray

    if (!friendStatus && profileuser) {
        if (profileuser.friendlist.includes(props.user.uid)){
            friendStatus='Remove Friend'
        }else if(profileuser.friendrequests.includes(props.user.uid)){
            friendStatus='Friend Request Sent'
        }else if(props.friendrequests.includes(props.match.params.id)){
            friendStatus='Confirm Friend Request'
        }else{
            friendStatus='Add Friend'
        }
    }

    let addFriendClick = ()=>{
        if (friendStatus==='Add Friend'){
            dispatch(addFriend(props.user.uid, props.match.params.id, friendStatus))
        }else if(friendStatus==='Friend Request Sent'){
            dispatch(addFriend(props.user.uid, props.match.params.id, friendStatus))
        }else if (friendStatus==='Confirm Friend Request'){
            dispatch(confirmFriendRequest(props.user.uid, props.match.params.id))
        } else{
            dispatch(addFriend(props.user.uid, props.match.params.id, friendStatus))
        }
    }

    console.log(friendStatus)
    
    return (
        render?
        <div className="profileDiv">
            <p className="coverImageContainer"><img src={coverImage} alt=""/></p>
            <div className="userImgContainer"><img src={userPic} alt=""/></div>
            <div className="userInfo">
                <p>{props.user.uid===props.match.params.id? profileuser.displayName:profileuser.displayName}</p>
            </div>
            {props.match.params.id !==props.user.uid ? 
            <div className='addFriendButtonContainer'>
                <button onClick={()=>addFriendClick()} className='addFriendButton'>
                    {friendStatus}
                </button>
            </div>:
            <div className='addFriendButtonContainer'>
            <Link to="/Friends">
                <button className='addFriendButton'>
                    Friend List
                </button>
            </Link>
            </div>} 
            
            <div className="userPosts">
            <Posts posts={props.posts} user={props.user} profileuserid={props.match.params.id}/>
            </div>
        </div>
        :''
    )
}

const mapStateToProps=(state)=>({
    posts: state.posts,
    allusers: state.allusers,
    user: state.firebase.auth,
    friendrequests: state.friendRequests,
    friendStatus: state.friendStatus
  })


export default connect(mapStateToProps)(Profile);