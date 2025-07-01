import { Routes, Route } from "react-router-dom"
import LoginPage from './pages/auth/LoginPage/LoginPage'
import CharacterMix from './pages/lobby/CharacterMix/CharacterMix'
import Lobby from "./pages/lobby/Lobby/Lobby"
import { useEffect } from "react"
import axios from "axios"

function App() {

  // useEffect(() => {

  //   const fetchData = async () => {
  //     // let checkDataUser = await axios.get()s


  //   }


  // }, [])


  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chacracterMix" element={<CharacterMix />} />
        <Route path="/lobby" element={<Lobby />} />

      </Routes>

    </>
  )
}

export default App
