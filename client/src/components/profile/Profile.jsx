import './profile.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'


export default function Profile() {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;

    const[user,setUser]=useState({});
    const username=useParams().username;

    useEffect(() => {
      const getuser = async () => {
        const res = await axios.get(process.env.REACT_APP_BACKEND+`/api/users/getuser?username=${username}`)
        setUser(res.data)
      }
       getuser();
    },[username])
    
    return (
        <div>
            <>
                <Topbar />
                <div className="profile">
                    <Sidebar />
                    <div className="profileRight">
                        <div className="profileRightTop">
                            <div className="profileCover">

                            <img src={user.coverPicture!==' '&&user?PF+user.coverPicture:PF+"nature.avif"} alt="" className="profileCoverImg" />
                            <img src={user.profilePicture!==''&&user?PF+user.profilePicture:PF+"avatar.jpg"} alt="" className="profileUserImg" />
                            </div>
                            <div className="profileInfo">
                                <h4 className="profileInfoName">{user.username}</h4>
                                <h4 className="profileInfoDesc">{user.description}</h4>
                            </div>
                        </div>
                        <div className="profileRightBottom">
                            <Feed username={username}/>
                            <Rightbar user={user} />
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
}

