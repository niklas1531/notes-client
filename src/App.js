import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'
import Header from './components/Header'
import Auth from './components/Auth'
import Note from './components/Note'
import Footer from './components/Footer'
import Admin from './components/Admin'

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const Email = cookies.Email
  const AuthToken = cookies.AuthToken
  const [notes, setNotes] = useState(null)
  const [showLoader, setShowLoader] = useState(false)


  const getData = async () => {
    try {
      const response = await fetch(`https://notes-server-production-9f36.up.railway.app/notes/${Email}`)
      const json = await response.json()
      const sorted = json?.sort((a, b) => new Date(a.date) - new Date(b.date)).reverse()
      setNotes(sorted)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (AuthToken) {
      getData()
    }
  }, [])
  return (
    <>
      <div className="app">
        {showLoader && <div className="loader-outer">
          <div className="loader"></div>
        </div>}
        {AuthToken ?
          <div className='home'>
            {Email === 'admin@gmail.com' ? <Admin /> : <>
              <Header getData={getData} setShowLoader={setShowLoader} />
              <h3>TODOs</h3>
              <div className='notes'>
                {notes?.filter((n) => n.type === 'todo').map((note) => <Note key={note.id} note={note} getData={getData} setShowLoader={setShowLoader} />)}
              </div>
              <h3>Notes</h3>
              <div className='notes'>
                {notes?.filter((n) => n.type === 'note').map((note) => <Note key={note.id} note={note} getData={getData} setShowLoader={setShowLoader} />)}
              </div>
              <Footer />
            </>}
          </div> : <Auth setShowLoader={setShowLoader} />}
      </div>
    </>
  );
}

export default App;
