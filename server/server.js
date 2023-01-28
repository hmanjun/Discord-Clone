const express = require("express")
const session = require('express-session')
const path = require('path')
const {WebSocketServer} = require("ws")
const http = require("http")
const https = require("https")
const { v4: uuidv4 } = require('uuid');
const routes = require('./controllers')
const {joinChatRoom, leaveRoom, getRoomUsers} = require('./ws-functions')
const {Message} = require('./models')
const fs = require('fs')

const db = require("./config/connection")
const PORT = 8080

//const PORT = process.env.PORT || 3001
const app = express()

const sess = {
    secret: 'fnwafnj dwabi',
    saveUninitialized: false,
    resave:false,
    cookie: {
        maxAge: (24 * 60 * 60 * 1000)
    }
}
app.use(session(sess))


//Middleware to parse incoming data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://hmanjun.github.io"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true)
    next();
});

//Render React html
app.use(express.static(path.join(__dirname, '../client/build')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))
}

app.use(routes)
/*
const key = fs.readFileSync('private.key')
const certificate = fs.readFileSync('certificate.crt')

const cred = {
    key,
    certificate
}
*/

//certificate process to convert to https
/*
app.get('/.well-known/pki-validation/588EF8D6733ACECAAA1A42338FAD9C17.txt', (req,res) => {
    res.sendFile('/home/ec2-user/588EF8D6733ACECAAA1A42338FAD9C17.txt')
})
*/

//Save ws with key userId
const map = {}

//Create websocket server
const server = new http.createServer(app)
const wss = new WebSocketServer({ clientTracking: true, noServer: true })

//Server middleware, checking login status should be added here later
server.on('upgrade', (request, socket, head) => { 
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    })
})

const wsMap = {}

//WSS listeners
wss.on("connection", (ws,req) => {

    ws.on('message', async (data) =>{
        data = JSON.parse(data)
        const {chatId} = data
        if(data.joinRoom){
            if(wsMap[chatId]) wsMap[chatId].push(ws)
            else wsMap[chatId] = [ws]
            ws.currentChat = chatId
            return
        }
        wsMap[chatId].forEach(user => {
            if(user.currentChat === chatId) user.send("")
        })
    })
    
    ws.on('close', () => {
        const chatId = ws.currentChat
        if(!wsMap[chatId]){
            console.log("WS is disconecting, but isn't in a channel")
            return
        }
        const index = wsMap[chatId].indexOf(ws)
        wsMap[chatId].splice(index,1)
    })
    
})

db.once('open', () => {
    server.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`)
    })
})