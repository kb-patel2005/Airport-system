import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { usercontext } from "../Context/usercontext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getFlight } from "../Slices/flightSlice.js";
import { Helmet } from "react-helmet";

const StreamingFlights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const pageSize = 5;

  const { passenger } = useContext(usercontext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // =========================================
  // FETCH ONLY FIRST PAGE
  // =========================================

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `https://airport-system-api-p7mk.onrender.com/public/allFlights?page=0&size=${pageSize}`
        );

        console.log("Fetched flights:", res.data);

        setFlights(res.data.content || []);
      } catch (err) {
        console.error("Error fetching flights:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  // =========================================
  // BOOK FLIGHT
  // =========================================

  const handleBookFlight = async (flightId) => {
    try {
      if (!passenger || Object.keys(passenger).length === 0) {
        alert("Please sign in as passenger to book a flight.");
        return;
      }

      await dispatch(getFlight(flightId));

      navigate("/flightDetail");
    } catch (error) {
      console.error("Error fetching flight:", error);
    }
  };

  return (
    <>

      <Helmet>
        <title>Flights status and schedules available | Airport System</title>

        <meta
          name="description"
          content="View available flights, schedules, prices, bookings, cancellations, and live updates with Airport System."
        />

        {/* Open Graph */}

        <meta
          property="og:title"
          content="All Flights Dashboard | Airport System"
        />

        <meta
          property="og:description"
          content="View all available flights in one place. Track schedules, prices, bookings, cancellations, and live updates."
        />

        <meta
          property="og:image"
          content="https://airportsystem.netlify.app/hero.webp"
        />

        <meta
          property="og:url"
          content="https://airportsystem.netlify.app/"
        />

        <meta
          property="og:type"
          content="website"
        />

        {/* Twitter */}

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="All Flights Dashboard | Airport System"
        />

        <meta
          name="twitter:description"
          content="View available flights, bookings, cancellations, and live seat updates."
        />

        <meta
          name="twitter:image"
          content="https://airportsystem.netlify.app/hero.webp"
        />

        {/* Canonical */}

        <link
          rel="canonical"
          href="https://airportsystem.netlify.app/flights"
        />

        {/* JSON-LD */}

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            url: "https://airportsystem.netlify.app/",
            name: "All Flights Dashboard | Airport System",
            description:
              "View available flights, schedules, prices, bookings, cancellations, and live updates with Airport System.",
            publisher: {
              "@type": "Person",
              name: "kb patel",
              image: {
                "@type": "ImageObject",
                url: "https://airportsystem.netlify.app/hero.webp",
              },
            },
          })}
        </script>
      </Helmet>

      {/* =========================================
          MAIN SECTION
      ========================================= */}

      <section className="w-full px-4 py-8">

        {/* =========================================
            HEADER
        ========================================= */}

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-extrabold text-slate-800">
            Available Flights
          </h1>

          <p className="mt-2 text-xl font-extrabold text-red-700">
            It is not a real website, it is a demo
          </p>

        </div>

        {/* =========================================
            LOADING
        ========================================= */}

        {loading && (
          <div className="py-10 text-center">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>

            <p className="mt-4 text-sm font-medium text-slate-500">
              Loading flights...
            </p>

          </div>
        )}

        {/* =========================================
            NO FLIGHTS
        ========================================= */}

        {!loading && flights.length === 0 && (
          <div className="mx-auto max-w-5xl rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">

            <div className="text-4xl">
              ✈️
            </div>

            <h2 className="mt-3 text-xl font-bold text-slate-800">
              No Flights Available
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              There are currently no flights available.
            </p>

          </div>
        )}

        {/* =========================================
            FLIGHTS
        ========================================= */}

        {!loading && flights.length > 0 && (
          <div className="flex flex-wrap gap-4">

            {flights.map((flight) => (

              <div
                key={flight.id}
                className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition hover:shadow-xl"
              >

                <div className="flex flex-col items-start justify-between gap-6 p-5 lg:flex-row lg:items-center">

                  {/* =========================================
                      LEFT SECTION
                  ========================================= */}

                  <div className="w-full flex-1">

                    {/* AIRLINE + BOOK BUTTON */}

                    <div className="flex flex-wrap items-center justify-between gap-3">

                      <div>

                        <h2 className="text-2xl font-bold text-slate-800">
                          ✈️ {flight.airline}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                          Flight No: #{flight.id}
                        </p>

                      </div>

                      {/* BOOK BUTTON */}

                      <div className="ml-0 flex w-full flex-col gap-3 sm:w-auto">

                        <button
                          type="button"
                          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
                          onClick={() =>
                            handleBookFlight(flight.id)
                          }
                        >
                          + Book Now
                        </button>

                      </div>

                    </div>

                    {/* =========================================
                        ROUTE
                    ========================================= */}

                    <div className="mt-6 flex flex-wrap items-center gap-4">

                      {/* FROM */}

                      <div>

                        <div className="text-sm text-slate-500">
                          From
                        </div>

                        <div className="text-lg font-bold text-slate-800">
                          {flight.origincity}
                        </div>

                        <div className="text-sm text-slate-500">
                          {flight.originstate},{" "}
                          {flight.origincountry}
                        </div>

                      </div>

                      {/* FLIGHT LINE */}

                      <div className="min-w-[120px] flex-1">

                        <div className="relative h-[2px] bg-slate-300">

                          <div className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-blue-500"></div>

                          <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-blue-500"></div>

                          <div className="absolute left-1/2 -top-4 -translate-x-1/2 rounded-full bg-white px-2 text-xl">
                            ✈️
                          </div>

                        </div>

                      </div>

                      {/* TO */}

                      <div className="text-right">

                        <div className="text-sm text-slate-500">
                          To
                        </div>

                        <div className="text-lg font-bold text-slate-800">
                          {flight.destinationcity}
                        </div>

                        <div className="text-sm text-slate-500">
                          {flight.destinationstate},{" "}
                          {flight.destinationcountry}
                        </div>

                      </div>

                      {/* PRICE */}

                      <div className="ml-0 rounded-2xl bg-green-100 px-4 py-1 sm:ml-4">

                        <div className="text-sm text-green-700">
                          Price
                        </div>

                        <div className="text-lg font-bold text-green-700">
                          ₹
                          {Number(
                            flight.basePrice || 0
                          ).toLocaleString("en-IN")}
                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </section>
    </>
  );
};

export default StreamingFlights;