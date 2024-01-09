import './post.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Post({ post }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`https://socialtea-backend.onrender.com/api/users/getuser?userId=${post.userId}`);
        setUser(res.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    getUser();
  }, [post.userId]);

  const handleLikeButton = async () => {
    try {
      await axios.put(`https://socialtea-backend.onrender.com/api/posts/like/${post._id}`, { userId: currentUser._id });
    } catch (error) {
      console.error('Error liking post:', error);
    }
    isLiked ? setLike(like - 1) : setLike(like + 1);
    setIsLiked(!isLiked);
  };

  let imgSource = PF + 'avatar.jpg';

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={user.profilePicture ? PF + user.profilePicture : imgSource}
                alt=""
                className="postProfileImg"
              />
              <span className="postUsername">{user.username}</span>
              <span className="postDate">{format(post.createdAt)}</span>
            </Link>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img className="postImg" src={PF + post.image} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              onClick={handleLikeButton}
              className="likeIcon"
              src={PF + 'like.png'}
              alt=""
            />
            <span className="postLikeCounter">
              {like} {like === 1 ? 'person' : 'people'} liked it
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{0} comment(s)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
