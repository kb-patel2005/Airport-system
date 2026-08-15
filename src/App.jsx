import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './assets/Components/Navbar'
import { Outlet } from 'react-router-dom'
import { Helmet } from "react-helmet";
import { usercontext } from './assets/Context/usercontext'
import { staffcontext } from './assets/Context/staffcontext'
import ScrollToTop from './assets/Components/ScrollToTop';

function App() {
  useEffect(() => {
    console.log("Initial UI visible at:", performance.now());
  }, []);

  const [passenger, setPassenger] = useState({});
  const [staff, setstaff] = useState({});


  return (
    <>
      <Helmet>
        <title>flight System management Syconnect</title>
        <meta
          name="description"
          content="Airport System — book flights, manage tickets, and track flights in real time.with give seat map and flight status tracking."
        />
        <meta name="keywords" content="flight booking, flight ticket, airport system, live flight tracking" />
       
      </Helmet>
      <staffcontext.Provider value={{ staff, setstaff }}>
        <usercontext.Provider value={{ passenger, setPassenger }}>
          <header>
            <Navbar />
          </header>
          <ScrollToTop />
          <main>
            <Outlet />
          </main>
        </usercontext.Provider>
      </staffcontext.Provider>
    </>
  )
}

export default App
