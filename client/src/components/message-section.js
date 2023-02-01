import React, {useState, useEffect, useRef} from "react"
import {useParams, useNavigate} from 'react-router-dom'
import axios from "axios"
import moment from 'moment'
import { postMessage } from "../utils/chatHelpers"
import jwtService from "../utils/jwtManager"

let ws

const MessageSection = () => {
    const [messageData, setMessageData] = useState([])
    const [activeUsers, setActiveUsers] = useState([])
    const [chatName, setChatName] = useState("loading...")
    const [formText, setFormText] = useState("")
    const [reFetch, setReFetch] = useState(1)
    const [connected, setConnected] = useState(false)
    const [reload, setReload] = useState(false)

    const navigate = useNavigate()
    const {chatId} = useParams()
    //if(chatId) setReload(true)
    const messagesEnd = useRef(null)

    useEffect(() => {
        async function fetch(){
            await axios
                .get(`${process.env.REACT_APP_API_URL}/api/chat-room/room-data`, {headers: {'Room': `Bearer ${jwtService.getUserToken()}`}})
                .then(response => {
                    //console.log(response)
                    setMessageData([...response.data.messages])
                    setActiveUsers([...response.data.activeUsers])
                    setChatName(`${response.data.name}`)
                })
                .catch(err => {
                    console.log(err)
                    //navigate(0)
                })
        }
        fetch()
        
        const connectWs = () => {
            if(ws){
                ws.onerror = ws.onopen = ws.onclose = null;
                ws.close();
            }
            ws = new WebSocket('wss://dclone-backend.herokuapp.com/')
            setConnected(true)
        
            ws.onopen = () =>{
                ws.send(JSON.stringify({joinRoom: true, chatId: chatId}))
            }
        
            ws.addEventListener('message', (message) => {
               setReFetch(cur => cur + 1)
            })

            ws.onclose = () => {
                setConnected(false)
            }
        }

        if(!connected) connectWs()
    }, [reFetch, reload])

    useEffect(() => {
        messagesEnd.current?.scrollIntoView()
    }, [messageData])

    const sendMsg = async (event) => {
        if(event.key !== 'Enter' || formText === "") return
        const {messageId} = await postMessage(formText)
        //console.log(messageId)
        ws.send(JSON.stringify({joingRoom: false, chatId: chatId, msgId: messageId}))
        setFormText("")
    }

    return (
        <main className="messages-page-wrapper">
            <section className="messages-section">
                <div className="messages-section-header">
                    <span>{`# ${chatName}`}</span>
                </div>
                <div className="messages-container">
                    {messageData.map((message, i) => (
                        <div className="messages-body" key={i}>
                            <div>
                                <span className="msb-username">{`${message.author.username}`}</span>
                                <span className="msb-date">{`${moment(message.createdData).format("MM/DD/YYYY hh:mm A")}`}</span>
                            </div>
                            <span className="msb-body">{message.body}</span>
                        </div>
                    ))}
                    <div ref={messagesEnd}/>
                </div>
                <div className="msg-input-wrapper">
                    <input className="message-form-input" type='text' value={formText} placeholder={`Message #${chatName}`} onChange={e => setFormText(e.target.value)} onKeyDown={e => sendMsg(e)}></input>
                </div>
            </section>
            <nav className="active-users-bar">
                <div className="active-users-header">
                    <span>{`Online - ${activeUsers.length}`}</span>
                </div>
                <div className="active-users-container">
                    {activeUsers.map((user, i) => (
                        <span key={i}>{`${user.username.slice(0,14)} ${user.usename > 14 ? "..." : ""}`}</span>
                    ))}
                </div>
            </nav>
        </main>
    )
}

export default MessageSection