import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateModal = () => {
    const [open, setOpen] = useState(false)
    const [modalType, setModalType] = useState(true)
    const [channelName, setChannelName] = useState("")
    const [joinId, setJoinId] = useState("")
    const navigate = useNavigate()

    const toggleModal = () => {
        setOpen(!open)
    }

    const toggleType = () => {
        setModalType(!modalType)
    }

    const createServer = async() => {
        axios
            .post(`${process.env.REACT_APP_API_URL}/api/channel/create`, {name: channelName}, {withCredentials: true})
            .then((response) => {
                const {data} = response
                setChannelName("")
                window.location.assign(`/Discord-Clone/#/channels/${data._id}`)
            })
            .catch((err) => console.log(err))
    }

    const joinServer = () => {
        axios
            .post(`${process.env.REACT_APP_API_URL}/api/channel/join/${joinId}`, {}, {withCredentials: true})
            .then(response => {
                const joinCopy = joinId
                setJoinId("")
                setModalType(true)
                window.location.assign(`/Discord-Clone/#/channels/${joinId}`)
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <div className={`channel-bar-link channel-bar-default ${open ? "channel-bar-selected-green" : ""}`} data-name="P2" onClick={toggleModal}>
                <span style={{fontSize: 40, padding: 0, marginTop: -10}} data-name="P2" onClick={toggleModal}>+</span>
            </div>
            {open && (
                <>
                    <div className="modal-overlay" onClick={toggleModal}></div>
                    <div className="modal-wrapper">
                        {modalType && (
                            <div className="modal-body">
                                <h1>Create a server</h1>
                                <p>Your server is where you and your friends hang out. Make your own and start talking.</p>
                                <input type="text" value={channelName} placeholder="Enter name for new channel" onChange={e => setChannelName(e.target.value)}></input>
                                <button className="modal-create-button" onClick={createServer}>Create Server</button>
                                <div className="modal-bottom-section">
                                    <h4>Already know a server?</h4>
                                    <button onClick={toggleType}>Join a Server</button>
                                </div>
                            </div>
                        )}
                        {!modalType && (
                            <div className="modal-body">
                                <h1>Join a server</h1>
                                <p>Enter a channel ID below to join an existing server.</p>
                                <input type="text" value={joinId} placeholder="Enter existing ID" onChange={e => setJoinId(e.target.value)}></input>
                                <button className="modal-create-button" onClick={joinServer}>Join Server</button>
                                <div className="modal-bottom-section">
                                    <h4>Want to create your own server?</h4>
                                    <button onClick={toggleType}>Create a Server</button>
                                </div>
                            </div>
                        )}

                    </div>
                </>
            )}
        </>
    )
}

export default CreateModal