import { useState } from "react";
import { useCookies } from "react-cookie";

const Modal = ({ mode, changeShowModal, note, getData }) => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [data, setData] = useState({
        user_email: mode === 'Edit' ? note.user_email : cookies.Email,
        title: mode === 'Edit' ? note.title : '',
        progress: mode === 'Edit' ? note.progress : '',
        date: mode === 'Edit' ? note.date : new Date(),
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setData(data => ({
            ...data,
            [name]: value
        }))
    }

    const postData = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`https://notes-server-production-9f36.up.railway.app/notes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            console.log(response)
            if (response.status === 200) {
                console.log('Worked')
                changeShowModal(false)
                getData()
            }
        } catch (error) {
            console.error(error)
        }
    }

    const editData = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`https://notes-server-production-9f36.up.railway.app/notes/${note.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            if(response.status === 200){
                changeShowModal(false)
                console.log('Edited!')
                getData()

            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="overlay">
            <div className="modal">
                <div className="modal-header">
                    <h3>{mode} task</h3>
                    <button className='close' onClick={() => changeShowModal(false)}>X</button>
                </div>
                <form>
                    <input type="text" placeholder='title' maxLength={300} onChange={handleChange} name='title' value={data.title} />
                    <input type="range" min={'0'} max={'100'} onChange={handleChange} name='progress' value={data.progress} />
                    <input type="submit" value={mode} onClick={mode=== 'Create' ? postData : editData}/>
                </form>
            </div>
        </div>
    );
}

export default Modal;