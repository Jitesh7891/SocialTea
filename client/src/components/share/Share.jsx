import React, { useContext, useRef, useState } from 'react'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import './share.css'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useContext(AuthContext);

  const desc = useRef();

  const [file, setFile] = useState(null);

  const submithandler=async(e)=>{
    e.preventDefault();

    const newPost={
      userId:user._id,
      desc:desc.current.value
    }
    
    if(file){
      const data=new FormData();
      const fileName=Date.now()+file.name;
      data.append("name",fileName);
      data.append("file",file);
      newPost.image = fileName;

      try{
        await axios.post("https://socialtea-backend.onrender.com/api/upload",data);
      }catch(err){
        //console.log(err)
      }

    }
    try{
      axios.post("/posts/add",newPost)
      window.location.reload();
    }catch(err){
      //console.log(err)
    }
  }

  return (
    <div className='share'>
      <div className="shareWrapper">
        <div className="shareTop">
          <img className='shareProfileImg' src={!(user.profilePicture== '' || user.profilePicture== ' ') ? PF + user.profilePicture : PF + "avatar.jpg"} alt="" />
          <input
            placeholder={`What's in your mind ${user.username} ? `} 
            ref={desc}
            className="shareInput" />
        </div>
        <hr className="shareHr" />

        {file && (
        
          <div className="shareImgContainer" >
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <CancelIcon className='shareCanclelImg' onClick={()=>setFile(null)}/>
          </div>
        )}

        <form className="shareBottom"
        onSubmit={submithandler}>

        <div className="shareOptions">
          <label htmlFor='file' className="shareOption">
            <PermMediaIcon style={{ color: 'red' }} className='shareIcon' />
            <div className="shareOptionText">
              <span className="shareOptiontext">Photo or Video</span></div>
            <input
            style={{display:'none'}}
              type="file"
              id="file"
              accept=".png,.jpeg,.jpg"
              onChange={(e) => setFile(e.target.files[0])}>
            </input>
          </label>
          <div className="shareOption">
            <LabelIcon style={{ color: 'blue' }} className='shareIcon' />
            <div className="shareOptionText"><span className="shareOptiontext">Label</span></div>
          </div>
          <div className="shareOption">
            <RoomIcon style={{ color: 'green' }} className='shareIcon' />
            <div className="shareOptionText"><span className="shareOptiontext">Location</span></div>
          </div>
          <div className="shareOption">
            <EmojiEmotionsIcon style={{ color: 'goldenrod' }} className='shareIcon' />
            <div className="shareOptionText"><span className="shareOptiontext">Emotions</span></div>
          </div>
          <button className="shareButton" type='submit' >Share</button>
        </div>
                </form>
      </div>
    </div>
  )
}
