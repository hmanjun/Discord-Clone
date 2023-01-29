import React, {useState, useEffect} from "react";
import { Link, useParams } from 'react-router-dom'
import axios from "axios";
import CreateModal from "./create-channel-modal";
import jwtService from "../utils/jwtManager"

const ChannelBar = () => {
    const [loading, setLoading] = useState(true)
    const [channels, setChannels] = useState([])
    const [selectedChannel, setSelectedChannel] = useState("")
    const {channelId} = useParams()

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/user/channels`, {headers: {'Authorization': `Bearer ${jwtService.getUserToken()}`}})
            .then(response => {
                setLoading(false)
                setChannels([...response.data.data])
            })
            .catch(err => {
                console.log(err)
            })
    },[])

    const markCurrentServer = event => {
        setSelectedChannel(`${event.target.getAttribute('data-name')}`)
    }

    const abreviateChannel = (name) => {
        const arr = name.split(' ')
        let res = ""
        arr.forEach((word, i) => {
            if(i < 4) res+= word[0].toUpperCase()
        })
        return res
    }

    //console.log(`channels: ${channels}`)

    return (
        <nav className="channel-bar-container">
            {loading ? (
                <h1>loading...</h1>
            ) : (
                channels.map((channel, i) => (
                    <Link className={`channel-bar-link ${selectedChannel === `${channel.name}` || channelId === channel._id ? "channel-bar-selected" : ""}`} to={`/channels/${channel._id}`} data-name={channel.name} key={i} onClick={markCurrentServer}>
                        <span data-name={channel.name} onClick={markCurrentServer}>{abreviateChannel(channel.name)}</span>
                    </Link>
                ))
                
            )}
            <Link className={`channel-bar-link channel-bar-default ${selectedChannel === "@me" ? "channel-bar-selected-green" : ""}`} to="/channels/@me" data-name="@me" onClick={markCurrentServer}><span style={{fontSize: 30}} data-name="@me" onClick={markCurrentServer}>✦</span></Link>
            <CreateModal/>
        </nav>
    )
}

export default ChannelBar