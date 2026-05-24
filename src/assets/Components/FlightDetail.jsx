import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function FlightDetail() {

    const navigate = useNavigate();
    const flightInfo = useSelector((state)=>state.flight.flightInfo);
    const passenger = useSelector(state => state.staff.passenger);

    return (
        <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center p-6">
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-md overflow-hidden">

                {/* Header */}
                <div className="px-8 py-6 border-b">
                    <div className="flex justify-between items-center w-[100%]">
                        <button className="text-blue-600 text-sm font-medium mb-5">
                            ← Back to results
                        </button>
                        <span className="bg-green-100 text-green-600 text-sm px-4 py-1 rounded-full font-medium">
                            Confirmed
                        </span>
                    </div>


                    <div className="flex items-center justify-between">
                        <div className="flex gap-3">
                            <div>
                                <div className="text-xl font-bold">{flightInfo.origincity}</div>
                                <div className="text-[12px]">{flightInfo.originstate}, {flightInfo.origincountry}</div>
                            </div>
                            <div>→ </div>
                            <div>
                                <div className="text-xl font-bold">{flightInfo.destinationcity}</div>
                                <div className="text-[12px]">{flightInfo.destinationstate}, {flightInfo.destinationcountry}</div>
                            </div>

                        </div>

                        
                    </div>

                    <p className="text-gray-500 text-sm mt-2">
                        20 May 2024
                    </p>
                </div>

                {/* Flight Time Section */}
                <div className="px-8 py-10">
                    <div className="flex items-center justify-between">

                        {/* Departure */}
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                                10:30 AM
                            </h1>

                            <p className="mt-3 text-md font-semibold text-gray-800">
                                DXB
                            </p>

                            <p className="text-gray-500 text-sm">
                                Dubai Intl Airport
                            </p>
                        </div>

                        {/* Flight Line */}
                        <div className="flex-1 px-5">
                            <div className="flex flex-col items-center">
                                <p className="text-gray-500 text-[12px] mb-3">
                                    07h 20m
                                </p>

                                <div className="w-full flex items-center">
                                    <div className="flex-1 border-t border-dashed border-gray-300"></div>

                                    <div className="mx-2 bg-blue-600 sm:w-12 sm:h-12 h-8 w-8 rounded-full flex items-center justify-center text-white text-xl">
                                        ✈
                                    </div>

                                    <div className="flex-1 border-t border-dashed border-gray-300"></div>
                                </div>
                            </div>
                        </div>

                        {/* Arrival */}
                        <div className="text-right">
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                                02:50 PM
                            </h1>

                            <p className="mt-3 text-md font-semibold text-gray-800">
                                LHR
                            </p>

                            <p className="text-gray-500 text-sm">
                                Heathrow Airport
                            </p>
                        </div>
                    </div>
                </div>

                {/* Flight Information */}
                <div className="border-t px-8 py-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                        Flight Information
                    </h3>

                    <div className="flex flex-wrap gap-6">

                        <div className="w-[50%] min-w-[200px] max-w-[250px]">
                            <p className="text-gray-400 text-sm">Baggage</p>
                            <p className="font-semibold text-gray-800 mt-1">
                                1 × 23kg checked bag
                            </p>
                        </div>

                        <div className="w-[50%] min-w-[200px] max-w-[250px]">
                            <p className="text-gray-400 text-sm">Cabin Bag</p>
                            <p className="font-semibold text-gray-800 mt-1">
                                7kg cabin bag
                            </p>
                        </div>

                        <div className="w-[50%] min-w-[200px] max-w-[250px]">
                            <p className="text-gray-400 text-sm">Aircraft</p>
                            <p className="font-semibold text-gray-800 mt-1">
                                Boeing 777-300ER
                            </p>
                        </div>

                        <div className="w-[50%] min-w-[200px] max-w-[250px]">
                            <p className="text-gray-400 text-sm">Cancellation</p>
                            <p className="font-semibold text-red-500 mt-1">
                                Non-refundable
                            </p>
                        </div>
                    </div>

                    {/* Price + Button */}
                    <div className="mt-10 flex flex-wrap items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">
                                Total Price
                            </p>

                            <h2 className="text-xl font-bold text-gray-900">
                                ₹ {flightInfo.price}
                            </h2>

                            <button className="text-blue-600 text-sm mt-1">
                                different for both class
                            </button>
                        </div>

                        <button className="bg-blue-600 hover:bg-blue-700 transition text-white p-4 rounded-xl font-semibold shadow-md" 
                        onClick={()=>{
                            Object.keys(passenger).length>0?
                            navigate('/FlightSeats'):navigate('/Signin')}}>
                            choose seats
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
