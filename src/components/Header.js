import { useState } from "react";
import { useCookies } from "react-cookie";
import Modal from "./Modal";
import Create from '../images/create.png'
import Dots from '../images/logout.png'
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
    return (
        <div className="header">
            <div className="heading">
                <h2> 🗒 Notes</h2>
                <p>by {Email}</p>
            </div>
            <div className="btn-group">
                <button className="create" onClick={()=> changeShowModal(true)}> <img src={Create} alt="create" />
                </button>
                <button className='logout' onClick={logout}> <img src={Dots} alt="dots" /> </button>
            </div>
            {showModal && <Modal changeShowModal={changeShowModal} mode={'Create'} getData={getData} setShowLoader={setShowLoader}/>}
        </div>
    );
}

export default Header;