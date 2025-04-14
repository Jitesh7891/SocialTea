import Post from '../post/Post'
import Share from '../share/Share'
import './feed.css'
import {Posts} from '../../dummyData.js'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { useLocation, useParams } from 'react-router-dom';


export default function Feed({username}) {
  
  const location = useLocation();
  
  const[posts,setPosts]=useState([]);
  const {user}=useContext(AuthContext);


  useEffect(()=>{
    const gettimeline=async()=>{
      let res;
    if(location.pathname==="/"){ 
      res=await axios.get(process.env.REACT_APP_BACKEND+"/api/posts/all")
    }
    else{
      res=user.username!==username?await axios.get(process.env.REACT_APP_BACKEND+"/api/posts/profile/"+username):await axios.get(process.env.REACT_APP_BACKEND+"/api/posts/timeline/"+user._id)
    }

    setPosts(res.data.sort((p1,p2)=>{
      return  new Date(p2.createdAt)-new Date(p1.createdAt);
    }))
  }
  gettimeline();
  },[username,user._id,location])

  return (
    <div className='feed'>
      <div className="feedWrapper">

        {(!username||username===user.username)&&<Share/>}
        {/* <Share/> */}
        
      {posts.map((p)=>{
       return <Post key={p._id} post={p}/>
      })}

      {posts.length===0 && <span>No Posts Yet...</span>}
      
      </div>
    </div>
  )
}
