import './topbar.css'
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from '../../context/AuthActions';
import Sidebar from '../sidebar/Sidebar';

const Topbar = () => {

    const [isMobile, setIsMobile] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        setIsMobile(window.screen.width < 430)
    }, [window.screen.width])

    const changeExpanded = () => {
        setIsExpanded(!isExpanded)
        console.log(isExpanded)
    }

    const navigate = useNavigate();

    let { user, dispatch } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleLogout = async () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");

        if (confirmLogout) {
            try {
                // Assuming you store the authentication token in localStorage
                localStorage.removeItem("token");

                // Dispatch LOGOUT action to update the state
                dispatch({ type: "LOGOUT" });

                // Additional logout actions if needed (e.g., clearing user data)
                LogOut();

                // Navigate to the login page
                navigate("/login");
            } catch (error) {
                console.error("Error during logout:", error);
            }
        }
    };


    return (
        !isMobile ?
            <div className='topbarContainer'>
                <div className="topbarLeft">
                    <Link to="/">
                        <span className="logo">SocialTea</span>
                    </Link>
                </div>

                <div className="topbarCenter">
                    <div className="searchbar">
                        <SearchIcon className='searchIcon' />
                        <input type="text" placeholder="Search " className="searchInput" />
                    </div>

                </div>
                <div className="topbarRight">
                    <div className="topbarLinks">
                        <span> <Link className="topbarLink" to="/messenger" >
                            Messenger
                        </Link></span>
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
                        </div>
                        <button className="topbarLogout" onClick={handleLogout}  >
                            Logout
                        </button>
                    </div>

                    <div>
                        <Link to={`/profile/${user.username}`}>
                            <img
                                src={(user.profilePicture !== undefined && user.profilePicture !== "") ?
                                    PF + user.profilePicture : PF + "avatar.jpg"}
                                alt="" className='topbarImage' />
                        </Link>
                    </div>
                </div>
            </div>
            :
            <div className='topbarContainer'>
                <div>
                    <MenuIcon onClick={changeExpanded}
                        className='menuIcon' />
                        {isExpanded&&
                            <div style={{position:"absolute",backgroundColor:"white",height:"100vh"}}>
                            <Sidebar/>
                            </div>
                        }
                </div>
                <div className="topbarLeft">
                    <Link to="/">
                        <span className="logo">SocialTea</span>
                    </Link>
                </div>
                <div className="topbarRight-mobile">
                    <Link to="/messenger">
                        <ChatIcon className='menuIcon' />
                    </Link>
                    <SearchIcon className='searchIcon' />
                    <button className="topbarLogout" onClick={handleLogout}  >
                        Logout
                    </button>
                    <Link to={`/profile/${user.username}`}>
                        <img
                            src={(user.profilePicture !== undefined && user.profilePicture !== "") ?
                                PF + user.profilePicture : PF + "avatar.jpg"}
                            alt="" className='topbarImage' />
                    </Link>
                </div>

            </div>

    )
}

export default Topbar
