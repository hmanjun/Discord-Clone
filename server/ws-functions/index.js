const {Channel} = require('../models')

const joinRoom = async (roomName, wsID) => {
    await Channel.findOneAndUpdate(
        {name: roomName},
        {$push: {users: wsID}}
    )
}

const leaveRoom = async (roomName, wsID) => {
    await Channel.findOneAndUpdate(
        {name: roomName},
        {$pull: {users: wsID}}
    )
}

const getRoomUsers = async (roomName) => {
    const channelData = await Channel.findOne({name: roomName})
    if(channelData) return channelData.users
    return false
}

module.exports = {joinRoom, leaveRoom, getRoomUsers}