import { useState } from "react";
import { useCookies } from "react-cookie";

const Modal = ({ mode, changeShowModal, note, getData, setShowLoader }) => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [data, setData] = useState({
        user_email: mode === 'Edit' ? note.user_email : cookies.Email,
        title: mode === 'Edit' ? note.title : '',
        progress: mode === 'Edit' ? note.progress : '2',
        date: new Date().toLocaleString(),
        category: mode === 'Edit' ? note.category : 'red',
        content: mode === 'Edit' ? note.content : '',
        type: mode === 'Edit' ? note.type : 'todo'
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
        setShowLoader(true)
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
                setShowLoader(false)
                getData()

            }
        } catch (error) {
            console.error(error)
        }
    }

    const editData = async (e) => {
        e.preventDefault()
        setShowLoader(true)
        try {
            const response = await fetch(`https://notes-server-production-9f36.up.railway.app/notes/${note.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            if (response.status === 200) {
                changeShowModal(false)
                console.log('Edited!')
                setShowLoader(false)
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
                <form onSubmit={mode === 'Create' ? postData : editData}>
                    <input type="text" placeholder='Title' maxLength='50' onChange={handleChange} name='title' value={data.title} required />
                    <textarea name="content" id="content" cols="30" rows="5" onChange={handleChange} value={data.content} placeholder='Add some notes' />
                   <div>
                   <label htmlFor="todo">Todo</label>
                   <input type="radio" name='type' value='todo' id="todo" onClick={handleChange} checked={data.type === 'todo' ? true : false}/>
                   <label htmlFor="note">Note</label>
                    <input type="radio" name='type' value='note' id="note" onClick={handleChange}checked={data.type === 'note' ? true : false}/>
                   </div>
                    {data.type === 'todo' && <>
                        <label htmlFor="range">Drag to select your current progress:</label>
                        <input id='range' type="range" min={'2'} max={'100'} onChange={handleChange} name='progress' value={data.progress} />
                   </>}
                    <input type="submit" className='submit' value={mode} />

                </form>
            </div>
        </div>
    );
}

export default Modal;