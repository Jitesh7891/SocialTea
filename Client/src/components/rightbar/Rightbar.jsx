import './rightbar.css'
import Online from '../online/Online'
import { Users } from '../../dummyData'
import { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { Link } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';




export default function Rightbar({ user }) {
  // Creating Users2 for now to avoid displaying the 1st user itself
  let Users2 = Users.filter((u) => { return u.id !== 1 })
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [friends, setFriends] = useState([]);
  const { user: currentuser , dispatch} = useContext(AuthContext);


  const [followed, setFollowed] = useState(currentuser.following.includes(user!==undefined?user._id:false));

 
  useEffect(() => {
    const getFriends = async () => {
      if (user) {
        try {
          const friendList = await axios.get("/users/friends/" + user._id);
          setFriends(friendList.data);
        } catch (err) {
          console.log(err)
        }
      }
    };
    getFriends();
  }, [user]);

  const handleFollowButon = async () => {
    try {
      if (followed) {
        await axios.put("/users/unfollow/" + user._id, { userId: currentuser._id })
        dispatch({type:"UNFOLLOW",payload:currentuser._id})
      } else {
        await axios.put("/users/follow/" + user._id, { userId: currentuser._id })
        dispatch({type:"FOLLOW",currpayload:currentuser._id})
      }
    } catch (error) {
      console.log(error)
    }
    setFollowed(!followed);

  }

  const HomeRightBar = () => {

    return (
      <>

        <div className="birthdayContainer">
          <img className='birthdayImg' src={PF + "gift.png"} alt="" />
          <span className='birthdayText'>
            <b style={{ fontWeight: 600 }}>Nora </b> and <b style={{ fontWeight: 600 }}> 1 other(s) </b> have a birthday today !
          </span>
        </div>
        <img src={PF + "ad.png"} alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users2.map(u => (
            <Online key={u.id} user={u} />
          ))}

        </ul>
      </>
    )
  };

  const ProfileRightBar = () => {
    return (
      <>
        {user.username !== currentuser.username &&

          <button onClick={handleFollowButon} className="rightbarFollowButton">

            {followed ? "Unfollow" : "Follow"}
            {followed ? <RemoveCircleOutlineIcon /> : <AddIcon />}

          </button>
        }
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "-"}</span>
          </div>
        </div>
        <h4 className="rightbarTitle2">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.length === 0 && <span style={{ marginRight: "80px" }}>No friends</span>}

          {friends.map((frined) => (

            <Link to={"/profile/" + frined.username} style={{ textDecoration: "none" }}>
              <div className="rightbarFollowing">

                <img src={frined.profilePicture == "" || frined.profilePicture == " " ? PF + "avatar.jpg" : PF + frined.profilePicture}
                  alt=""
                  className="rightbarFollowingImg" />

                <span className="rightbarFollowingName">
                  {frined.username}</span>

              </div>
            </Link>
          ))}

        </div>
      </>
    )
  }

  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  )
}
