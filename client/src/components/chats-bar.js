import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import {leaveAllChats} from '../utils/chatHelpers'
import jwtService from "../utils/jwtManager"

const ChatBar = ({channelId}) => {
    const [loading, setLoading] = useState(true)
    const [rooms, setRooms] = useState([])
    const [data, setData] = useState({})
    const [selectedChat, setSelectedChat] = useState("")
    const navigate = useNavigate()
    const cId = useParams().chatId

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/channel/${channelId}`, {withCredentials: true})
            .then(response => {
                setLoading(false)
                setData(response.data)
                setRooms([...response.data.chatRooms])
            })
            .catch(err => console.log(err))
    })

    const join = async (event, roomId) => {
        const chatId = event.target.getAttribute('data-id')
        setSelectedChat(`${chatId}`)
        await leaveAllChats()
        await axios
            .post(`${process.env.REACT_APP_API_URL}/api/chat-room/join/${chatId}`,{},{headers: {'Authorization': `Bearer ${jwtService.getUserToken()}`}})
            .then(response => {
                jwtService.joinRoom(response.data.accessToken)
                navigate(`/channels/${channelId}/${chatId}`)
            })
            .catch(err => console.log(err))
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
                            <div className={`chat-bar-link ${selectedChat === room._id || cId === room._id? "chat-bar-link-selected" : ""}`} data-id={room._id} key={i} onClick={e => join(e, room._id)}>
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