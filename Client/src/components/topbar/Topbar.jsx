import './topbar.css'
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { LogOut } from '../../context/AuthActions';



const Topbar = () => {
    const navigate=useNavigate();

    let {user,dispatch}=useContext(AuthContext);
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;

    const handleLogout=async ()=>{
        const p =window.confirm("Are you sure you want to logout?");
        if(p){
           await localStorage.removeItem("user");
           dispatch({type:"LOGOUT"})
           LogOut();
            navigate("/login");
        }
    }

    return (
        <div className='topbarContainer'>
            <div className="topbarLeft">
                <span className="logo">SocialTea</span>
            </div>

            <div className="topbarCenter">
                <div className="searchbar">
                    <SearchIcon className='searchIcon'/>
                    <input type="text" placeholder="Search for friend , post or video " className="searchInput" />
                </div>

            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <PersonIcon />
                        <span className="topbarIconBadge">3</span>
                    </div>
                    <div className="topbarIconItem">
                        <ChatIcon />
                        <span className="topbarIconBadge">12</span>
                    </div>
                    <div className="topbarIconItem">
                        <NotificationsIcon />
                        <span className="topbarIconBadge">5</span>
                    </div>
                    <div>
                        <button onClick={handleLogout} style={{backgroundColor:'red',color:'white'}}>
                            Logout
                        </button>
                    </div>
                </div>

            <div>
            <Link to={`profile/${user.username}`}>
                <img 
                src={!(user.profilePicture!==undefined||user.profilePicture!=="")?
                    PF+user.profilePicture:PF+"/avatar.jpg"}
                     alt="" className='topbarImage' />
            </Link>
            </div>
            </div>
        </div>
    )
}

export default Topbar
