import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './assets/Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { usercontext } from './assets/Context/usercontext'
import { staffcontext } from './assets/Context/staffcontext'

function App() {
  useEffect(() => {
    console.log("Initial UI visible at:", performance.now());
  }, []);

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
