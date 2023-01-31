import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'
import Header from './components/Header'
import Auth from './components/Auth'
import Note from './components/Note'
import Footer from './components/Footer'

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const Email = cookies.Email
  const AuthToken = cookies.AuthToken
  const [notes, setNotes] = useState(null)

  const getData = async () => {
    try {
      const response = await fetch(`https://notes-server-production-9f36.up.railway.app/notes/${Email}`)
      const json = await response.json()
      const sorted = json?.sort((a, b) => new Date(b.date) - new Date(a.date))
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
    <div className="app">
      {AuthToken ? <div className='home'>
        <Header getData={getData}/>
        <div className='notes'>
          {notes?.map((note) => <Note key={note.id} note={note} getData={getData}/>)}
          <Footer />
        </div>
      </div> : <Auth />}

    </div>
  );
}

export default App;
