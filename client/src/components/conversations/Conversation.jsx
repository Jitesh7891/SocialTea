import React, { useEffect, useState } from 'react'
import "./conversation.css"
import axios from 'axios';

const Conversation = ({ conv, currentUser }) => {

  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conv.members.find((m) => m !== currentUser._id);

    const getUser = async () => {

      try {
        const res = await axios(process.env.REACT_APP_BACKEND + "/api/users/getuser?userId=" + friendId);

        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conv]);

  return (

    <div className="conversation">
      <img
        className="conversationImg"
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "/avatar.jpg"
        }
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}

export default Conversation
