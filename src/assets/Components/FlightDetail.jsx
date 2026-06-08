import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSchduleId } from "../Slices/flightSlice";

export default function FlightDetail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const flightInfo = useSelector((state) => state.flight.flightInfo);
    const passenger = useSelector(state => state.staff.passenger);

    function getHoursDifference(date1, date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);

        const diffMs = d2.getTime() - d1.getTime();

        const diffHours = diffMs / (1000 * 60 * 60);

        return diffHours;
    }


    return (
        <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center p-6">
            <title>flight Information</title>
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-md overflow-hidden">

                <div className="px-8 py-6 border-b">
                    <div className="flex justify-between items-center w-[100%]">
                        <button className="text-blue-600 text-sm font-medium mb-5" onClick={()=>navigate('/flights')}>
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

                </div>

                <h1 className="text-2xl font-bold m-5 text-indigo-600">Flight Schedules</h1>
                {
                    flightInfo.schedules?.map((schedule, index) => (
                        <div key={index} className="p-6 border-t-2 mb-1.5 rounded-2xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-xl  font-bold text-gray-900">
                                        {schedule.arrivalTime.toLocaleString().slice(0, 10)} - {schedule.arrivalTime.toLocaleString().slice(11, 16)}
                                    </h1>

                                    <div>
                                        <div className="text-xl font-bold text-indigo-600">{flightInfo.origincity}</div>
                                        <div className="text-sm text-gray-500 font-semibold">{flightInfo.originstate}, {flightInfo.origincountry}</div>
                                    </div>
                                </div>

                                <div className="flex-1 px-5">
                                    <div className="flex flex-col items-center">
                                        <p className="text-gray-500 text-[12px] mb-3">
                                            {getHoursDifference(schedule.arrivalTime, schedule.departureTime).toFixed(2)} hr
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

                                <div className="text-right">
                                    <h1 className="text-xl  font-bold text-gray-900">
                                        {schedule.departureTime.toLocaleString().slice(0, 10)} - {schedule.departureTime.toLocaleString().slice(11, 16)}
                                    </h1>
                                    <div>
                                        <div className="text-xl font-bold text-indigo-600">{flightInfo.destinationcity}</div>
                                        <div className="text-sm text-gray-500 font-semibold">{flightInfo.destinationstate}, {flightInfo.destinationcountry}</div>
                                    </div>
                                </div>
                            </div>

                            <button
                                className="py-2 text-white rounded-2xl mt-1.5 px-5 bg-blue-600"
                                onClick={(e) => {
                                    dispatch(setSchduleId(schedule.id));
                                    navigate('/FlightSeats');
                                }}
                            >Book seats</button>
                        </div>
                    ))
                }

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

                </div>
            </div>
        </div>
    );
}
