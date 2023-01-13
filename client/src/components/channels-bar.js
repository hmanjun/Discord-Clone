import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom'
import axios from "axios";

const ChannelBar = () => {
    const [loading, setLoading] = useState(true)
    const [channels, setChannels] = useState([])
    const [selectedChannel, setSelectedChannel] = useState("")

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/user/channels`, {withCredentials: true})
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

    return (
        <nav className="channel-bar-container">
            {loading ? (
                <h1>loading...</h1>
            ) : (
                channels.map((channel, i) => (
                    <Link className={`channel-bar-link ${selectedChannel === `${channel.name}` ? "channel-bar-selected" : ""}`} to={`/channels`} data-name={channel.name} key={i} onClick={markCurrentServer}>
                        <span data-name={channel.name} onClick={markCurrentServer}>{abreviateChannel(channel.name)}</span>
                    </Link>
                ))
                
            )}
            <Link className={`channel-bar-link ${selectedChannel === "P1" ? "channel-bar-selected" : ""}`} to={`/channels`} data-name="P1" onClick={markCurrentServer}>
                <span data-name="P1" onClick={markCurrentServer}>P1</span>
            </Link>
            <div className={`channel-bar-link channel-bar-default ${selectedChannel === "P2" ? "channel-bar-selected-green" : ""}`} data-name="P2" onClick={markCurrentServer}>
                <span style={{fontSize: 40, padding: 0, marginTop: -10}} data-name="P2" onClick={markCurrentServer}>+</span>
            </div>
        </nav>
    )
}

export default ChannelBar