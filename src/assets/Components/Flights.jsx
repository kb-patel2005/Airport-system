import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { usercontext } from '../Context/usercontext';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFlightInfo } from '../Slices/flightSlice';

const StreamingFlights = () => {
  const [flights, setFlights] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(null);
  const [flag, setFlag] = useState(false);
  const pageSize = 5;
  const { passenger } = useContext(usercontext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch a page when page changes
  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await axios.get(
          `https://airport-system-api-p7mk.onrender.com/allFlights?page=${page}&size=${pageSize}`
        );

        console.log('Fetched flights:', res.data);
        setFlights(prev => [...prev, ...res.data.content]);
        setTotalPages(res.data.totalPages);

        setFlag(true);
      } catch (err) {
        console.error('Error fetching flights:', err);
      }
    };

    if (totalPages === null || page < totalPages) {
      fetchPage();
    }
  }, [page]);

  useEffect(() => {
    if (flag) {
      if (page + 1 < totalPages) {
        setPage(prev => prev + 1);
      }
      setFlag(false);
    }
  }, [flag, totalPages, page]);

  return (
    <div>
      <div className="text-3xl text-center font-extrabold">Available Flights</div>
      <br />
      <div className="flex gap-4 flex-wrap">
        {flights.map(flight => (
          <div
            key={flight.id}
            className="w-full max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 p-5">

              {/* Left Section */}
              <div className="flex-1 w-full">

                <div className="flex items-center justify-between flex-wrap gap-3">

                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      ✈️ {flight.airline}
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      Flight No: #{flight.id}
                    </p>
                  </div>

                  {/* */}

                    <div className="w-full ml-8 lg:w-auto flex flex-col items-stretch gap-3">

                    <button
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold"
                      onClick={async () => {

                        if (Object.keys(passenger).length === 0) {

                          alert('Please sign in as passenger to book a flight.');

                        } else {

                          await dispatch(setFlightInfo(flight));

                          navigate('/flightDetail');
                        }
                      }}
                    >
                      + Book Now
                    </button>

                  </div>

                </div>

                {/* Route */}
                <div className="mt-6 flex items-center gap-4 flex-wrap">

                  {/* Origin */}
                  <div>
                    <div className="text-sm text-slate-500">From</div>

                    <div className="text-lg font-bold text-slate-800">
                      {flight.origincity}
                    </div>

                    <div className="text-sm text-slate-500">
                      {flight.originstate}, {flight.origincountry}
                    </div>
                  </div>

                  {/* Flight Path */}
                  <div className="flex-1 min-w-[120px]">
                    <div className="relative h-[2px] bg-slate-300">

                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500"></div>

                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500"></div>

                      <div className="absolute left-1/2 -top-4 -translate-x-1/2 text-xl bg-white px-2 rounded-full">
                        ✈️
                      </div>

                    </div>
                  </div>

                  {/* Destination */}
                  <div className="text-right">
                    <div className="text-sm text-slate-500">To</div>

                    <div className="text-lg font-bold text-slate-800">
                      {flight.destinationcity}
                    </div>

                    <div className="text-sm text-slate-500">
                      {flight.destinationstate}, {flight.destinationcountry}
                    </div>
                  </div>

                  <div className="bg-green-100 text-green-700 px-4 py-1 ml-8 rounded-2xl">
                    <div className="text-sm">price</div>
                    <div className="text-lg font-bold">₹{flight.price.toLocaleString()}</div>
                    
                  </div> 
                  {/* <div className="w-full ml-8 lg:w-auto flex flex-col items-stretch gap-3">

                    <button
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold"
                      onClick={async () => {

                        if (Object.keys(passenger).length === 0) {

                          alert('Please sign in as passenger to book a flight.');

                        } else {

                          await dispatch(setFlightInfo(flight));

                          navigate('/flightDetail');
                        }
                      }}
                    >
                      Book Now
                    </button>

                  </div> */}

                </div>
              </div>

              {/* Right Section */}


            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreamingFlights;