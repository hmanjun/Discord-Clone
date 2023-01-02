import './App.css';
import React, {useState} from 'react';
let ws

function App() {
  const [recievedMessage, setRecievedMessage] = useState([])
  const [sendMessage, setSendMessage] = useState("")
  const [connected, setConnection] = useState(false)
  
  const connectWss = () =>{
    if(connected) return
    if(ws){
      ws.onerror = ws.onopen = ws.onclose = null;
      ws.close();
    }

    ws = new WebSocket(`ws://${window.location.host}`)

    ws.onopen = () =>{
      setConnection(true)
    }

    ws.addEventListener('message', ({data}) => {
      setRecievedMessage([...recievedMessage, data])
    })
  }

  const send = () => {
    if(!ws) return
    ws.send(sendMessage)
    setSendMessage("")
  }

  return (
    <div className="App">
      <h1>Connected status: {connected ? `connected` : `disconnected`}</h1>
      <h3>Room Code: Unused</h3>
      <button onClick={connectWss}>Connect to Server</button>
      <h2>Recent Messages</h2>
      <div className='recieved-messages'>{recievedMessage.map(message => <h4>{message}</h4>)}</div>
      <input input={sendMessage} onChange={e => setSendMessage(e.target.value)}></input>
      <button className='send-message-button' onClick={send}>Send</button>
    </div>
  );
}

export default App;
