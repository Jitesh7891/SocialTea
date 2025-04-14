import React, { useRef } from 'react'
import "./messenger.css"
import Topbar from '../../components/topbar/Topbar'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import Conversation from '../../components/conversations/Conversation'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import { io } from "socket.io-client"
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EmojiPicker from 'emoji-picker-react';

const Messenger = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(window.screen.width < 450)
    }, [window.screen.width])

    const socket = useRef();
    const { user } = useContext(AuthContext)
    //first fetch all conversations
    const [conversations, setConversations] = useState([]);

    //depend on user click set current conversation
    const [currentChat, setCurrentChat] = useState(null);

    //for current convrsation set current messages  
    const [messages, setMessages] = useState([]);

    //new message initialised as empty string
    const [newMessage, setNewMessage] = useState("");

    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const scrollRef = useRef();
    //so that it only runs once
    useEffect(() => {
        socket.current = io("wss://socialtea-socket.onrender.com");
    
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            });
        });
    
        return () => {
            socket.current.disconnect(); // Clean up socket connection on unmount
        };
    }, []);

    useEffect(() => {
   
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {

        const getConversations = async () => {
            try {
                const res = await axios.get(process.env.REACT_APP_BACKEND + `/api/conversation/${user._id}`)
                setConversations(res.data)

            } catch (error) {
                console.log("error: ", error.message)
            }
        }
        getConversations();
    }, [user._id])

    useEffect(() => {

        const getMessages = async () => {
            try {
                const res = await axios.get(process.env.REACT_APP_BACKEND + "/api/message/" + currentChat?._id);
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getMessages();
    }, [currentChat]);

    useEffect(() => {
     
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    useEffect(() => {
     
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            
            setOnlineUsers(
                user.following.filter((f) => users.some((u) => u.userId === f))
            );
        });
        return()=>{
            socket.current.emit("userdisconnect")
        }
    },[user]);

    const handleSubmit = async (e) => {

        if (newMessage === "") return;
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        const receiverId = currentChat.members.find(
            (member) => member !== user._id
        );

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
        });

        try {
            setNewMessage("");
            const res = await axios.post(process.env.REACT_APP_BACKEND + "/api/message", message);
            setMessages([...messages, res.data]);
        } catch (err) {
            console.log(err);
        }
    };

    //for emojis 
    const [isEmojiPickerVisible, setEmojiPickerVisible] = useState(false);

    const handleEmojiButtonClick = () => {
        setEmojiPickerVisible(!isEmojiPickerVisible);
    };
    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput" />
                        {conversations.map((conv) => (
                            <div onClick={() => setCurrentChat(conv)}>
                                <Conversation
                                 conv={conv} currentUser={user} currentChat={currentChat} onlineUsers={onlineUsers}
                            currentId={user._id}
                            setCurrentChat={setCurrentChat}/>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop">


                                    {messages.map(function (m) {
                                        return (
                                            <div key={m._id} ref={scrollRef}>
                                                <Message key={m._id} message={m} own={m.sender === user._id}
                                                    currentId={user._id} currentChat={currentChat} />
                                            </div>
                                        )
                                    })}

                                </div>
                                <div className="chatBoxBottom">
                                    <EmojiEmotionsIcon onClick={handleEmojiButtonClick} style={{ color: '#ffcc00' }} className='shareIcon' />
                                    {isEmojiPickerVisible && (
                                        <div style={{ position: "absolute" }}>
                                            <EmojiPicker
                                                categories={['smileys_people', 'food_drink', 'travel_places', 'activities']}
                                                style={{ maxHeight: "340px", height: "60vh", minWidth: "120px", width: '23vw', position: 'absolute', bottom: "-10vh", right: "-1vw" }}
                                                onEmojiClick={(emojiObject) => { setNewMessage(newMessage + emojiObject.emoji) }}

                                            />
                                        </div>
                                    )}

                                    <textarea
                                        className='chatMessageInput'
                                        placeholder='Write Something...'
                                        onChange={(e) => { setNewMessage(e.target.value) }}
                                        value={newMessage}
                                    ></textarea>
                                    <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>
                                </div>
                            </>) : (<span className='noConversationText'>You have to open a conversation to start a chat</span>)}
                    </div>
                </div>
                 <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        {onlineUsers && <ChatOnline
                            onlineUsers={onlineUsers}
                            currentId={user._id}
                            setCurrentChat={setCurrentChat}
                        />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messenger
