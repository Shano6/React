import React, {useState} from 'react';
import userPic from '../img/user.jpg';
import {connect, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {likePost, addComment, delPost} from '../Actions/PostActions';
import {getUserDisplayName} from '../Helpers/getUserDisplayName'

function Status(props) {    
    let [postState, setPostState]=useState({
        liked: props.post.likedUsers.includes(props.user.uid),
        commenttext:'',
        enableDelete: props.user.uid===props.post.authoruserid ? true:false,
    })

    let comment={}

    let setCommentAttributes=()=>{
        comment.postId=props.post.id
        comment.author=getUserDisplayName();
        comment.authoruserid=props.user.uid;
        comment.commenttext=postState.commenttext
    }


    const dispatch=useDispatch()
    
    return (
        <div className="status">
            <div className="author">
                <Link to={`/profile/${props.post.authoruserid}`}>
                    <img className="authorimg" src={userPic} alt="authorimg"/>
                </Link>
                    <div className="authornamedate">
                        <Link to={`/profile/${props.post.authoruserid}`}>
                            <p>{props.post.author}</p>
                        </Link>
                        <p className="greytext" >{props.post.postdate}</p>
                    </div>
                    <span style={{display: postState.enableDelete? '':'none' }}>
                        <button className="delButton" onClick={()=>dispatch(delPost(props.post.id))}></button>
                    </span>
                <div className="statuscontent">
                    {props.post.postcontent}
                </div>
            </div>

            {/* LIKE/DISLIKE */}

            <div className="reactPost">
                <button onClick={()=>{setPostState({...postState, liked:!postState.liked}); dispatch(likePost(props.post.id, postState.liked, props.user))}} className={postState.liked? 'liked like':'like'}></button>
                <span className="likeAmount">{props.post.likedUsers.length} likes</span>
            </div>
            <hr style={{display: props.post.comments.length===0? 'none':''}}/>

            {/* COMMENTS */}

            {props.post.comments.length === 0 ? '': props.post.comments.map(e=> 
            <div key ={e.id} className="loadedComments">
                <img className="authorimg" src={userPic} alt="authorimg"/>
                    <div className="commentWrapper">
                        <div className="authornamedate">
                        <Link to={`/profile/${e.authoruserid}`}>
                            <p className="commentAuthorName">{e.authorname}</p>
                        </Link>
                        <p className="eachComment" >{e.commenttext}</p>
                    </div>
                    </div>
                </div>
                )}
                <div className="commentSection">
                  <div className="comment"></div>
                  <div className="addcomment">
                    <form>
                        <input onChange={(event)=>setPostState({...postState, commenttext: event.target.value})} className="commentText" type="text" placeholder="Write a comment"/>
                        <input type="reset" 
                        onClick={()=>{setCommentAttributes();
                            if(postState.commenttext!==''){ 
                            dispatch(addComment(comment))}}} className="postbtn" value="Add" />  
                    </form>
                  </div>
            </div>
        </div>
    )
}


const mapStateToProps=(state)=>(
    {
    user: state.firebase.auth,
  })

export default connect(mapStateToProps)(Status)
