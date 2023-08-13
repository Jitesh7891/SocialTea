import './rightbar.css'
import Online from '../online/Online'
import{Users} from '../../dummyData'

export default function Rightbar() {
  // Creating Users2 for now to avoid displaying the 1st user itself
  let Users2=Users.filter((u)=>{return u.id!==1})
  
  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
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
      </div>
    </div>
  )
}
