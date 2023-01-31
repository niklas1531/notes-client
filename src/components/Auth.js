import { useState } from "react";
import { useCookies } from 'react-cookie'

const Auth = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)

    const handleSubmit = async (e, endpoint) => {
        e.preventDefault()

        if (!isLogin && password !== confirmPassword) {
            setError('Make sure that passwords match!')
            return
        }
        const response = await fetch(`https://notes-server-production-9f36.up.railway.app/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        console.log(response)
        const data = await response.json()
        if (data.detail) {
            setError(data.detail)
        } else {
            setCookie('Email', data.email)
            setCookie('AuthToken', data.token)
        }

    }

    const changeView = (status) => {
        setError(null)
        setIsLogin(status)
    }
    return (
        <div className="auth">
            <form>
                <h2>{isLogin ? 'Please Log in' : 'Please Sign up!'}</h2>
                <input
                    type="email"
                    placeholder='email'
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {!isLogin &&
                    <input
                        type="password"
                        placeholder="confirm password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />}
                <input type="submit" value={isLogin ? 'Login': 'Signup'} className='submit' onClick={(e) => handleSubmit(e, isLogin ? 'login' : 'signup')} />
                {error && <p className="error">{error}</p>}
            </form>
            <div className="button-group">
                <button 
                onClick={() => changeView(true)}
                style={{backgroundColor: isLogin ? 'aliceblue': 'rgb(1, 76, 142)'}}
                >Login</button>
                <button 
                onClick={() => changeView(false)}
                style={{backgroundColor: !isLogin ? 'aliceblue': 'rgb(1, 76, 142)'}}
                >Signup</button>
            </div>
        </div>
    );
}

export default Auth;