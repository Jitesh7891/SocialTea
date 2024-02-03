import React ,{useContext, useEffect, useState} from 'react'
import './home.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const user=localStorage.getItem("user");
  const navigate = useNavigate()

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
      setIsMobile(window.screen.width < 450)
  },[window.screen.width])

  //If no user present redirect to login page
  useEffect(()=>{
    if(!user || user===null){
      navigate("/login")
    }
  },[user])

  return (
    <div>
      <>
        <Topbar />
        <div className="homeContainer">
          <Sidebar />
          <Feed />
         { user && !isMobile &&
         <Rightbar />
         }
        </div>
      </>
    </div>
  )
}

export default Home
