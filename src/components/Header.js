import { useState } from "react";
import { useCookies } from "react-cookie";
import Modal from "./Modal";

const Header = ({getData}) => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [showModal, changeShowModal] = useState(false)
    const Email = cookies.Email
    const logout = () => {
        removeCookie('Email')
        removeCookie('AuthToken')
        window.location.reload()
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
            {showModal && <Modal changeShowModal={changeShowModal} mode={'Create'} getData={getData}/>}
        </div>
    );
}

export default Header;