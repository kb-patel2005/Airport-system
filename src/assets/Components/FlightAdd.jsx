import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { flightRoutes } from './flightRotes';
import { addFlight } from '../Slices/flightSlice';
import axios from 'axios';

export default function FlightAdd() {

    const [flights, setFlights] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(null);
    const [flag, setFlag] = useState(false);
    const pageSize = 5;
    const dispatch = useDispatch();

    const [selectedFlight, setSelectedFlight] = useState(null);

    const navigate = useNavigate();

    const role = useSelector(state => state.staff.role);

    const [data, setData] = useState({
        airline: "",
        origincountry: "",
        originstate: "",
        origincity: "",
        destinationcountry: "",
        destinationstate: "",
        destinationcity: "",
        basePrice: ""
    });

    const allcountry = flightRoutes.map(e => e.from.country);
    const uniquecountry = [...new Set(allcountry)];
    const state = flightRoutes.filter(e => e.from.country == data.origincountry);
    const dstate = flightRoutes.filter(e => e.from.country == data.destinationcountry);
    const city = flightRoutes.filter(e => e.from.state == data.originstate);
    const dcity = flightRoutes.filter(e => e.from.state == data.destinationstate);

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const res = await axios.get(
                    `https://airport-system-api-p7mk.onrender.com/public/allFlights?page=${page}&size=${pageSize}`
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

    const selectFlight = (flightId) => {
        axios.get(`https://airport-system-api-p7mk.onrender.com/public/flight/${flightId}`)
            .then(res => {
                setData({
                    ...data,
                    airline: res.data.airline,
                    origincountry: res.data.origincountry,
                    originstate: res.data.originstate,
                    origincity: res.data.origincity,
                    destinationcountry: res.data.destinationcountry,
                    destinationstate: res.data.destinationstate,
                    destinationcity: res.data.destinationcity,
                    basePrice: res.data.basePrice
                });
                setSelectedFlight(res.data);
            })
            .catch(err => {
                console.error('Error fetching flight details:', err);
            });
    }

    const handleClick = (e) => {
        let { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    }

    const handleCountryChange = (e) => {
        setData({
            ...data,
            origincountry: e.target.value,
            originstate: "",
            origincity: ""
        });
    };

    const dhandleCountryChange = (e) => {
        setData({
            ...data,
            destinationcountry: e.target.value,
            destinationstate: "",
            destinationcity: ""
        });
    };

    const handleStateChange = (e) => {
        setData({
            ...data,
            originstate: e.target.value,
            origincity: ""
        });
    };

    const dhandleStateChange = (e) => {
        setData({
            ...data,
            destinationstate: e.target.value,
            destinationcity: ""
        });
    };

    const fetchSchedules = async (flightId) => {
        try {
            const res = await axios.get(`https://airport-system-api-p7mk.onrender.com/public/flight/${flightId}`);
        } catch (err) {
            console.error('Error fetching flight schedules:', err);
        }
    };

    const [schedules, setSchedules] = useState([
        {
            arrivalTime: "",
            departureTime: ""
        }
    ]);

    const saveSchedules = async (e) => {
        e.preventDefault();
        axios.post(`https://airport-system-api-p7mk.onrender.com/addFlightSchedule/${selectedFlight.id}`, schedules,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                alert('Schedules saved successfully!');
                setSelectedFlight(null);
                setSchedules([
                    {
                        arrivalTime: "",
                        departureTime: ""
                    }
                ]);
            })
            .catch(err => {
                console.error('Error saving schedules:', err);
            });
    };

    const handleScheduleChange = (index, e) => {

        const updatedSchedules = [...schedules];

        updatedSchedules[index][e.target.name] = e.target.value;

        setSchedules(updatedSchedules);
    };

    const addMoreSchedule = () => {

        setSchedules([
            ...schedules,
            {
                arrivalTime: "",
                departureTime: ""
            }
        ]);
    };

    const removeSchedule = (index) => {

        const updatedSchedules = schedules.filter(
            (_, i) => i !== index
        );

        setSchedules(updatedSchedules);
    };

    const [user, setUser] = useState(null);

    useEffect(() => {
        if (role == "admin") { }
        else { navigate('/') }
    }, [navigate]);

    if (role != "admin") return null;


    return (

        <div className="w-screen mt-8 h-[80vh] flex justify-center items-start">
            <div className="w-[90%] max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Left Side - Add Flight Form */}
                <div className="flex flex-col justify-center items-center rounded-lg shadow-lg shadow-blue-200 bg-white">
                    <form
                        onSubmit={async (e) => {
                            try {
                                e.preventDefault();
                                await dispatch(addFlight(data));
                            } catch (error) {
                                console.error("Error adding flight:", error);
                            }
                        }}
                        className="w-full h-full p-5"
                    >
                        <div className="flex flex-col justify-center items-center h-full gap-5">
                            <h1 className="text-3xl font-bold text-indigo-600">Add Flight</h1>
                            <br />
                            <label htmlFor='airline' className="text-xl text-left text-blue-700">Set Origin:</label>
                            <input
                                type="text"
                                id='airline'
                                placeholder="Airline"
                                name="airline"
                                value={data.airline}
                                className="border-2 border-blue-300 rounded-md p-3 max-w-[500px] w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={handleClick}
                                required
                            />

                            {/* Origin Section */}
                            <div className="w-full max-w-[500px]">
                                <label htmlFor='ocountry' className="text-xl text-left text-blue-700">Set Origin:</label>
                                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                                    <select
                                        id='ocountry'
                                        name="origincountry"
                                        className="border-2 border-blue-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        onChange={handleCountryChange}
                                        value={data.origincountry}
                                        required
                                    >
                                        <option>Select country</option>
                                        {uniquecountry.map((e, index) => (
                                            <option key={index} value={e}>{e}</option>
                                        ))}
                                    </select>

                                    <select
                                        name="originstate"
                                        className="border-2 border-blue-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        value={data.originstate}
                                        onChange={handleStateChange}
                                        required
                                    >
                                        <option value="">Select state</option>
                                        {state.map((e, index) => (
                                            <option key={index} value={e.from.state}>{e.from.state}</option>
                                        ))}
                                    </select>

                                    <select
                                        name="origincity"
                                        className="border-2 border-blue-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        value={data.origincity}
                                        onChange={handleClick}
                                        required
                                    >
                                        <option value="">Select city</option>
                                        {city.map((e, index) => (
                                            <option key={index} value={e.from.city}>{e.from.city}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Destination Section */}
                            <div className="w-full max-w-[500px]">
                                <p className="text-xl text-left text-blue-700">Set Destination:</p>
                                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                                    <select
                                        name="destinationcountry"
                                        className="border-2 border-blue-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        onChange={dhandleCountryChange}
                                        value={data.destinationcountry}
                                        required
                                    >
                                        <option>Select country</option>
                                        {uniquecountry.map((e, index) => (
                                            <option key={index} value={e}>{e}</option>
                                        ))}
                                    </select>

                                    <select
                                        name="destinationstate"
                                        className="border-2 border-blue-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        onChange={dhandleStateChange}
                                        value={data.destinationstate}
                                        required
                                    >
                                        <option value="">Select state</option>
                                        {dstate.map((e, index) => (
                                            <option key={index} value={e.from.state}>{e.from.state}</option>
                                        ))}
                                    </select>

                                    <select
                                        name="destinationcity"
                                        className="border-2 border-blue-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        onChange={handleClick}
                                        value={data.destinationcity}
                                        required
                                    >
                                        <option value="">Select city</option>
                                        {dcity.map((e, index) => (
                                            <option key={index} value={e.from.city}>{e.from.city}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Price */}
                            <label htmlFor='price' className="text-xl text-left text-blue-700">Set Origin:</label>
                            <input
                                type="number"
                                id='price'
                                name="basePrice"
                                value={data.basePrice}
                                onChange={handleClick}
                                placeholder="Ticket price"
                                className="border-2 border-blue-300 rounded-md p-2 max-w-[500px] w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />

                            {
                                selectedFlight && (

                                    <form className="w-full max-w-3xl mx-auto mt-6 bg-white border border-slate-200 rounded-2xl shadow-lg p-6 flex flex-col gap-6">

                                        {/* Heading */}

                                        <div className="flex items-center justify-between flex-wrap gap-4">

                                            <h2 className="text-3xl font-bold text-slate-800">
                                                ✈️ Add Flight Schedule
                                            </h2>

                                            <div className="flex items-center gap-3">

                                                <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-semibold">
                                                    Flight #{selectedFlight.id}
                                                </div>

                                                {/* Add More */}

                                                <button
                                                    type="button"
                                                    onClick={addMoreSchedule}
                                                    className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white text-3xl shadow-md transition"
                                                >
                                                    +
                                                </button>

                                            </div>

                                        </div>

                                        {/* Schedule List */}

                                        <div className="space-y-5">

                                            {
                                                schedules.map((schedule, index) => (

                                                    <div
                                                        key={index}
                                                        className="border border-slate-200 rounded-2xl p-5 bg-slate-50 shadow-sm"
                                                    >

                                                        <div className="flex justify-between items-center mb-5">

                                                            <h3 className="text-xl font-bold text-slate-700">
                                                                Schedule {index + 1}
                                                            </h3>

                                                            {
                                                                schedules.length > 1 && (

                                                                    <button
                                                                        type="button"
                                                                        onClick={() => removeSchedule(index)}
                                                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                                                                    >
                                                                        Remove
                                                                    </button>

                                                                )
                                                            }

                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                                            <div className="flex flex-col gap-2">

                                                                <label className="text-lg font-semibold text-slate-700">
                                                                    Arrival Time
                                                                </label>

                                                                <input
                                                                    type="datetime-local"
                                                                    name="arrivalTime"
                                                                    value={schedule.arrivalTime}
                                                                    onChange={(e) =>
                                                                        handleScheduleChange(index, e)
                                                                    }
                                                                    className="border-2 border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                                                                />

                                                            </div>

                                                            <div className="flex flex-col gap-2">

                                                                <label className="text-lg font-semibold text-slate-700">
                                                                    Departure Time
                                                                </label>

                                                                <input
                                                                    type="datetime-local"
                                                                    name="departureTime"
                                                                    value={schedule.departureTime}
                                                                    onChange={(e) =>
                                                                        handleScheduleChange(index, e)
                                                                    }
                                                                    className="border-2 border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>

                                        <div className="flex justify-end gap-4 mt-2">
                                            <button
                                                type="button"
                                                className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
                                            >Cancel</button>
                                            <button
                                                type="submit"
                                                className="bg-green-500 hover:bg-green-600 transition-colors px-8 py-3 rounded-xl text-lg font-semibold text-white shadow-md"
                                                onClick={saveSchedules}
                                            >Save All Schedule</button>

                                        </div>

                                    </form>

                                )
                            }
                            <input
                                type="submit"
                                name="submit"
                                value="Submit"
                                className="bg-blue-500 hover:bg-blue-600 transition-colors w-full max-w-[500px] p-2 rounded text-xl text-white shadow-md"
                            />
                        </div>
                    </form>
                    {/* {selectedFlight && (
                        <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-md p-5">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">Selected Flight Details</h2>
                            <p>Origin: {selectedFlight.origincity}, {selectedFlight.originstate}, {selectedFlight.origincountry}</p>
                            <p>Destination: {selectedFlight.destinationcity}, {selectedFlight.destinationstate}, {selectedFlight.destinationcountry}</p>
                            <p>Price: ₹{selectedFlight.basePrice.toLocaleString()}</p>
                        </div>
                    )} */}
                </div>

                {/* Right Side - All Flights */}
                <div className="rounded-lg shadow-lg shadow-blue-200 bg-white p-5 overflow-y-auto">
                    <h2 className="text-2xl font-bold text-indigo-600 mb-4">All Flights</h2>
                    <div className="space-y-4">
                        {!selectedFlight && flights.map((flight, index) => (
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
                                                        await selectFlight(flight.id);
                                                    }}
                                                > + add schedule </button>

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
                                                <div className="text-lg font-bold">₹{flight.basePrice.toLocaleString()}</div>

                                            </div>


                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>
                </div>

            </div>
        </div>

    )
}