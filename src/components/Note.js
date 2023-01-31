import { useState } from "react";
import Modal from "./Modal";
import Progress from "./Progress";

const Note = ({ note, getData }) => {
    const [showModal, changeShowModal] = useState(false)

    const deleteNote = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`https://notes-server-production-9f36.up.railway.app/notes/${note.id}`, {
                method: 'DELETE'
            })
            if(response.status === 200){
                getData()
            }
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className="note">
            <div>
                <h4 className="title">{note.title}</h4>
                <p className="date">{note.date}</p>
            </div>
            <Progress progress={note.progress} />
            <div className="header">
                <button className="edit" onClick={() => changeShowModal(true)}>EDIT</button>
                <button className="delete" onClick={deleteNote}>DELETE</button>
            </div>
            {showModal && <Modal changeShowModal={changeShowModal} mode={'Edit'} getData={getData} note={note}/>}
        </div>
    );
}

export default Note;