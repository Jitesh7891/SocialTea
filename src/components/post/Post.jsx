import'./post.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Users} from '../../dummyData'
import { useState } from 'react';

export default function Post({post}) {

  const[like,setLike]=useState(post.like);
  const[isliked,setisLiked]=useState(false);

  const handlelikebutton=()=>{
    if(!isliked){
      setLike(++post.like);
      setisLiked(true);
    }
    else{ 
      setLike(--post.like);
      setisLiked(false);
    }
  }

  return (
    <div className='post'>
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src={Users.filter(u=>u.id=== post.userId)[0].profilePicture} alt="" className="postProfileImg" />
            <span className="postUsername">{Users.filter(u=>u.id=== post.userId)[0].username}</span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
          <MoreVertIcon/>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">
            {post.desc}
          </span>
          <img className='postImg' src={post.photo} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img onClick={handlelikebutton} className='likeIcon' src="/assets/like.png" alt="" />
            <img onClick={handlelikebutton} className='likeIcon' src="/assets/heart.png" alt="" />
            <span className="postLikeCounter">{like} people liked it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">
              {post.comment} comment(s)
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
