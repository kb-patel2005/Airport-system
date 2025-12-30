import React, { useEffect } from 'react'
import './Home.css'
import Navbar from '../Navbar/Navbar'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import Spline from '@splinetool/react-spline';


export default function Home() {

  const selector = useSelector(state => state.staff);


  return (
    // <>
    //     <div className='home-container text-center space-y-6 p-6 sm:p-12 bg-gradient-to-br from-white via-sky-100 to-blue-200 rounded-lg shadow-xl'>
    //         <h1 className='text-4xl sm:text-5xl text-blue-600 font-extrabold animate-pulse'>✈ Ready to fly</h1>
    //         <p className='text-2xl text-[oklch(0.72 0.16 258.53)] font-bold'>Welcome to the Airport!</p>

    //         {/* Animated Tagline */}
    //         <p className='text-lg italic text-blue-500 font-medium'>Your journey begins here...</p>

    //         {/* Feature Highlights */}
    //         <div className='flex flex-wrap justify-center gap-4 text-sm sm:text-base'>
    //             <span className='bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium shadow-sm'>Fast Check-In</span>
    //             <span className='bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium shadow-sm'>Real-Time Flight Updates</span>
    //             <span className='bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium shadow-sm'>24/7 Support</span>
    //         </div>

    //         {/* Call to Action */}
    //         <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-4xl transition-transform transform hover:scale-105'>
    //             <Link to='/signin'>Book a Flight</Link>
    //         </button>

    //         {/* Decorative Divider */}
    //         <div className='w-1/2 mx-auto border-t-2 border-blue-300'></div>

    //         {/* Footer Note */}
    //         <p className='text-sm text-gray-500 font-medium'>Safe travels and smooth skies ahead!</p>
    //     </div>
    // </>
    <div className="relative min-h-screen text-gray-800 flex flex-col items-center w-[100%]"  >
      {/* Hero Section */}
      {/* <div className='flex flex-wrap justify-center items-center w-full min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-100 overflow-hidden' style={{background: 'linear-gradient(#00000000, rgb(153, 203, 230))'}}> */}
      <section className="w-[100%] flex flex-col items-center justify-center py-24 text-center" style={{ background: 'linear-gradient(#00000000, rgb(153, 203, 230))' }}>
        <div className='z-20 text-center'>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-blue-900 animate-bounce">
            Welcome to SkyConnect ✈️
          </h1>

          <p className="mt-6 text-xl max-w-3xl">
            Experience seamless booking, personalized seat selection, and 24×7 support — all in one place.
          </p>

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
      <div className='absolute top-0 z-10 w-full max-w-[1080px] h-[400px] md:h-[500px] lg:h-[600px]'>
        <Spline scene="https://prod.spline.design/1dvOIedESZf9Al1z/scene.splinecode" />

      </div>
      {/* </div> */}
      {/* import Spline from '@splinetool/react-spline/next'; */}



      {/* <Spline scene="https://prod.spline.design/1dvOIedESZf9Al1z/scene.splinecode" /> */}


     <Spline scene="https://prod.spline.design/5KtnTLVrgrgTFPGG/scene.splinecode" />
 




      {/* Features Section */}
      <section className="w-full px-10 py-16" style={{ background: 'linear-gradient(rgb(153, 203, 230),#00000000)' }}>
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-12">
          ✨ Our Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-[1080px] mx-auto">
          <div className="p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 bg-white/30 backdrop-blur-md">
            <h3 className="text-6xl font-semibold text-center text-blue-700">🕐</h3>
            <h3 className="text-2xl  text-center font-semibold text-blue-700">24×7 Support</h3>
            <p className="mt-4">
              Our team is always available to assist you, day or night.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 bg-white/30 backdrop-blur-md">
            <h3 className="text-6xl font-semibold text-center text-blue-700">🔑</h3>
            <h3 className="text-2xl font-semibold text-center text-blue-700">Login & Signup</h3>
            <p className="mt-4">
              Secure and simple access to your account with personalized dashboard.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 bg-white/30 backdrop-blur-md">
            <h3 className="text-6xl font-semibold text-center text-blue-700">💺</h3>
            <h3 className="text-2xl text-center font-semibold text-blue-700">Seat Selection</h3>
            <p className="mt-4">
              Choose your favorite seat in business or economy class with an
              interactive seat map.
            </p>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="w-full max-w-[1080px] px-10 py-20 text-center">
        <h2 className="text-4xl font-bold text-blue-800 mb-6">
          Ready to Take Off?
        </h2>
        <p className="text-lg mb-10">
          Sign up today and enjoy a smooth, personalized travel experience with SkyConnect.
        </p>
        <button className="px-10 py-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105">
          <Link to="/signup">Get Started Now</Link>
        </button>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 text-center bg-blue-700 text-white mt-10">
        <p>© 2025 SkyConnect Airport Services. All rights reserved.</p>
      </footer>
    </div>

  )
}
