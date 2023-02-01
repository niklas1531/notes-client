const DeleteModal = ({ user, setShowDeleteModal,getUsers }) => {
    const deleteuser = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`https://notes-server-production-9f36.up.railway.app/deleteuser/${user}`, {
                method: 'DELETE'
            })
            if (response.status === 200) {
                setShowDeleteModal(false)
                getUsers()
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Logik fehlt, dass User Notes auch gelöscht werden
    return (
        <div className="overlay">
            <div className="modal">
                <div className="modal-header">
                    <button className='close' onClick={() => setShowDeleteModal(false)}>X</button>
                </div>
                <div className="admin-delete-modal">
                    <h3>Do you really want to delete the following user?</h3>
                    <p>{user}</p>
                    <button className="admin-delete-btn" onClick={deleteuser}>DELETE</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;