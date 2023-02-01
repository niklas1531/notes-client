import { useState } from "react";
import { useCookies } from "react-cookie";
import CancelIcon from '../images/cancel.png'
import ConfirmIcon from '../images/confirm.png'

const Settings = ({ changeShowSettings, setShowLoader }) => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [newEmail, setNewEmail] = useState('')
    const Email = cookies.Email
    const [newPassword, setNewPassword] = useState('')
    const [error, setError] = useState(false)

    const changePW = async (e) => {
        e.preventDefault()
        setShowLoader(true)
        if (newPassword === '') {
            setError(true)
            setShowLoader(false)
            return
        }
        setError(false)
        try {
            const response = await fetch(`https://notes-server-production-9f36.up.railway.app/settings/${Email}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: newPassword })
            })
            console.log(response)
            if (response.status === 200) {
                changeShowSettings(false)
                setShowLoader(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="overlay">
            <div className="modal">
                <div className="modal-header">
                    <h3>Settings</h3>
                    <button className='close' onClick={() => changeShowSettings(false)}>X</button>
                </div>
                <div className="settings-container">
                    <div className='changepw'>
                        <input style={{ borderColor: error ? 'rgb(245, 108, 108)' : 'rgb(0,0,0)', borderWidth: error ? '2px' : '1px' }} type="password" id='newpassword' placeholder="Change password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        <button onClick={changePW}> <img src={ConfirmIcon} alt="" /> </button>
                        <button onClick={() => changeShowSettings(false)}> <img src={CancelIcon} alt="cancel" /> </button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;