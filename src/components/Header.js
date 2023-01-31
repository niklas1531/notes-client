import { useState } from "react";
import { useCookies } from "react-cookie";
import Modal from "./Modal";

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
                <button className="create" onClick={()=> changeShowModal(true)}>Create Note</button>
                <button className='logout' onClick={logout}>Logout</button>
            </div>
            {showModal && <Modal changeShowModal={changeShowModal} mode={'Create'} getData={getData} setShowLoader={setShowLoader}/>}
        </div>
    );
}

export default Header;