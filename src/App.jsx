import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './assets/Components/Navbar/Navbar'
import Home from './assets/Components/Home/Home'
import { Outlet } from 'react-router-dom'
import { usercontext } from './assets/Context/usercontext'
import { staffcontext } from './assets/Context/staffcontext'

function App() {
  const [passenger, setPassenger] = useState({});
  const [staff, setstaff] = useState({});

  return (
    <>
      <staffcontext.Provider value={{ staff, setstaff }}>
        <usercontext.Provider value={{ passenger, setPassenger }}>
          <Navbar />
          <Outlet />
        </usercontext.Provider>
      </staffcontext.Provider>
    </>
  )
}

export default App
