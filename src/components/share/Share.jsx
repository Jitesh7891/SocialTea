import React from 'react'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import './share.css'

export default function Share() {
  return (
    <div className='share'>
      <div className="shareWrapper">
        <div className="shareTop">
        <img className='shareProfileImg' src="/assets/person/1.jpeg" alt="" />
        <input placeholder="What's in your mind Jenny ? " className="shareInput" />
        </div>
        <hr className="shareHr" />

        <div className="shareBottom"></div>
        <div className="shareOptions">
            <div className="shareOption">
            <PermMediaIcon style={{color:'red'}} className='shareIcon'/>
            <div className="shareOptionText"><span className="shareOptiontext">Photo or Video</span></div>
            </div>
            <div className="shareOption">
            <LabelIcon style={{color:'blue'}}  className='shareIcon'/>
            <div className="shareOptionText"><span className="shareOptiontext">Label</span></div>
            </div>
            <div className="shareOption">
            <RoomIcon style={{color:'green'}}  className='shareIcon'/>
            <div className="shareOptionText"><span className="shareOptiontext">Location</span></div>
            </div>
            <div className="shareOption">
            <EmojiEmotionsIcon style={{color:'goldenrod'}}  className='shareIcon'/>
            <div className="shareOptionText"><span className="shareOptiontext">Emotions</span></div>
            </div>
            <button className="shareButton">Share</button>
        </div>
      </div>
    </div>
  )
}
