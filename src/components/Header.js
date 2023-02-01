import { useState } from "react";
import { useCookies } from "react-cookie";
import Modal from "./Modal";
import CreateIcon from '../images/create.png'
import DotsIcon from '../images/logout.png'
import RefreshIcon from '../images/refresh.png'
import SettingsIcon from '../images/settings.png'
import Settings from "./Settings";
const Header = ({getData, setShowLoader}) => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [showModal, changeShowModal] = useState(false)
    const [showSettings, changeShowSettings] = useState(false)
    const Name = cookies.Name
    const logout = () => {
        setShowLoader(true)
        removeCookie('Email')
        removeCookie('AuthToken')
        window.location.reload()
        setShowLoader(false)
    }
    const refreshpage = (e) => {
window.location.reload()
    }
    return (
        <div className="header">
            <div className="heading">
                <h2> 🗒 Notes</h2>
                <p>by {Name}</p>
            </div>
            <div className="btn-group">
                <button className="create" onClick={()=> changeShowModal(true)}> <img src={CreateIcon} alt="create" /></button>
                <button className="refresh" onClick={refreshpage}> <img src={RefreshIcon} alt="refresh" /></button>
                <button className="settings" onClick={()=> changeShowSettings(true)}> <img src={SettingsIcon} alt="settings" /></button>
                <button className='logout' onClick={logout}> <img src={DotsIcon} alt="dots" /> </button>
            </div>
            {showModal && <Modal changeShowModal={changeShowModal} mode={'Create'} getData={getData} setShowLoader={setShowLoader}/>}
        {showSettings && <Settings changeShowSettings={changeShowSettings}  setShowLoader={setShowLoader}/>}
        </div>
    );
}

export default Header;