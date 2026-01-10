import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';

export default function Ourfeature() {
    useEffect(() => {
    console.log("Ourfeature lazy component mounted at:", performance.now());
  }, []);

  return (
    <>
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
      <section className="w-full max-w-[1080px] px-10 py-20 text-center">
        <h2 className="text-4xl font-bold text-blue-800 mb-6">Ready to Take Off?</h2>
        <p className="text-lg mb-10">Sign up today and enjoy a smooth, personalized travel experience with SkyConnect.</p>
        <button className="px-10 py-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105">
          <Link to="/signup">Get Started Now</Link>
        </button>
      </section>
      <footer className="w-full py-8 text-center bg-blue-700 text-white mt-10">
        <p>© 2025 SkyConnect Airport Services. All rights reserved.</p>
      </footer>
      </>

  )
}
