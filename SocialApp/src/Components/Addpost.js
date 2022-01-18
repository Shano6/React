import React from 'react';
import {useDispatch} from 'react-redux';
import {getCurrentDate} from '../Helpers/getDate'
import {getUserDisplayName} from '../Helpers/getUserDisplayName'
import {connect} from 'react-redux';
import {addPost} from '../Actions/PostActions';

function Addpost(props) {
    const dispatch=useDispatch()
    let post={postcontent:''}

    let setPostAttributes=()=>{
        post.postdate=getCurrentDate();
        post.fulldate= new Date();
        post.author=getUserDisplayName();
        post.authoruserid=props.user.auth.uid;
        post.likedUsers= [];
        post.comments= [];
    }
    
    return (
        <div className="addpost">
            <div className="postheader">Status</div>
            <div className="postcontent">
                <form>
                    <input onChange={(event)=>post.postcontent=event.target.value} className="textarea" type="textarea" placeholder="What's on your mind ?"/>
                    <input onClick={()=>{setPostAttributes();  
                        if(post.postcontent!==''){
                            dispatch(addPost(post))
                        }}} 
                        className="postbtn" type="reset" value="Post" />
                </form>
            </div>
        </div>
    )
}


const mapStateToProps=(state)=>(
    {
    user: state.firebase
  })

export default connect(mapStateToProps)(Addpost);
