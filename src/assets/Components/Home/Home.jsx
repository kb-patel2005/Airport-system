import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
const Animation = React.lazy(() => import('./Animation'));
import { Suspense } from 'react';
const Ourfeature = React.lazy(() => import('../Ourfeature'));

export default function Home() {

  const selector = useSelector(state => state.staff);
  return (
    <div className="relative min-h-screen text-gray-800 flex flex-col items-center w-[100%]"  >
      
      <section className="w-[100%] flex flex-col items-center justify-center py-24 text-center" style={{ background: 'linear-gradient(#00000000, rgb(153, 203, 230))' }}>
        <div className='z-20 text-center'>
          <p className="text-4xl sm:text-6xl font-extrabold text-blue-900">Welcome to SkyConnect ✈️</p>
          <p className="m-3 text-xl">Experience seamless booking, personalized seat selection, and 24×7 support — all in one place.</p>
          <div className="mt-10 flex justify-center align-middle gap-6">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105">
              {Object.keys(selector.passenger).length === 0 || selector.passenger === null || selector.passenger === undefined ? <Link to="/signup">Get Started</Link> : <Link to="/AddFlight">Add Flight</Link>}
            </button>
            <button className="px-8 py-4 bg-white text-blue-600 rounded-lg shadow-lg hover:bg-gray-100 transition transform hover:scale-105">
              <Link to="/flights">Browse Flights</Link>
            </button>
          </div>
        </div>
      </section>
      <Suspense fallback={<></>}><Animation /></Suspense>
      <Suspense fallback={<h1>Our Features</h1>}><Ourfeature /></Suspense>
    </div>
  )
}
