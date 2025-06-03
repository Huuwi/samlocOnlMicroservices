import './App.css'
import { Routes, Route } from "react-router-dom"
import LoginPage from './pages/common/LoginPage/LoginPage'
import CharacterMix from './pages/lobby/CharacterMix/CharacterMix'

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chacracterMix" element={<CharacterMix />} />

      </Routes>

    </>
  )
}

export default App
