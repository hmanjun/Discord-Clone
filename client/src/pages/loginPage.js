import React, {useState} from 'react'
import { leaveAllChats } from '../utils/chatHelpers'
import axios from 'axios'

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const validateFields = () => {
        let res = true
        const message = []
        if(!/.+@.+\..+/.test(email)){
            res = false
            message.push("Email is not valid.")
        }
        if(!(password.length > 0)){
            res = false
            message.push('Password field may not be empty')
        }
        setErrorMessage(message)
        setError(!res)
        return res
    }

    const login = () => {
        if(!validateFields()) return
        axios
            .post(`${process.env.REACT_APP_API_URL}/api/user/login`, {
                email: email,
                password: password
            }, {withCredentials: true})
            .then(async response => {
                await leaveAllChats()
                window.location.assign(`/Discord-Clone/#/channels/@me`)
                //this.props.router.push('/channels')
            })
            .catch(err => {
                setErrorMessage([err])
                setError(true)
            })
    }

    return (
        <main className='log-reg-container'>
            <div className='log-reg-modal'>
                <b>Welcome back!</b>
                <span style={{color: '#9A9DA1', marginTop: '10px'}}>We're so exited to see you again!</span>
                <div className='log-reg-form'>
                    <label>EMAIL<span style={{color: '#FF6961'}}>*</span></label>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value.replaceAll(" ",""))}></input>
                    <label>PASSWORD<span style={{color: '#FF6961'}}>*</span></label>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value.replaceAll(" ",""))}></input>
                    <button className='log-reg-btn' type='button' onClick={login}>Continue</button>
                </div>
                {error && <ul>{errorMessage.map((msg, i) => (<li className='log-reg-err' key={`${i}`}>{`${msg}`}</li>))}</ul>}
                <p>Need an account? <a href='/Discord-Clone/#/register'>Register</a></p>
            </div>
        </main>
    )
}

export default LoginPage