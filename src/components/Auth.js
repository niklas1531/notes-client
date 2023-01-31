import { useState } from "react";
import { useCookies } from 'react-cookie'

const Auth = ({setShowLoader}) => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)

    const handleSubmit = async (e, endpoint) => {
        e.preventDefault()
        setShowLoader(true)

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
            setShowLoader(false)
            window.location.reload()
        }

    }

    const changeView = (status) => {
        setError(null)
        setIsLogin(status)
    }
    return (
        <div className="auth">
            <form>
                <h2>{isLogin ? 'Log In' : 'Sign Up'}</h2>
                <input
                    type="email"
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {!isLogin &&
                    <input
                        type="password"
                        placeholder="Confirm password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />}
                <input type="submit" value={isLogin ? 'Login' : 'Signup'} className='submit' onClick={(e) => handleSubmit(e, isLogin ? 'login' : 'signup')} />
                {error && <p className="error">{error}</p>}
            </form>
            {!isLogin ?
                <button
                    onClick={() => changeView(true)}
                >Already have an Account? Login</button>
                :
                <button
                    onClick={() => changeView(false)}
                >Create Account</button>
            }
        </div>
    );
}

export default Auth;