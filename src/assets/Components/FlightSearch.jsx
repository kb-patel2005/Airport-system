import React, { useEffect, useMemo, useState } from "react";
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

/* =========================================================
   ICONS
========================================================= */

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function PlaneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <path d="m3 12 18-7-5 7 5 7-18-7Z" />
      <path d="M10 10v-6" />
      <path d="M10 14v6" />
    </svg>
  );
}

function SwapIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path d="M7 7h10l-3-3" />
      <path d="m17 7-3 3" />
      <path d="M17 17H7l3 3" />
      <path d="m7 17 3-3" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className="h-4 w-4"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/* =========================================================
   LOCATION COMBOBOX
========================================================= */

function LocationCombobox({
  flights,
  value,
  onChange,
  from,
  disabled = false,
}) {
  const [query, setQuery] = useState("");

  /*
   * Create unique locations.
   *
   * This prevents the dropdown from showing the same
   * airport/city multiple times.
   */

  const locations = useMemo(() => {
    const map = new Map();

    flights.forEach((flight) => {
      const city = from
        ? flight.origincity
        : flight.destinationcity;

      const state = from
        ? flight.originstate
        : flight.destinationstate;

      const country = from
        ? flight.origincountry
        : flight.destinationcountry;

      if (!city) return;

      const key = `${city}-${state}-${country}`;

      if (!map.has(key)) {
        map.set(key, {
          id: key,
          city,
          state,
          country,
        });
      }
    });

    return Array.from(map.values());
  }, [flights, from]);

  const filteredLocations = useMemo(() => {
    if (!query.trim()) {
      return locations.slice(0, 10);
    }

    const search = query.toLowerCase();

    return locations
      .filter((location) => {
        return (
          location.city?.toLowerCase().includes(search) ||
          location.state?.toLowerCase().includes(search) ||
          location.country?.toLowerCase().includes(search)
        );
      })
      .slice(0, 10);
  }, [locations, query]);

  return (
    <Combobox
      value={value}
      onChange={(location) => {
        onChange(location);
        setQuery("");
      }}
      onClose={() => setQuery("")}
      disabled={disabled}
    >
      <div className="relative">
        <ComboboxInput
          aria-label={from ? "Departure location" : "Destination location"}
          displayValue={(location) =>
            location
              ? `${location.city}, ${location.country}`
              : ""
          }
          onChange={(event) => setQuery(event.target.value)}
          placeholder={
            from
              ? "Select departure"
              : "Select destination"
          }
          className="h-[52px] w-full border-0 bg-transparent pr-7 text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400 focus:outline-none focus:ring-0"
        />

        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-slate-400">
          <ChevronIcon />
        </div>

        <ComboboxOptions className="absolute left-0 right-0 top-[60px] z-[100] max-h-[280px] overflow-y-auto rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_15px_40px_rgba(0,0,0,0.15)]">
          {filteredLocations.length === 0 ? (
            <div className="px-4 py-5 text-center">
              <LocationIcon />

              <p className="mt-2 text-sm font-semibold text-slate-700">
                No location found
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Try another city or country
              </p>
            </div>
          ) : (
            filteredLocations.map((location) => (
              <ComboboxOption
                key={location.id}
                value={location}
                className="group cursor-pointer rounded-xl px-3 py-3 data-[focus]:bg-[#EAF9FA]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF9FA] text-[#27A3AC]">
                    <LocationIcon />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-800">
                      {location.city}
                    </p>

                    <p className="truncate text-xs text-slate-500">
                      {location.state}, {location.country}
                    </p>
                  </div>

                  <div className="hidden text-[#27A3AC] group-data-[selected]:block">
                    <CheckIcon />
                  </div>
                </div>
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
}

/* =========================================================
   FLIGHT CARD
========================================================= */

function FlightCard({ flight, onBook }) {
  return (
    <article className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_8px_25px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(15,23,42,0.12)]">
      {/* Airline */}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF9FA] text-[#27A3AC]">
            <PlaneIcon />
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Airline
            </p>

            <p className="text-sm font-bold text-slate-800">
              {flight.airline || "Krish Airline"}
            </p>
          </div>
        </div>

        <span className="rounded-full bg-[#EAF9FA] px-3 py-1 text-[11px] font-bold text-[#19808A]">
          Available
        </span>
      </div>

      {/* Route */}

      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-lg font-extrabold text-[#1397A1]">
            {flight.origincity}
          </p>

          <p className="mt-1 truncate text-xs text-slate-500">
            {flight.originstate}, {flight.origincountry}
          </p>
        </div>

        <div className="flex min-w-[70px] flex-1 items-center justify-center">
          <div className="h-px flex-1 bg-slate-200" />

          <div className="mx-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EAF9FA] text-[#27A3AC]">
            <ArrowIcon />
          </div>

          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <div className="min-w-0 text-right">
          <p className="truncate text-lg font-extrabold text-[#1397A1]">
            {flight.destinationcity}
          </p>

          <p className="mt-1 truncate text-xs text-slate-500">
            {flight.destinationstate},{" "}
            {flight.destinationcountry}
          </p>
        </div>
      </div>

      {/* Divider */}

      <div className="my-5 border-t border-dashed border-slate-200" />

      {/* Bottom */}

      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs text-slate-400">
            Starting from
          </p>

          <p className="mt-1 text-xl font-extrabold text-slate-900">
            ₹{flight.price ?? "--"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onBook(flight.id)}
          className="rounded-xl bg-[#27A3AC] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#1397A1] active:scale-[0.97]"
        >
          Book Flight
        </button>
      </div>
    </article>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function FlightSearch() {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  const [flights, setFlights] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [loadingLocations, setLoadingLocations] =
    useState(true);

  const [searching, setSearching] = useState(false);

  const [searched, setSearched] = useState(false);

  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* =====================================================
     LOAD FLIGHTS FOR LOCATION DROPDOWN
  ===================================================== */

  useEffect(() => {
    let mounted = true;

    const loadFlights = async () => {
      try {
        setLoadingLocations(true);
        setError("");

        const response = await axios.get(API_URL, {
          params: {
            page: 0,
            size: 100,
          },
        });

        if (!mounted) return;

        const data = response.data?.content || [];

        setFlights(data);
      } catch (err) {
        console.error(
          "Unable to load flight locations:",
          err
        );

        if (mounted) {
          setError(
            "Unable to load flight locations. Please try again."
          );
        }
      } finally {
        if (mounted) {
          setLoadingLocations(false);
        }
      }
    };

    loadFlights();

    return () => {
      mounted = false;
    };
  }, []);

  /* =====================================================
     SWAP LOCATIONS
  ===================================================== */

  const handleSwap = () => {
    setFrom(to);
    setTo(from);

    setSearchResults([]);
    setSearched(false);
  };

  /* =====================================================
     SEARCH
  ===================================================== */

  const handleSearch = () => {
    if (!from || !to) {
      setError(
        "Please select both departure and destination."
      );

      return;
    }

    if (
      from.city === to.city &&
      from.state === to.state &&
      from.country === to.country
    ) {
      setError(
        "Departure and destination cannot be the same."
      );

      return;
    }

    try {
      setSearching(true);
      setError("");
      setSearched(true);

      const results = flights.filter((flight) => {
        const originMatches =
          flight.origincity === from.city &&
          flight.originstate === from.state &&
          flight.origincountry === from.country;

        const destinationMatches =
          flight.destinationcity === to.city &&
          flight.destinationstate === to.state &&
          flight.destinationcountry === to.country;

        return originMatches && destinationMatches;
      });

      setTimeout(() => {
        setSearchResults(results);
        setSearching(false);
      }, 400);
    } catch (err) {
      console.error("Flight search failed:", err);

      setSearchResults([]);
      setSearching(false);
      setError(
        "Something went wrong while searching flights."
      );
    }
  };

  /* =====================================================
     BOOK FLIGHT
  ===================================================== */

  const handleBookFlight = async (flightId) => {
    try {
      await dispatch(getFlight(flightId));

      navigate("/flightDetail");
    } catch (err) {
      console.error(
        "Error fetching selected flight:",
        err
      );

      setError(
        "Unable to open flight details. Please try again."
      );
    }
  };

  return (
    <section
      id="flight-search"
      className="relative w-full bg-white px-4 py-16 sm:px-6 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1100px]">
        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <div className="mx-auto max-w-[680px] text-center">
          <span className="inline-flex items-center rounded-full bg-[#EAF9FA] px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-[#19808A]">
            Flight Search
          </span>

          <h2 className="mt-4 font-roboto text-3xl font-extrabold leading-tight text-[#1397A1] sm:text-4xl lg:text-[44px]">
            Find your perfect flight
          </h2>

          <p className="mx-auto mt-3 max-w-[580px] text-sm leading-6 text-slate-500 sm:text-base">
            Search available flights by selecting your
            departure and destination.
          </p>

          <p className="mt-2 text-xs font-semibold text-slate-400">
            Demo flight data — prices and availability may
            not represent real-time flights.
          </p>
        </div>

        {/* =================================================
            SEARCH BOX
        ================================================= */}

        <div className="relative z-30 mx-auto mt-10 max-w-[900px] rounded-[28px] bg-[#88C3C7] p-4 shadow-[0_20px_45px_rgba(39,163,172,0.22)] sm:p-6 lg:rounded-[36px] lg:p-7">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[#27A3AC]">
              <SearchIcon />
            </div>

            <div>
              <h3 className="font-poetsen text-xl text-white">
                Search Flight
              </h3>

              <p className="text-xs text-white/80">
                Where would you like to go?
              </p>
            </div>
          </div>

          {/* Search fields */}

          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto_1fr_auto] md:items-center">
            {/* FROM */}

            <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
              <div className="mb-1 flex items-center gap-2">
                <span className="text-[#27A3AC]">
                  <LocationIcon />
                </span>

                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  From
                </span>
              </div>

              <LocationCombobox
                flights={flights}
                value={from}
                onChange={setFrom}
                from={true}
                disabled={loadingLocations}
              />
            </div>

            {/* SWAP */}

            <button
              type="button"
              onClick={handleSwap}
              disabled={!from && !to}
              aria-label="Swap departure and destination"
              className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white text-[#27A3AC] shadow-sm transition hover:rotate-180 hover:bg-[#EAF9FA] disabled:cursor-not-allowed disabled:opacity-50 md:mx-0"
            >
              <SwapIcon />
            </button>

            {/* TO */}

            <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
              <div className="mb-1 flex items-center gap-2">
                <span className="text-[#27A3AC]">
                  <PlaneIcon />
                </span>

                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  To
                </span>
              </div>

              <LocationCombobox
                flights={flights}
                value={to}
                onChange={setTo}
                from={false}
                disabled={loadingLocations}
              />
            </div>

            {/* SEARCH BUTTON */}

            <button
              type="button"
              onClick={handleSearch}
              disabled={
                searching ||
                loadingLocations ||
                !from ||
                !to
              }
              className="flex h-[76px] items-center justify-center gap-2 rounded-2xl bg-[#27A3AC] px-7 font-bold text-white shadow-md transition hover:bg-[#1397A1] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-white/50 disabled:text-white/80"
            >
              <SearchIcon />

              <span>
                {searching ? "Searching..." : "Search"}
              </span>
            </button>
          </div>

          {/* Loading locations */}

          {loadingLocations && (
            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-white">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Loading flight locations...
            </div>
          )}

          {/* Error */}

          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
              {error}
            </div>
          )}
        </div>

        {/* =================================================
            RESULTS
        ================================================= */}

        {searched && !searching && (
          <div className="relative z-10 mt-14">
            {/* Results header */}

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#27A3AC]">
                  Search results
                </p>

                <h3 className="mt-1 text-2xl font-extrabold text-slate-900">
                  Available flights
                </h3>
              </div>

              {searchResults.length > 0 && (
                <span className="w-fit rounded-full bg-[#EAF9FA] px-4 py-2 text-sm font-bold text-[#19808A]">
                  {searchResults.length}{" "}
                  {searchResults.length === 1
                    ? "flight"
                    : "flights"}{" "}
                  found
                </span>
              )}
            </div>

            {/* Results */}

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {searchResults.map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    onBook={handleBookFlight}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-[28px] border border-dashed border-slate-200 bg-slate-50 px-6 py-14 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF9FA] text-[#27A3AC]">
                  <PlaneIcon />
                </div>

                <h3 className="mt-5 text-xl font-extrabold text-slate-800">
                  No flights found
                </h3>

                <p className="mx-auto mt-2 max-w-[420px] text-sm leading-6 text-slate-500">
                  We couldn't find a flight for this route.
                  Try selecting another departure or
                  destination.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setFrom(null);
                    setTo(null);
                    setSearchResults([]);
                    setSearched(false);
                    setError("");
                  }}
                  className="mt-6 rounded-full bg-[#27A3AC] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1397A1]"
                >
                  Search another route
                </button>
              </div>
            )}
          </div>
        )}

        {/* =================================================
            INITIAL STATE
        ================================================= */}

        {!searched && !loadingLocations && (
          <div className="mx-auto mt-12 flex max-w-[700px] flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium text-slate-500 sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="text-[#27A3AC]">
                <CheckIcon />
              </span>
              Easy search
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#27A3AC]">
                <CheckIcon />
              </span>
              Live seat availability
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#27A3AC]">
                <CheckIcon />
              </span>
              Secure booking
            </div>
          </div>
        )}
      </div>
    </section>
  );
}