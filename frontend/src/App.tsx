import { Routes, Route, useNavigate } from "react-router-dom"
import LoginPage from './pages/auth/LoginPage/LoginPage'
import CharacterMix from './pages/lobby/CharacterMix/CharacterMix'
import Lobby from "./pages/lobby/Lobby/Lobby"
import { useEffect } from "react"
import axios from "axios"
import { envVars } from "./constants"
import RegisterPage from "./pages/auth/RegisterPage/RegisterPage"

function App() {
  const navigate = useNavigate()

  useEffect(() => {

    const fetchData = async () => {

      try {
        let data = (await axios.get(envVars.VITE_API_GATE_WAY_URL + "/userService/api/user/getInforOwn", {
          withCredentials: true
        })).data
        const userData = data.userFound
        const customItems = data.customItems
        localStorage.setItem("userData", JSON.stringify(userData))
        if (customItems) {
          localStorage.removeItem("customItems")
          localStorage.setItem("customItems", JSON.stringify(customItems))
        }
        // navigate("/chacracterMix")
      } catch (error) {
        console.log("err when getInforOwn : ", error)
        navigate("/login")
      }

    }
    fetchData()

  }, [])


  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/characterMix" element={<CharacterMix />} />
        <Route path="/lobby" element={<Lobby />} />

      </Routes>

    </>
  )
}

export default App
