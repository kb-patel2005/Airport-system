import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import FlightSearch from './FlightSearch';
import { Helmet } from 'react-helmet';
const Ourfeature = React.lazy(() => import('./Ourfeature'));

export default function Home() {

  const selector = useSelector(state => state.staff);
  return (
    <>
      <Helmet>
        {/* Meta tags */}
        <title>Flight booking and flight ticket deals online with us</title>
        <meta
          name="description"
          content="Book flights online with live seat updates, seat maps, real-time flight tracking, and the best ticket deals."
        />
        <meta
          name="keywords"
          content="flight booking, flight ticket, flight deals, flight schedule, flight seat map, flight status, airport system, live flight tracking"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Flight booking and flight ticket deals online with us" />
        <meta property="og:description" content="Book flights online with live seat updates, seat maps, real-time flight tracking, and the best ticket deals." />
        <meta property="og:image" content="https://airportsystem.netlify.app/flight_system.png" />
        <meta property="og:url" content="https://airportsystem.netlify.app/" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Book Flights Online | Live Seat Updates & Tracking" />
        <meta name="twitter:description" content="Book flights online with live seat updates, seat maps, real-time flight tracking, and the best ticket deals." />
        <meta name="twitter:image" content="https://airportsystem.netlify.app/flight_system.png" />

        {/* Canonical */}
        <link rel="canonical" href="https://airportsystem.netlify.app/" />

        {/* JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://airportsystem.netlify.app/",
            "name": "Airport System",
            "publisher": {
              "@type": "Person",
              "name": "kb patel",
              "image": {
                "@type": "ImageObject",
                "url": "https://airportsystem.netlify.app/flight_system.png"
              }
            }
          })}
        </script>
      </Helmet>


      {/* <div className="relative min-h-screen text-gray-800 flex flex-col items-center w-[100%]"  >

        <div className="w-[100%] mx-auto flex flex-col items-center justify-center py-24" style={{ background: 'linear-gradient(#00000000, rgb(153, 203, 230))' }}>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-blue-900">flight booking and flight ticket deals online with us </h1>
          <p className="text-xl font-extrabold text-red-700">it is not real website, it is a demo </p>

          <p className="mt-3 text-sm">Experience seamless flight booking, personalized flight seat map, flight deals and 24 × 7 support — all in one place.</p>
          <div className="mt-10 flex gap-6">
            <Link
              to={selector.passenger ? "/AddFlight" : "/Signup"}
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {selector.passenger ? "Add Flight" : "Get Started"}
            </Link>

            <Link
              to="/flights"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg shadow-lg hover:bg-gray-100 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Browse Flights →
            </Link>
          </div>
        </div>

        <Suspense fallback={<p>Our Features</p>}><Ourfeature /></Suspense>

      </div> */}

      <div className="min-h-screen flex flex-col text-gray-800">
        {/* Hero Section with Image */}
        <section className="relative w-full">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-20 gap-10">
            {/* Left Content */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">
                ✈️ Your Gateway to Easy Travel
              </h1>
              <p className="mt-4 text-sm text-gray-700 max-w-xl">
                Book flights effortlessly, explore exclusive deals, and enjoy 24×7 support — all in one place.
              </p>
              <div className="mt-8 flex gap-6 justify-center md:justify-start">
                <Link
                  to={selector.passenger ? "/AddFlight" : "/Signup"}
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {selector.passenger ? "Add Flight" : "Get Started"}
                </Link>
                <Link
                  to="/flights"
                  className="px-8 py-4 bg-white text-blue-600 rounded-lg shadow-lg hover:bg-gray-100 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Browse Flights →
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex-1 flex justify-center">
              <img
                src={`/flight_system.png`} // replace with your actual image path
                alt="Travel illustration"
                className="w-full max-w-md hover:scale-105 transition"
              />
            </div>
          </div>
        </section>

        {/* Flight Search Section */}
        <Suspense fallback={<p>Loading Flight Search...</p>}>
          <section className="w-full px-10 py-16 ">
            <FlightSearch />
          </section>
        </Suspense>

        {/* Features Section */}
        <section className="w-full px-10 py-16">
          <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-12">✨ Our Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <FeatureCard icon="🔒" title="Secure Account" text="Your data is protected with top security." />
            <FeatureCard icon="💎" title="Exclusive Deals" text="Get access to special offers and discounts." />
            <FeatureCard icon="📞" title="24/7 Support" text="We’re here to help you anytime." />
            <FeatureCard icon="✈️" title="Easy Travel" text="Simple steps to book your seats." />
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="w-full text-center px-10 py-20">
          <h2 className="text-4xl font-bold text-blue-800 mb-6">Ready to Take Off?</h2>
          <p className="text-lg text-gray-700 mb-10">
            Sign up today and enjoy a smooth, personalized travel experience with SkyConnect.
          </p>
          <Link
            to="/signup"
            className="inline-block px-10 py-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Get Started Now
          </Link>
        </section>

        {/* Footer */}
        <footer className="w-full py-8 text-center bg-blue-700 text-white mt-10">
          <p>© 2025 SkyConnect Airport Services. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="flex shadow-md rounded-xl p-4 hover:shadow-xl hover:scale-105 transition">
      <span className="text-4xl mx-2.5">{icon}</span>
      <div>
        <h3 className="text-md font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 ">{text}</p>
      </div>
    </div>
  )
}
