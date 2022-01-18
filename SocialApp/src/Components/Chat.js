import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useDispatch} from 'react-redux';
import userPic from '../img/user.jpg';
import {sendMessage, updateChat} from '../Actions/ChatActions'
import firebase from '../config/fbConfig'


function Chat(props) {
    const dispatch=useDispatch()
    let currentUser= props.allusers.filter((e)=>e.id===props.auth.uid)
    let filteredUsers
    console.log(props.chat)

    if (currentUser) {
        filteredUsers = props.allusers.filter(
            function(e) {
              return currentUser[0].friendlist.includes(e.id);
            },
        );
    }

    const db = firebase.firestore()
    const [chatFriend, setChatFriend]=useState(filteredUsers.length>0 ? filteredUsers[0].id:" ")
    const [message, setMessage]=useState('')

    let docid = `${props.auth.uid} ${chatFriend}`

    if(chatFriend===' ' && filteredUsers.length>0){
        setChatFriend(filteredUsers[0].id)
    }
    
    let changeChatPerson=(userid)=>{
        setChatFriend(userid)
        dispatch(updateChat(null))
    }

    let onSendClick=()=>{
        if(message!==''){
            dispatch(sendMessage(props.auth.uid, message, docid));
            setMessage('')
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSendClick()
        }
    }
    
    if(chatFriend!==' ' && props.auth.uid){
        let docRef=db.collection("chat").doc(`${props.auth.uid} ${chatFriend}`)
        let count = 0
        let chatExists=(docRef)=>{
            docRef.get().then(function(doc) {
                if (!doc.exists && count < 1) {
                    docid=`${chatFriend} ${props.auth.uid}`
                    docRef= db.collection("chat").doc(`${chatFriend} ${props.auth.uid}`)
                    count =+1
                    chatExists(docRef)
                }else{
                    docRef.onSnapshot(function(doc) {
                        if (doc.data()) {
                            if (doc.data().messages.length!==props.chat.length) {
                                console.log(doc.data().messages.length, props.chat.length)
                                    dispatch(updateChat(doc.data().messages))
                            }
                        }
                    })
                }
            })
        }
        chatExists(docRef)
    }


 
    if (filteredUsers.length>0) {
        return (
            <div className="chatApp">
                <div id="mySidenav" className="sidenav">
                {filteredUsers.map((user)=>
                <div key={user.id}>
                    <hr/>
                    <p onClick={()=>changeChatPerson(user.id)} className={`chatPerson ${chatFriend===user.id? 'selectedPerson':''}`}>
                    <img className="chatImg" src={userPic} alt="img"/>
                       <span className="chatName">{user.displayName}</span> 
                    </p>
                    <hr/>
                </div>)} 
                
                </div>
                <div className='messagesContainer'>
                <ul>
                    {props.chat.map((e)=>
                        <li key={e.messageid} className={e.id===props.auth.uid?'myMessageContainer':'friendsMessageContainer'}>
                            <div className={e.id===props.auth.uid?'myMessage message':'friendsMessage message'}>{e.message}</div>
                        </li>
                    )}
                </ul>
                    
                </div>
                <div className="messageBox">
                    <input
                     onChange={(event)=>setMessage(event.target.value)}
                     value={message} type="text" placeholder='type your message here' onKeyDown={handleKeyDown}/>
                    <button onClick={onSendClick} 
                    className="sendMessage">Send Message</button>
                </div>
            </div>
        )  
    }else{
        return(
            <div className='noChat'>You have no active friends to chat with</div>
        )
    }
}

const mapStateToProps=(state)=>({
    allusers: state.allusers,
    auth: state.firebase.auth,
    chat: state.chat
})

export default connect(mapStateToProps)(Chat)


