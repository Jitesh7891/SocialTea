import'./post.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Post() {
  return (
    <div className='post'>
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src="/assets/person/1.jpeg" alt="" className="postProfileImg" />
            <span className="postUsername">Jenny</span>
            <span className="postDate">11 mins ago</span>
          </div>
          <div className="postTopRight">
          <MoreVertIcon/>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">
            Heading Home!
          </span>
          <img className='postImg' src="/assets/posts/1 (1).jpeg" alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className='likeIcon' src="/assets/like.png" alt="" />
            <img className='likeIcon' src="/assets/heart.png" alt="" />
            <span className="postLikeCounter">67 people liked it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">
              19 comments
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
