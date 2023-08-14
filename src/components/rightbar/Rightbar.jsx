import './rightbar.css'
import Online from '../online/Online'
import{Users} from '../../dummyData'

export default function Rightbar({profile}) {
  // Creating Users2 for now to avoid displaying the 1st user itself
  let Users2=Users.filter((u)=>{return u.id!==1})
  
  const HomeRightBar=()=>{
    return(
      <>
       <div className="birthdayContainer">
          <img className='birthdayImg' src="assets/gift.png" alt="" />
          <span className='birthdayText'>
            <b>Nora </b> and <b> 1 other(s) </b> have a birthday today !
          </span>
        </div>
        <img src="assets/ad.png" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
       {Users2.map(u=>(
        <Online key={Users.id} user={u}/>
       ))}
     
        </ul>
      </>
    )
  };

  const ProfileRightBar=()=>{
    return(
      <>
      <div className="rightbarInfo">
      <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">New York</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">Madrid</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoValue">Single</span>
        </div>
      </div>
<h4 className="rightbarTitle">User Friends</h4>
<div className="rightbarFollowings">
  <div className="rightbarFollowing">
    <img src="assets/person/1.jpeg" alt="" className="rightbarFollowingImg" />
    <span className="rightbarFollowingName">
      John Carter</span>
  </div>
  <div className="rightbarFollowing">
    <img src="assets/person/2.jpeg" alt="" className="rightbarFollowingImg" />
    <span className="rightbarFollowingName">
      John Carter</span>
  </div>
  <div className="rightbarFollowing">
    <img src="assets/person/3.jpeg" alt="" className="rightbarFollowingImg" />
    <span className="rightbarFollowingName">
      John Carter</span>
  </div>
  <div className="rightbarFollowing">
    <img src="assets/person/4.jpeg" alt="" className="rightbarFollowingImg" />
    <span className="rightbarFollowingName">
      John Carter</span>
  </div>
  <div className="rightbarFollowing">
    <img src="assets/person/5.jpeg" alt="" className="rightbarFollowingImg" />
    <span className="rightbarFollowingName">
      John Carter</span>
  </div>
</div>
      </>
    )
  }

  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
       {profile? <ProfileRightBar/>:<HomeRightBar/>}
      </div>
    </div>
  )
}
