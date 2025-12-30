import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { cancelTicket, deleteflightfrompassenger } from '../../Slices/staffSlice';
import { updateFlight } from '../../Slices/flightSlice';
import { useNavigate } from 'react-router-dom';

export default function PassengerFlight() {

    const selector = useSelector((state) => state.staff);
    const navigate = useNavigate();
    const [passenger, setPassenger] = useState({ ...selector.passenger });
    const dispatch = useDispatch();
    const [flight, setFlight] = useState(selector.passenger.flight);

    return (
        <div className='relative'>

            

            <div className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden m-auto">
                <div className="absolute text-center">
                <svg width="350" height="700" viewBox="0 0 1273 951" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M502.168 265.835L808.767 236.077L834.148 285.293L830.93 340.199L498.949 320.741L502.168 265.835Z" fill="#D9D9D9" />
                    <path d="M59.1107 581.581L114.298 562.143L212.396 678.878L931.134 122.074L988.65 395.685L151.889 878.789L96.8962 703.878L59.1107 581.581Z" fill="#D9D9D9" />
                    <path d="M1206.5 247.708C1269.5 165.708 1211.78 104.156 1144.12 86.787C1076.46 69.418 1004.1 79.4878 942.971 114.781C881.842 150.074 836.944 207.7 818.155 274.981C799.367 342.262 808.226 413.687 842.784 473.543L1073.27 340.47L1206.5 247.708Z" fill="#D9D9D9" />
                    <path d="M833.506 335.441L1070.68 288.878L743.678 760.941L680.678 760.941L833.506 335.441Z" fill="#D9D9D9" />
                    <path d="M127.755 806.896L321 733.707L168.283 926.618L89.1942 935.834L127.755 806.896Z" fill="#CDCDCD" />
                </svg>
            </div>
                <div className="relative z-10">

                    {
                        Object.keys(passenger).length === 0 || passenger.flight == null ? (
                            <div className="w-full text-center text-2xl text-blue-700 border-2 border-blue-700 rounded-[50px] p-4 font-extrabold"
                                style={{ filter: 'drop-shadow(2px 4px 6px black)' }}>
                                No flight data available. Please log in as a passenger.
                            </div>
                        ) : (
                            <>
                                <button
                                    onClick={async () => {
                                        let seat = passenger.seatno;
                                        let seatNo = seat.split("").reverse().join("");
                                        const fclass = seatNo[0];
                                        const j = parseInt(seatNo[1]);
                                        const i = parseInt(seatNo.slice(2));
                                        if (fclass === 'B') {
                                            const bus = JSON.parse(flight.bussinessClass);
                                            bus[i - 1][j - 1] = 0;
                                            dispatch(updateFlight({ ...flight, bussinessClass: JSON.stringify(bus) }));
                                        } else {
                                            const eco = JSON.parse(flight.economicClass);
                                            eco[i - 1][j - 1] = 0;
                                            dispatch(updateFlight({ ...flight, economicClass: JSON.stringify(eco) }));
                                        }
                                        await dispatch(cancelTicket({ passengerId: passenger.passportNumber }));
                                        dispatch(deleteflightfrompassenger(passenger));
                                        alert('Ticket cancelled successfully');
                                    }}
                                    className="px-6 py-2 
                                            bg-transparent
                                            text-red font-semibold 
                                            rounded-lg shadow-md 
                                            cursor-pointer
                                            border-2 border-red-500 
                                            hover:text-white hover:border-white
                                            hover:shadow-lg hover:scale-105
                                            hover:bg-red-500
                                            focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2
                                            transition-all duration-300 ease-in-out
                                        "
                                >❌ Cancel Ticket</button>
                                <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-transparent rounded-xl shadow-xl p-6 border border-slate-300 transition-transform hover:scale-[1.02]">
                                    <h2 className="text-lg font-semibold text-blue-700 mb-4">✈️ Flight Information</h2>

                                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
                                        <div>
                                            <p className="font-medium">Flight No:</p>
                                            <p>{flight.flightId}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">Airline:</p>
                                            <p>{flight.airline}</p>
                                        </div>

                                        <div>
                                            <p className="font-medium text-green-700">Origin Country:</p>
                                            <p>{flight.origincountry}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium text-red-700">Destination Country:</p>
                                            <p>{flight.destinationcountry}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium text-green-700">Origin State:</p>
                                            <p>{flight.originstate}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium text-red-700">Destination State:</p>
                                            <p>{flight.destinationstate}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium text-green-700">Origin City:</p>
                                            <p>{flight.origincity}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium text-red-700">Destination City:</p>
                                            <p>{flight.destinationcity}</p>
                                        </div>
                                    </div>
                                </div>
                            </>)
                    }
                </div>
            </div>
        </div>
    );
}