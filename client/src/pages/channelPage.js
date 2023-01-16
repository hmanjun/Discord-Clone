import React from "react";
import { Outlet, useParams } from "react-router-dom";
import ChatBar from "../components/chats-bar";

const ChannelPage = () => {
    const {channelId} = useParams()

    return (
        <main className="test" style={{padding: 0, margin: 0}}>
            <ChatBar channelId={channelId}/>
            <Outlet/>
        </main>
    )
}

export default ChannelPage