import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { usercontext } from '../Context/usercontext';
import { useNavigate } from 'react-router-dom';

const StreamingFlights = () => {
  const [flights, setFlights] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(null);
  const [flag, setFlag] = useState(false); // flag to trigger next fetch
  const pageSize = 5; // adjust per your needs
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

        setFlights(prev => [...prev, ...res.data.content]);
        setTotalPages(res.data.totalPages);

        // After rendering this page, raise the flag
        setFlag(true);
      } catch (err) {
        console.error('Error fetching flights:', err);
      }
    };

    if (totalPages === null || page < totalPages) {
      fetchPage();
    }
  }, [page]);

  // When flag is raised, move to next page
  useEffect(() => {
    if (flag) {
      if (page + 1 < totalPages) {
        setPage(prev => prev + 1);
      }
      setFlag(false); // reset flag
    }
  }, [flag, totalPages, page]);

  return (
    <div>
      <div className="text-3xl text-center font-extrabold">Available Flights</div>
      <br />
      <div className="flex gap-4 flex-wrap">
        {flights.map(flight => (
          <div
            className="relative w-full max-w-[350px] mx-auto aspect-[5/4] bg-blue-200 rounded-xl shadow-lg overflow-hidden"
            key={flight.flightId}
          >
            <div className="relative z-10 p-6 flex flex-col justify-between h-full">
              <h2 className="text-2xl font-semibold text-gray-800">{flight.airline}</h2>
              <p className="font-medium text-gray-700">Flight No.: {flight.flightId}</p>
              <p className="font-medium text-gray-700">
                Origin: {flight.origincountry}, {flight.originstate}, {flight.origincity}
              </p>
              <p className="font-medium text-gray-700">
                Destination: {flight.destinationcountry}, {flight.destinationstate}, {flight.destinationcity}
              </p>
              <p className="font-medium text-gray-700">Ticket Price: {flight.price}</p>
              <button
                className="mt-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                onClick={() => {
                  if (Object.keys(passenger).length === 0) {
                    alert('Please sign in as passenger to book a flight.');
                  } else {
                    navigate('/flightSeats', { state: flight });
                  }
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreamingFlights;