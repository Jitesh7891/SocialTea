import React, { useContext, useRef, useState } from 'react'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import './share.css'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';
import EmojiPicker from 'emoji-picker-react';

export default function Share() {

  const [isEmojiPickerVisible, setEmojiPickerVisible] = useState(false);

  const handleEmojiButtonClick = () => {
    setEmojiPickerVisible(!isEmojiPickerVisible);
  };


  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useContext(AuthContext);

  const desc = useRef('');

  const [file, setFile] = useState(null);

  const submithandler = async (e) => {
    e.preventDefault();

    if (desc.current.value === '' && !file) return;

    const newPost = {
      userId: user._id,
      desc: desc.current.value
    }

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.image = fileName;

      try {
        await axios.post(process.env.REACT_APP_BACKEND + "/api/upload", data);
        // await axios.post("https://localhost:8800/api/upload",data);
      } catch (err) {
        //console.log(err)
      }

    }
    try {
      axios.post(process.env.REACT_APP_BACKEND + "/api/posts/add", newPost)
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='share'>
      <div className="shareWrapper">
        <div className="shareTop">
          <img className='shareProfileImg' src={!(user.profilePicture == '' || user.profilePicture == ' ') ? PF + user.profilePicture : PF + "avatar.jpg"} alt="" />
          <input
            placeholder={`What's in your mind ${user.username} ? `}
            ref={desc}
            className="shareInput" />
        </div>
        <hr className="shareHr" />

        {file && (

          <div className="shareImgContainer" >
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <CancelIcon className='shareCanclelImg' onClick={() => setFile(null)} />
          </div>
        )}

        <form className="shareBottom"
          onSubmit={submithandler}>

          <div className="shareOptions">
            <label htmlFor='file' className="shareOption">
              <PermMediaIcon style={{ color: 'red' }} className='shareIcon' />
                <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: 'none' }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}>
              </input>
            </label>
            <div className="shareOption">
              <EmojiEmotionsIcon onClick={handleEmojiButtonClick} style={{ color: '#ffcc00' }} className='shareIcon' />
              <div className="shareOptionText" onClick={handleEmojiButtonClick}><span className="shareOptionText">Emojis
              </span></div>
              {isEmojiPickerVisible && (
                <div style={{ position: "absolute" }}>
                  <EmojiPicker
                    categories={['smileys_people', 'food_drink', 'travel_places', 'activities', 'animals_nature']}
                    style={{ maxHeight: "340px", height: "60vh", minWidth: "150px", width: '20vw', position: 'absolute', top: "2vh" }}
                    onEmojiClick={(emojiObject) => {
                      desc.current.value = desc.current.value + emojiObject.emoji

                    }}

                  />
                </div>
            )}
            </div>
            <div className="shareOption">
              <RoomIcon style={{ color: 'blue' }} className='shareIcon' />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <LabelIcon style={{ color: 'green' }} className='shareIcon' />
              <span className="shareOptionText">Tag Friends</span>
            </div>
          </div>
            <button className="shareButton" type='submit' >Share</button>
        </form>
      </div>
    </div>
  )
}
