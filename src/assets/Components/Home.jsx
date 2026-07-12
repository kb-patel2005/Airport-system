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


      <div className="relative min-h-screen text-gray-800 flex flex-col items-center w-[100%]"  >

        <div className="w-[100%] mx-auto flex flex-col items-center justify-center py-24" style={{ background: 'linear-gradient(#00000000, rgb(153, 203, 230))' }}>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-blue-900">flight booking and flight ticket deals online with us </h1>
          <p className="text-3xl sm:text-5xl font-extrabold text-blue-900">it is not real website, it is a demo </p>

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
