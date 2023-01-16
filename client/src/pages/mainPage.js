import React, {useState} from 'react'
import {Outlet} from "react-router-dom"
import ChannelBar from '../components/channels-bar'

const MainPage = () => {
    
    return (
        <main style={{display: "flex", flexDirection: "row"}}>
            <ChannelBar/>
            <Outlet />
        </main>
    )
}

export default MainPage