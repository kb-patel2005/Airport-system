import React, { useState, useEffect } from 'react'

import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getFlight, setFlightInfo } from '../Slices/flightSlice';

const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
]
function ComboBoxSearch({ data, from, onSelect }) {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [query, setQuery] = useState('');

  const filteredFlights =
    query === ''
      ? data
      : data.filter((flight) => {
        const originMatch =
          flight.origincity.toLowerCase().includes(query.toLowerCase()) ||
          flight.origincountry.toLowerCase().includes(query.toLowerCase()) ||
          flight.originstate.toLowerCase().includes(query.toLowerCase());

        const destinationMatch =
          flight.destinationcity.toLowerCase().includes(query.toLowerCase()) ||
          flight.destinationcountry.toLowerCase().includes(query.toLowerCase()) ||
          flight.destinationstate.toLowerCase().includes(query.toLowerCase());

        return from ? originMatch : destinationMatch;
      });

  return (
    <Combobox
      value={selectedFlight}
      onChange={(flight) => {
        setSelectedFlight(flight);
        onSelect?.(flight);
      }}
      onClose={() => setQuery('')}
    >
      <div className="border rounded">
        <div className="font-bold p-1 text-sm text-gray-400">{from ? 'From' : 'To'}</div>
        <ComboboxInput
          className="p-1.5 rounded focus:outline-none focus:ring-0 focus:border-transparent"
          aria-label="Flight"
          displayValue={(flight) =>
            flight
              ? from
                ? `${flight.origincity}, ${flight.originstate}, ${flight.origincountry}`
                : `${flight.destinationcity}, ${flight.destinationstate}, ${flight.destinationcountry}`
              : ''
          }
          placeholder={from ? 'From' : 'To'}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <ComboboxOptions anchor="bottom" className="border rounded-lg empty:invisible bg-gray-300">
        {filteredFlights.map((flight) => (
          <ComboboxOption key={flight.id} value={flight} className="p-1 data-focus:bg-blue-100">
            <div>
              <div className="text-md">
                {from ? flight.origincity : flight.destinationcity}
              </div>
              <div className="text-[12px] text-gray-400">
                {from
                  ? `${flight.originstate}, ${flight.origincountry}`
                  : `${flight.destinationstate}, ${flight.destinationcountry}`}
              </div>
            </div>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
}

export default function FlightSearch() {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [flights, setFlights] = useState([]);
  const [pageSize] = useState(3);
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [myFlight, setMyFlight] = useState(null);

  useEffect(() => {
    let cancel = false;
    const fetchAllPages = async () => {
      try {
        let currentPage = 0;
        let totalPagesFetched = null;
        while (!cancel && (totalPagesFetched === null || currentPage < totalPagesFetched)) {
          const res = await axios.get(
            `https://airport-system-api-p7mk.onrender.com/public/allFlights?page=${currentPage}&size=${pageSize}`
          );
          setFlights((prev) => [...prev, ...res.data.content]);
          totalPagesFetched = res.data.totalPages;
          currentPage++;
        }
      } catch (err) {
        console.error('Error fetching flights:', err);
      }
    };
    fetchAllPages();
    return () => {
      cancel = true;
    };
  }, [pageSize]);

  const handleSearch = () => {
    if (!from || !to) {
      alert("Please select both origin and destination");
      return;
    }

    // Find flights that match both origin and destination
    const results = flights.filter(flight =>
      flight.origincity === from.origincity &&
      flight.originstate === from.originstate &&
      flight.origincountry === from.origincountry &&
      flight.destinationcity === to.destinationcity &&
      flight.destinationstate === to.destinationstate &&
      flight.destinationcountry === to.destinationcountry
    );

    setSearchResults(results);
  };

  const fetchFlight = async (id) => {

  } 

  return (
    <div className="flex flex-col mx-auto gap-5 p-6 shadow-2xl rounded-2xl w-fit bg-blue-100">
      
      <div>
        <div className="font-bold text-2xl text-indigo-700">Search flight</div>
        <div className="text-[12px] text-gray-400">enter your origin and destination</div>
      </div>
      <div className="flex gap-3 flex-wrap">
        <ComboBoxSearch data={flights} from={true} onSelect={setFrom} />
        <ComboBoxSearch data={flights} from={false} onSelect={setTo} />
        <button
          className="px-12 py-6 rounded-lg border-2 bg-indigo-700 text-white"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Results section */}
      <div className="mt-6">
        {searchResults.length > 0 ? (<>
          <p className='text-xl font-bold mb-5'>Results</p>
          {searchResults.map(flight => (
            <div key={flight.id} className="bg-gray-100 shadow-2xl p-3 rounded-2xl mb-2">
              <div className='flex gap-5'>
                <div>
                  <div className='text-lg font-bold text-indigo-700'>{flight.origincity}</div>
                  <div className='text-[12px] text-gray-500'>{flight.originstate}, {flight.origincountry}</div>
                </div>
                <div className='text-2xl font-bold text-indigo-700'>
                  →
                </div>
                <div>
                  <div className='text-lg font-bold text-indigo-700'>{flight.destinationcity}</div>
                  <div className='text-[12px] text-gray-500'>{flight.destinationstate}, {flight.destinationcountry}</div>
                </div>
              </div>
              <div className='font-bold mt-3 text-indigo-500'>price: {flight.price}</div>
              <div className='font-bold mt-3 text-indigo-500'>Airline: {flight.airline}</div>
              <button
                className='bg-indigo-700 text-white w-[100%] p-1.5 rounded mt-3'
                onClick={async () => {
                  await dispatch(getFlight(flight.id));
                  navigate('/flightDetail');
                }}
              >Book flight</button>
            </div>
          ))}
        </>) : (
          <div className="text-gray-500">No flights found</div>
        )}
      </div>
    </div>
  );
}
