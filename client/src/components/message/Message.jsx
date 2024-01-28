import { useContext, useEffect, useState } from "react";
import "./message.css";
import { format } from "timeago.js";
import { AuthContext } from '../../context/AuthContext';
import axios from "axios";

export default function Message({ message, own,currentId,currentChat }) {

  const [user, setUser] = useState(null);
  const {user:currentuser}=useContext(AuthContext)
  useEffect(() => {
    const friendId = currentChat.members.find((m) => m !== currentId);

    const getUser = async () => {

      try {
        const res = await axios(process.env.REACT_APP_BACKEND + "/api/users/getuser?userId=" + friendId);

        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentChat]);

  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
         <img
          className="messageImg"
          src={
            own?((currentuser&&currentuser.profilePicture!==undefined&&currentuser.profilePicture!=="")?
            PF+currentuser.profilePicture:PF+"avatar.jpg"):((user&&user.profilePicture!==undefined&&user.profilePicture!=="")?
            PF+user.profilePicture:PF+"avatar.jpg")
          }
          alt=""
        /> 
        
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}