import { useState } from "react";
import { useCookies } from "react-cookie";
import Modal from "./Modal";
import Create from '../images/create.png'
import Dots from '../images/logout.png'
import Refresh from '../images/refresh.png'
const Header = ({getData, setShowLoader}) => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [showModal, changeShowModal] = useState(false)
    const Email = cookies.Email
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
                <p>by {Email}</p>
            </div>
            <div className="btn-group">
                <button className="create" onClick={()=> changeShowModal(true)}> <img src={Create} alt="create" /></button>
                <button className="refresh" onClick={refreshpage}> <img src={Refresh} alt="refresh" /></button>
                <button className='logout' onClick={logout}> <img src={Dots} alt="dots" /> </button>
            </div>
            {showModal && <Modal changeShowModal={changeShowModal} mode={'Create'} getData={getData} setShowLoader={setShowLoader}/>}
        </div>
    );
}

export default Header;