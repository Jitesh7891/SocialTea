import React, { useEffect, useState } from 'react'
import "./chatOnline.css"
import axios from 'axios';

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {

  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(process.env.REACT_APP_BACKEND + "/api/users/friends/" + currentId);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);



  const handleClick = async (user) => {
    try {
      const res = await axios.get(process.env.REACT_APP_BACKEND +
        `/api/conversation/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    
    onlineFriends.length>0?
  (    <div className="chatOnline">
      {onlineFriends.map((online_friend) => (

        <div className="chatOnlineFriend" onClick={() => handleClick(online_friend)}>
          <div className="chatOnlineImgContainer">
            <img className="chatOnlineImg"
              src={online_friend?.profilePicture
                ? PF + online_friend.profilePicture
                : PF + "/avatar.jpg"} alt=""></img>
            <div className="chatOnlineBadge"></div>
          </div>
          <div className="chatOnlineName">{online_friend.username} </div>
        </div>
      ))}
    </div>)
  :
  (
  <span className='noOnlineText'>
  No Online Friends
  </span>
  )

  )
}

export default ChatOnline
