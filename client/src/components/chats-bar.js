import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {leaveCurrentChat, joinChat} from '../utils/chatHelpers'

const ChatBar = ({channelId}) => {
    const [loading, setLoading] = useState(true)
    const [rooms, setRooms] = useState([])
    const [data, setData] = useState({})
    const [selectedChat, setSelectedChat] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/channel/${channelId}`, {withCredentials: true})
            .then(response => {
                setLoading(false)
                setData(response.data)
                setRooms([...response.data.chatRooms])
            })
            .catch(err => console.log(err))
    }, [])

    const join = async (event, roomId) => {
        const chatId = event.target.getAttribute('data-id')
        setSelectedChat(`${chatId}`)
        await leaveCurrentChat()
        //await joinChat(chatId)
        await axios
            .post(`http://localhost:8080/api/chat-room/join/${chatId}`,{},{withCredentials: true})
            .then()
            .catch(err => console.log(err))
        await axios
            .post(`http://localhost:8080/api/chat-room/join/${chatId}`,{}, {withCredentials: true})
            .catch(err => console.log(err))
        navigate(`/channels/${channelId}/${roomId}`)
    }

    return (
        <nav className="chat-bar-container">
            {loading ? (
                <div className="chat-bar-header">
                    <span>Loading...</span>
                </div>
            ) : (
                <div style={{width: "100%"}}>
                    <div className="chat-bar-header ">
                        <span>{data.name}</span>
                    </div>
                    <div style={{marginTop: 10, display: "flex", flexDirection: "column", alignItems: "center"}}>
                        {rooms.map((room, i) => (
                            <div className={`chat-bar-link ${selectedChat === room._id ? "chat-bar-link-selected" : ""}`} data-id={room._id} key={i} onClick={e => join(e, room._id)}>
                                <span data-id={room._id}>{`# ${room.name}`}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default ChatBar