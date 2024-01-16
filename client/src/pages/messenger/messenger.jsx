import React, { useRef } from 'react'
import "./messenger.css"
import Topbar from '../../components/topbar/Topbar'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import Conversation from '../../components/conversations/Conversation'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"

const Messenger = () => {
    const { user } = useContext(AuthContext)
    //first fetch all conversations
    const [conversations, setConversations] = useState([]);

    //depend on user click set current conversation
    const [currentChat, setCurrentChat] = useState(null);

    //for current convrsation set current messages  
    const [messages, setMessages] = useState([]);

    //new message initialised as empty string
    const [newMessage, setNewMessage] = useState("");

    const scrollRef = useRef();
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
    }, [user])

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(process.env.REACT_APP_BACKEND + "/api/message/" + currentChat?._id);
                setMessages(res.data.messages);
            } catch (err) {
                console.log(err);
            }
        };
        getMessages();
    }, [currentChat]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior:"smooth"});
      }, [messages]);


    //submit new message
    const handleSubmit = async (e) => {

        e.preventDefault();

        //no need to send empty message
        if (newMessage === "") return;

        try {
            const message = {
                conversationId: currentChat._id,
                sender: user._id,
                text: newMessage
            }

            setNewMessage("")
            const sentMessage = await axios.post(process.env.REACT_APP_BACKEND + "/api/message", message)

            setMessages([...messages, message])

            console.log(sentMessage)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput" />
                        {conversations.map((conv) => (
                            <div onClick={() => setCurrentChat(conv)}>
                                <Conversation conv={conv} currentUser={user} />
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
                                        <div ref={scrollRef}>
                                        <Message key={m._id} message={m} own={m.sender === user._id} />
                                        </div>
                                        )
                                    })}

                                </div>


                                <div className="chatBoxBottom">
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
                        <ChatOnline />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messenger
