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

module.exports = {joinRoom, leaveRoom}