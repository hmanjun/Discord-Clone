const express = require("express")
const session = require('express-session')
const path = require('path')
const {WebSocketServer} = require("ws")
const http = require("http")
const { v4: uuidv4 } = require('uuid');
const routes = require('./controllers')
const {joinChatRoom, leaveRoom, getRoomUsers} = require('./ws-functions')
const {Message} = require('./models')

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
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true)
    next();
});

//Render React html
app.use(express.static(path.join(__dirname, '../client/build')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))
}

/*
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})
*/

app.use(routes)

//Save ws with key userId
const map = {}

//Create websocket server
const server = new http.createServer(app)
const wss = new WebSocketServer({ clientTracking: true, noServer: true })

//Server middleware, checking login status should be added here later
server.on('upgrade', (request, socket, head) => { 
    //console.log('Bypassing check of session data')
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    })
})

const wsMap = {}

//WSS listeners
wss.on("connection", (ws,req) => {
    console.log(`Client has connected to ws server.`)
    /*
    session(req.upgradeReq, {}, () => {
        console.log(req.upgradeReq.session)
    })
    */

    ws.on('message', async (data) =>{
        data = JSON.parse(data)
        const {chatId} = data
        if(data.joinRoom){
            //console.log(`client wants to join the room: ${chatId}`)
            if(wsMap[chatId]) wsMap[chatId].push(ws)
            else wsMap[chatId] = [ws]
            ws.currentChat = chatId
            //const temp = wsMap[chatId]
            //console.log(`Current ws map ${JSON.stringify(wsMap)}`)
            return
        }

        /*
        const {msgId} = data
        //console.log(data)
        const msgData = await Message.findById(msgId).populate({path: 'author', select: 'username'})
        //console.log(JSON.stringify(msgData))
        */
        wsMap[chatId].forEach(user => {
            if(user.currentChat === chatId) user.send("")
        })
        

        //Send messages to channel users
        
        //const users = await getRoomUsers(ws.room)
        //console.log(`recieved message ${data.message}, forwarding it to ${users}`)

        /*
        wss.clients.forEach(client => {
            if(users.includes(client.id)){
                //console.log(`found a user`)
                client.send(`${data.message}`)
            } 
        })
        */
        /*
        wss.clients.forEach(client => {
            client.send(`${data.message}`)
        })
        */
    })
    
    ws.on('close', () => {
        //console.log("Removing websocket from chat room")
        const chatId = ws.currentChat
        //console.log(JSON.stringify(wsMap[chatId]))
        if(!wsMap[chatId]){
            console.log("WS is disconecting, but isn't in a channel")
            return
        }
        const index = wsMap[chatId].indexOf(ws)
        wsMap[chatId].splice(index,1)
        //console.log(`Current ws map ${JSON.stringify(wsMap[chatId])}`)
    })
    
})

db.once('open', () => {
    server.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`)
    })
})