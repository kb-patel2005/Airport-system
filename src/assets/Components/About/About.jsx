import React from 'react';

const About = () => {
  return (

    <div className="min-h-screen text-gray-800 flex flex-col items-center">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 text-center w-full max-w-[1080px]">
        <h1 className="text-5xl font-bold text-blue-900 animate-bounce">
          SkyConnect Airport Services
        </h1>
        <p className="mt-6 text-lg max-w-2xl">
          Your trusted travel companion — making every journey smooth,
          personalized, and stress-free.
        </p>
        <div className="mt-10">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105">
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-[1080px] px-10 py-16">
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-12">
          ✨ Our Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
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

      {/* Animated Journey Timeline */}
      <section className="w-full max-w-[1080px] px-10 py-16 bg-blue-50 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">
          Your Journey With Us
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          {["Login", "Book Flight", "Choose Seat", "Fly"].map((step, i) => (
            <div key={i} className="flex flex-col items-center animate-pulse">
              <div className="w-20 h-20 flex items-center justify-center bg-blue-600 text-white rounded-full shadow-lg">
                {i + 1}
              </div>
              <p className="mt-4 font-medium">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 text-center bg-blue-700 text-white mt-10">
        <p>© 2025 SkyConnect Airport Services. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
