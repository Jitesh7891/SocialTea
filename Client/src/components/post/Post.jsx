import './post.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import { format } from "timeago.js"
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Post({ post }) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like, setLike] = useState(post.likes.length);
  const [isliked, setisLiked] = useState(false);

  const { user: currentuser } = useContext(AuthContext);

  const [user, setUser] = useState({});

  useEffect(() => {
    setisLiked(post.likes.includes(currentuser._id))
  }, [currentuser._id, post.likes])

  useEffect(() => {
    const getuser = async () => {
      const res = await axios.get(`/users/getuser?userId=${post.userId}`)
      setUser(res.data)
    }
    getuser();
  }, [post.userId])
 




  const handlelikebutton = () => {
    try {
      axios.put("/posts/like/" + post._id, { userId: currentuser._id })
    } catch (error) {

    }
    isliked ? setLike(like - 1) : setLike(like + 1);
    setisLiked(!isliked);
  }

  let imgsource = PF+'avatar.jpg';
  return (

    <div className='post'>
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">

            <Link to={`profile/${user.username}`}>
              <img src={(user.profilePicture === ' '||user.profilePicture === '') ? imgsource : PF+ user.profilePicture} alt="" className="postProfileImg" />
              <span className="postUsername">{user.username}</span>
              <span className="postDate">{format(post.createdAt)}</span>
            </Link>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">
            {post.description}
          </span>
          <img className='postImg' src={PF+post.image} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img onClick={handlelikebutton} className='likeIcon' src={PF + "like.png"} alt="" />
            <span className="postLikeCounter">{like} people liked it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">
              {0} comment(s)
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
