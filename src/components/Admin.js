import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import CancelIcon from '../images/cancel.png'
import DeleteModal from "./DeleteModal"

const Admin = () => {
    const [users, setUsers] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const AuthToken = cookies.AuthToken
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [currUser, setCurrUser] = useState('')
    const getUsers = async () => {
        try {
            const response = await fetch(`https://notes-server-production-9f36.up.railway.app/usersandnumbers`)
            if (response.status === 200) {
                const json = await response.json()
                const sorted = json?.sort((a, b) => a.count - b.count)
                setUsers(json)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (AuthToken) {
            getUsers()
        }
    }, [])
    const logout = () => {
        removeCookie('AuthToken')
        removeCookie('Email')
        window.location.reload()
    }
    return (
        <div className="admin">
            <div className="header">
                <h3>Admin</h3>
                <button onClick={logout} className='logout'>Logout</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Number of Notes</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user) =>
                        <tr key={user.user_email}>
                            <td>{user.user_email}</td>
                            <td>{user.count}</td>
                            <td> <button onClick={() => {setShowDeleteModal(true); setCurrUser(user.user_email)}}><img src={CancelIcon} alt="cancel" /></button> </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {showDeleteModal && <DeleteModal user={currUser} setShowDeleteModal={setShowDeleteModal} getUsers={getUsers}/>}
        </div>
    );
}

export default Admin;