import React, {useState} from 'react'
import axios from 'axios'

const RegisterPage = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState([])

    const validateFields = () => {
        let res = true
        const message = []
        if(!/.+@.+\..+/.test(email)){
            res = false
            message.push("Email is not valid.")
        }
        if(!username.length > 0){
            res = false
            message.push("Username field cannot be empty.")
        }
        if(!(password.length >= 8)){
            res = false
            message.push("Password must be 8 characters long.")
        }
        setError(!res)
        setErrorMessage(message)
        return res
    }

    const createAccount = () => {
        if(!validateFields()) return
        axios
            .post(`${process.env.REACT_APP_API_URL}/api/user/sign-up`, {
                username: username,
                email: email,
                password: password
            }, {withCredentials: true})
            .then(response => {
                window.location.assign(`/channels/@me`)
            })
            .catch(err => {
                setError(true)
                setErrorMessage([err])
            })
    }

    return (
        <main className='log-reg-container'>
            <div className='log-reg-modal'>
                <b>Create an account</b>
                <div className='log-reg-form'>
                    <label>EMAIL</label>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value.replaceAll(" ",""))}></input>
                    <label>USERNAME</label>
                    <input type='text' value={username} onChange={e => setUsername(e.target.value.replaceAll(" ",""))}></input>
                    <label>PASSWORD</label>
                    <input type='text' value={password} onChange={e => setPassword(e.target.value.replaceAll(" ",""))}></input>
                    <button className='log-reg-btn' type='button' onClick={createAccount}>Continue</button>
                </div>
                <a href='/login'>Already have an account?</a>
                {error && <ul>{errorMessage.map((msg, i) => (<li className='log-reg-err' key={`${i}`}>{`${msg}`}</li>))}</ul>}
                <p>By registering, you consent to the creation of a account with the above credentials.</p>
            </div>
        </main>
    )
}

export default RegisterPage