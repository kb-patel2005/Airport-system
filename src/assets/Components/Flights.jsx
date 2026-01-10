import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { usercontext } from '../Context/usercontext';
import { useNavigate } from 'react-router-dom';


const StreamingFlights = () => {

  const [flights, setFlights] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(null);
  const pageSize = 1;

  const {passenger, setPassenger} = useContext(usercontext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (totalPages !== null && page >= totalPages) {
        clearInterval(interval); // Stop when all pages are fetched
        return;
      }

      axios.get(`https://airport-system-api-p7mk.onrender.com/allFlights?page=${page}&size=${pageSize}`)
        .then(res => {
          const newData = res.data.content;
          setFlights(prev => [...prev, ...newData]);
          setPage(prev => prev + 1);
          setTotalPages(res.data.totalPages); // Set total pages from API response
        })
        .catch(err => {
          console.error('Error fetching page:', err);
          clearInterval(interval); // Stop on error
        });
    }, 500);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [page, totalPages]);

  return (
    <div>
      <div className='text-3xl text-center font-extrabold'>Availble Flight</div>
      <br />
      <div className='flex gap-4 flex-wrap'>
        {flights.map((flight, index) => (
          <div className="relative w-full max-w-[350px] mx-auto aspect-[5/4] bg-blue-200 rounded-xl shadow-lg overflow-hidden" key={flight.flightId}>
            <div className="absolute w-28 h-28 left-[18%] top-[20%] rotate-[-0.71deg] bg-gradient-to-b from-cyan-200 to-blue-400 rounded-full" />
            <div className="absolute w-24 h-24 left-[50%] top-[60%] rotate-[-0.71deg] bg-gradient-to-b from-cyan-200 to-blue-400 rounded-full" />
            <div className="absolute w-16 h-16 right-[10%] top-[30%] bg-gradient-to-b from-cyan-200 to-blue-400 rounded-full" />
            <div className="absolute w-20 h-20 right-[10%] bottom-[10%] bg-gradient-to-b from-cyan-200 to-blue-400 rounded-full" />
            <div className="absolute w-14 h-14 left-[26%] bottom-[8%] bg-gradient-to-b from-cyan-200 to-blue-400 rounded-full" />
            <div className="absolute w-12 h-12 left-[45%] top-[45%] bg-gradient-to-b from-cyan-200 to-blue-400 rounded-full" />
            <div className="relative z-10 p-6 flex flex-col justify-between h-full">
              <h2 className="text-2xl font-semibold text-gray-800">{flight.airline}</h2>
              <p className="font-medium text-gray-700">flight No.: {flight.flightId}</p>
              <p className="font-medium text-gray-700">Origin: {flight.origincountry}, {flight.originstate}, {flight.origincity}</p>
              <p className="font-medium text-gray-700">Destination: {flight.destinationcountry} , {flight.destinationstate}, {flight.destinationcity}</p>
              <p className="font-medium text-gray-700">Ticket Price: {flight.price}</p>
              <button className="mt-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                onClick={async() => {
                  if ( Object.keys(passenger).length === 0 ) {
                    alert("Please sign in as passenger to book a flight.") 
                  } else {
                    navigate("/flightSeats",{state:flight});
                  }
                }}>
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
