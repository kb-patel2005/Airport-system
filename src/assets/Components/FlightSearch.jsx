import React, { useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFlight } from "../Slices/flightSlice";

const API_URL =
  "https://airport-system-api-p7mk.onrender.com/public/allFlights";

function ComboBoxSearch({ data, from, onSelect }) {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [query, setQuery] = useState("");

  const filteredFlights =
    query === ""
      ? data
      : data.filter((flight) => {
          const searchQuery = query.toLowerCase();

          const originMatch =
            flight.origincity?.toLowerCase().includes(searchQuery) ||
            flight.origincountry?.toLowerCase().includes(searchQuery) ||
            flight.originstate?.toLowerCase().includes(searchQuery);

          const destinationMatch =
            flight.destinationcity
              ?.toLowerCase()
              .includes(searchQuery) ||
            flight.destinationcountry
              ?.toLowerCase()
              .includes(searchQuery) ||
            flight.destinationstate
              ?.toLowerCase()
              .includes(searchQuery);

          return from ? originMatch : destinationMatch;
        });

  return (
    <Combobox
      value={selectedFlight}
      onChange={(flight) => {
        setSelectedFlight(flight);
        onSelect?.(flight);
      }}
      onClose={() => setQuery("")}
    >
      <div className="relative">
        {/* MAIN COMBOBOX */}
        <div className="rounded-xl border border-gray-300 bg-white px-4 py-2 transition focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100">
          {/* TITLE */}
          <div className="text-xs font-semibold text-gray-500">
            {from ? "From" : "To"}
          </div>

          {/* INPUT */}
          <ComboboxInput
            id={from ? "from-flight" : "to-flight"}
            aria-label={from ? "From airport" : "To airport"}
            displayValue={(flight) =>
              flight
                ? from
                  ? `${flight.origincity}, ${flight.originstate}, ${flight.origincountry}`
                  : `${flight.destinationcity}, ${flight.destinationstate}, ${flight.destinationcountry}`
                : ""
            }
            placeholder={
              from
                ? "Select departure city"
                : "Select destination city"
            }
            onChange={(event) => setQuery(event.target.value)}
            className="w-full border-0 bg-transparent p-0 pt-1 text-sm font-medium text-gray-900 outline-none focus:border-0 focus:outline-none focus:ring-0"
          />
        </div>

        {/* OPTIONS */}
        <ComboboxOptions className="absolute left-0 right-0 z-50 mt-2 max-h-72 overflow-auto rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
          {filteredFlights.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500">
              No location found
            </div>
          ) : (
            filteredFlights.map((flight) => (
              <ComboboxOption
                key={`${flight.id}-${from ? "from" : "to"}`}
                value={flight}
                className="cursor-pointer rounded-lg px-4 py-3 data-[focus]:bg-indigo-50"
              >
                <div className="font-semibold text-gray-900">
                  {from
                    ? flight.origincity
                    : flight.destinationcity}
                </div>

                <div className="mt-1 text-xs text-gray-500">
                  {from
                    ? `${flight.originstate}, ${flight.origincountry}`
                    : `${flight.destinationstate}, ${flight.destinationcountry}`}
                </div>
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
}

export default function FlightSearch() {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  const [flights, setFlights] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*
   * =====================================================
   * FETCH FLIGHTS ONLY WHEN USER CLICKS SEARCH
   * =====================================================
   */
  const handleSearch = async () => {
    if (!from || !to) {
      alert("Please select both origin and destination");
      return;
    }

    try {
      setLoading(true);
      setSearched(true);
      setSearchResults([]);

      /*
       * Fetch first page only.
       *
       * IMPORTANT:
       * We are no longer fetching all pages when
       * Home component loads.
       */
      const response = await axios.get(API_URL, {
        params: {
          page: 0,
          size: 20,
        },
      });

      const fetchedFlights = response.data?.content || [];

      setFlights(fetchedFlights);

      /*
       * Filter flights after API response
       */
      const results = fetchedFlights.filter(
        (flight) =>
          flight.origincity === from.origincity &&
          flight.originstate === from.originstate &&
          flight.origincountry === from.origincountry &&
          flight.destinationcity === to.destinationcity &&
          flight.destinationstate === to.destinationstate &&
          flight.destinationcountry === to.destinationcountry
      );

      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching flights:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  /*
   * =====================================================
   * BOOK FLIGHT
   * =====================================================
   */
  const handleBookFlight = async (flightId) => {
    try {
      await dispatch(getFlight(flightId));
      navigate("/flightDetail");
    } catch (error) {
      console.error("Error fetching flight:", error);
    }
  };

  return (
    <section
      id="flight-search"
      className="w-full bg-white px-4 py-16 sm:px-6"
    >
      {/* =====================================
          1100px CONTAINER
      ===================================== */}

      <div className="mx-auto w-full max-w-[1100px]">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-700">
            Search Flight
          </h1>

          <p className="mt-2 text-sm font-semibold text-red-600">
            It gives demo results, not real ones.
          </p>

          <p className="mt-1 text-sm text-gray-600">
            Enter your origin and destination to find
            available flights.
          </p>
        </div>

        {/* =====================================
            SEARCH BOX
        ===================================== */}

        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-sm sm:p-6">

          <div className="grid gap-5 md:grid-cols-[1fr_1fr_auto] md:items-end">

            {/* FROM */}

            <ComboBoxSearch
              data={flights}
              from={true}
              onSelect={setFrom}
            />

            {/* TO */}

            <ComboBoxSearch
              data={flights}
              from={false}
              onSelect={setTo}
            />

            {/* SEARCH BUTTON */}

            <button
              type="button"
              onClick={handleSearch}
              disabled={loading}
              className="h-[48px] rounded-xl bg-indigo-700 px-10 font-semibold text-white shadow-sm transition hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]"
            >
              {loading ? "Searching..." : "Search"}
            </button>

          </div>
        </div>

        {/* =====================================
            LOADING
        ===================================== */}

        {loading && (
          <div className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50 px-6 py-8 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-700" />

            <p className="mt-3 text-sm font-medium text-indigo-700">
              Searching available flights...
            </p>
          </div>
        )}

        {/* =====================================
            RESULTS
        ===================================== */}

        {!loading && searched && (
          <div className="mt-10">

            {searchResults.length > 0 ? (
              <>

                {/* RESULTS HEADER */}

                <div className="mb-5 flex items-center justify-between">

                  <h2 className="text-xl font-bold text-gray-900">
                    Search Results
                  </h2>

                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
                    {searchResults.length}{" "}
                    {searchResults.length === 1
                      ? "Flight"
                      : "Flights"}
                  </span>

                </div>

                {/* RESULTS GRID */}

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                  {searchResults.map((flight) => (

                    <div
                      key={flight.id}
                      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >

                      {/* ROUTE */}

                      <div className="flex items-center justify-between gap-3">

                        {/* FROM */}

                        <div className="min-w-0">

                          <p className="truncate text-lg font-bold text-indigo-700">
                            {flight.origincity}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {flight.originstate},{" "}
                            {flight.origincountry}
                          </p>

                        </div>

                        {/* ARROW */}

                        <div className="flex shrink-0 items-center">

                          <div className="h-px w-6 bg-gray-300" />

                          <span className="px-1 text-xl font-bold text-indigo-600">
                            →
                          </span>

                          <div className="h-px w-6 bg-gray-300" />

                        </div>

                        {/* TO */}

                        <div className="min-w-0 text-right">

                          <p className="truncate text-lg font-bold text-indigo-700">
                            {flight.destinationcity}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {flight.destinationstate},{" "}
                            {flight.destinationcountry}
                          </p>

                        </div>

                      </div>

                      {/* DIVIDER */}

                      <div className="my-5 border-t border-gray-100" />

                      {/* PRICE */}

                      <div className="flex items-center justify-between">

                        <span className="text-sm text-gray-500">
                          Price
                        </span>

                        <span className="text-lg font-bold text-indigo-700">
                          ₹{flight.price}
                        </span>

                      </div>

                      {/* AIRLINE */}

                      <div className="mt-3 flex items-center justify-between">

                        <span className="text-sm text-gray-500">
                          Airline
                        </span>

                        <span className="text-sm font-semibold text-gray-800">
                          {flight.airline}
                        </span>

                      </div>

                      {/* BOOK BUTTON */}

                      <button
                        type="button"
                        onClick={() =>
                          handleBookFlight(flight.id)
                        }
                        className="mt-5 w-full rounded-xl bg-indigo-700 px-4 py-3 font-semibold text-white transition hover:bg-indigo-800 active:scale-[0.98]"
                      >
                        Book Flight
                      </button>

                    </div>

                  ))}

                </div>
              </>
            ) : (
              /* NO RESULTS */

              <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">

                <div className="text-4xl">
                  ✈️
                </div>

                <h3 className="mt-3 text-lg font-bold text-gray-800">
                  No Flights Found
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  No flights are available for the selected
                  route.
                </p>

              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}
