import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom'
import axios from "axios";

const ChannelBar = () => {
    const [loading, setLoading] = useState(true)
    const [channels, setChannels] = useState([])

    useEffect(() => {
        console.log('once')
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

    return (
        <main>
            {loading ? (
                <h1>loading...</h1>
            ) : (
                channels.map((channel, i) => (
                    <Link to={`/${channel._id}`} data-id={channel._id} key={i}>{channel.name}</Link>
                ))
            )}
        </main>
    )
}

export default ChannelBar