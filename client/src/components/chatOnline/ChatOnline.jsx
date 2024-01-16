import React from 'react'
import "./chatOnline.css"

const ChatOnline = ({user}) => {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
      <div className="chatOnline">
        <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer">
                <img className="chatOnlineImg"
                src={user?.profilePicture
            ? PF + user.profilePicture
            : PF + "/avatar.jpg" }alt=""></img>
                <div className="chatOnlineBadge"></div>
            </div>
        </div>
        <span className="chatOnlineName">Jitesh </span>
      </div>
    </div>
  )
}

export default ChatOnline
