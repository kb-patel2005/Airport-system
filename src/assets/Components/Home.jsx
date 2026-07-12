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
        <title>flight booking and flight ticket deals online with us </title>
        <meta
          name="description"
          content="flight airlines with that flight booking information, flight schedule, flight price, flight seat map,live flight status (flight tracker) and flight status information, flight deals update"
        />
        <meta
          name="keywords"
          content="flight booking, flight ticket, flight deals, flight schedule, flight seat map, flight status, airport system, live flight tracking"
        />

        <meta property="og:title" content="flight booking and flight ticket deals online with us " />
        <meta property="og:description" content="flight airlines with that flight booking information, flight schedule, flight price, flight seat, flight status map and flight status information, flight deals update" />
        <meta property="og:image" content="https://airportsystem.netlify.app/flight_system.png" />
        <meta property="og:url" content="https://airportsystem.netlify.app/" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Book Flights Online | Live Seat Updates & Tracking" />
        <meta name="twitter:description" content="flight airlines with that flight booking information, flight schedule, flight price, flight seat, flight status map and flight status information, flight deals update" />
        <meta name="twitter:image" content="https://airportsystem.netlify.app/flight_system.png" />

        <link rel="canonical" href="https://airportsystem.netlify.app/" />
      </Helmet>
      <div className="relative min-h-screen text-gray-800 flex flex-col items-center w-[100%]"  >

        <div className="w-[100%] mx-auto flex flex-col items-center justify-center py-24" style={{ background: 'linear-gradient(#00000000, rgb(153, 203, 230))' }}>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-blue-900">flight booking and flight ticket deals online with us </h1>
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

      </div>
    </>
  )
}
