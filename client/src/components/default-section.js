import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtService from "../utils/jwtManager"

const DefaultSection = () => {
    const [loading, setLoading] = useState(true)
    const [publicServers, setPublicServers] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_API_URL}/api/channel/get/public-servers`, {withCredentials: true})
        .then(response => {
            console.log(response)
            setLoading(false)
            setPublicServers([...response.data])
        })
        .catch(err => {
            console.log(err)
        })
    },[])

    const joinServer = (event) => {
        const id = event.target.getAttribute("data-id")
        axios
            .post(`${process.env.REACT_APP_API_URL}/api/channel/join/${id}`, {}, {headers: {'Authorization': `Bearer ${jwtService.getUserToken()}`}})
            .then(response => {
                navigate(`/channels/${id}`)
            })
            .catch((err) => console.log(err))
    }

    return (
        <main className="default-section-container">
            <h1>Join a public server!</h1>
            {!loading && (
                <div>
                    {publicServers.map((server, i)=> (
                        <div className="public-server-card" key={i}>
                            <span className="public-server-name">{server.name}</span>
                            <div className="public-server-btn-wrapper">
                                <button className="public-server-btn" data-id={server._id}onClick={joinServer}>Join Server</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    )
}

export default DefaultSection