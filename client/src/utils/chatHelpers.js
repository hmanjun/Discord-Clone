import axios from "axios";

const leaveCurrentChat = () => {
    return new Promise((res,reject) => {
        axios
            .post(`${process.env.REACT_APP_API_URL}/api/chat-room/leave`, {}, {withCredentials: true})
            .then(response => {
                res()
            })
            .catch(err => {
                console.log(err)
                reject()
            })
    }) 
     
}

const joinChat = (chatId) => {
    
    return new Promise((res,rej) => {
        axios
            .post(`${process.env.REACT_APP_API_URL}/api/chat-room/join/${chatId}`,{},{withCredentials: true})
            .then(res())
            .catch(err => {
                console.log(err)
                rej()
            })
    })
    
}

const leaveAllChats = () => {
    return new Promise((res,rej) => {
        axios
            .post(`${process.env.REACT_APP_API_URL}/api/user/leave-all-chats`,{}, {withCredentials: true})
            .then(res())
            .catch(err => {
                console.log(err)
                rej()
            })
    })
    
}

const postMessage = (text) => {
    return new Promise((res,rej) => {
        axios
            .post(`${process.env.REACT_APP_API_URL}/api/chat-room/send-message`, {body: text}, {withCredentials: true})
            .then(response => res(response.data))
            .catch(err => {
                console.log(err)
                rej()
            })
    })
}

export {leaveCurrentChat, joinChat, leaveAllChats, postMessage}