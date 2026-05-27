import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateSeatNo } from '../Slices/userSlice';
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axios from 'axios';

const Popup = ({ isVisible, onClose }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={onClose}>
            <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md"
                onClick={(e) => e.stopPropagation()}>
                <div className='flex flex-col items-center justify-center'>
                    <p className="text-green-600 bg-green-200 m-2.5 py-4 px-5 text-3xl rounded-[50%] font-semibold flex items-center">
                        ✔
                    </p>

                    <div className='text-xl text-green-800 font-extrabold'>Payment Sucessful</div>
                    <button onClick={onClose} className="text-shadow-green-700 rounded font-bold hover:text-black text-lg py-1 mt-2.5 px-5 bg-green-400">
                        done
                    </button>
                </div>
            </div>
        </div>
    );
};


export default function FlightSeats() {
    const selector = useSelector(state => state.staff);
    const dispatch = useDispatch();
    const flight = useSelector(state => state.flight.flightInfo);
    const [seat, setSeat] = useState([]);
    const [mySeats, setMySeats] = useState([]);
    const navig = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);
    const [paySucess, setPaySucess] = useState(false);

    useEffect(() => {
        axios
            .get(`https://airport-system-api-p7mk.onrender.com/public/${flight.id}/seats`)
            .then((res) => setSeat(res.data))
            .catch((err) => console.log(err));

        const client = new Client({
            webSocketFactory: () => new SockJS("https://airport-system-api-p7mk.onrender.com/ws"),
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe(`/topic/messages/${flight.id}`, (msg) => {
                    const { seats, isbooked } = JSON.parse(msg.body);
                    setSeat((prev) => {
                        const newSeats = prev.map((row) => [...row]);
                        seats.forEach((seatCode) => {
                            const [row, col] = seatToIndex(seatCode);
                            newSeats[row][col] = isbooked;
                        });
                        return newSeats;
                    });
                });
            },
        });

        client.activate();
        return () => {
            client.deactivate();
        };
    }, [flight.id]);

    function seatToIndex(seatCode) {
        const colLetter = seatCode.charAt(0);
        const rowNumber = parseInt(seatCode.substring(1));

        const colIndex = colLetter.charCodeAt(0) - "A".charCodeAt(0);
        const rowIndex = rowNumber - 1;

        return [rowIndex, colIndex];
    }


    const handleSeatClick = (i, j) => {
        if (seat[i][j] === true) return; // already booked

        const seatNumber = `${String.fromCharCode(65 + j)}${i + 1}`;
        const isSelected = mySeats.find(s => s.seatNumber === seatNumber);

        if (isSelected) {
            setMySeats(prev => prev.filter(s => s.seatNumber !== seatNumber));
        } else {
            setMySeats([...mySeats, {
                seatNumber,
                isBooked: false
            }]);
        }
    };

    const handleBookSeat = async () => {
        if (mySeats.length === 0) return;

        await dispatch(updateSeatNo({
            passengerId: selector.passenger.id,
            flight: { ...flight },
            seats: mySeats.map(s => ({ ...s, isBooked: true }))
        }));

        setSeat(prev =>
            prev.map((r, ri) =>
                r.map((c, ci) => {
                    const seatNumber = `${ri + 1}${String.fromCharCode(65 + ci)}`;
                    return mySeats.find(s => s.seatNumber === seatNumber) ? true : c;
                })
            )
        );

        setPaySucess(true);

    };

    const calculateTotalPrice = () => {
        let total = 0;
        const seatPrice = flight.price;
        if (mySeats.length === 0) {
            return 0;
        }
        mySeats.forEach(s => {
            let seatType = parseInt(s.seatNumber.slice(1)) <= 6 ? 'business' : 'economy';
            let price = seatType == 'business' ? parseFloat(seatPrice * 1.5) : parseInt(seatPrice);
            total = total + price;
        });
        return total;
    }

    return (
        <div className='w-full max-w-[800px] mx-auto'>
            <Popup
                isVisible={paySucess}
                onClose={() => {
                    setPaySucess(false);
                    navig("/")
                }} />

            <div className="p-4">
                <div className="flex justify-between items-center w-[100%]">
                    <button className="text-blue-600 text-sm font-medium mb-5" onClick={() => navig('/flightDetail')}>
                        ← Back
                    </button>
                </div>


                <div className="flex flex-col">
                    <div className="flex gap-3">
                        <div>
                            <div className="text-xl font-bold">{flight.origincity}</div>
                            <div className="text-[12px]">{flight.originstate}, {flight.origincountry}</div>
                        </div>
                        <div>→ </div>
                        <div>
                            <div className="text-xl font-bold">{flight.destinationcity}</div>
                            <div className="text-[12px]">{flight.destinationstate}, {flight.destinationcountry}</div>
                        </div>
                    </div>

                </div>

                <p className="text-gray-500 text-sm mt-2">
                    20 May 2024
                </p>
                <div className='mt-4 font-bold'>
                    Passenger Name: {selector.passenger.username}
                </div>
                <br />
                <div className='flex gap-5 items-center text-sm font-bold'>
                    <div className='flex items-center gap-1.5'>
                        <div
                            className="seat w-[35px] h-[35px] rounded flex items-center justify-center font-bold text-xs"
                            style={{
                                backgroundColor: "lightgray"
                            }}
                        >

                        </div>Availble
                    </div>

                    <div className='flex items-center gap-1.5'>
                        <div
                            className="seat w-[35px] h-[35px] rounded flex items-center justify-center font-bold text-xs"
                            style={{
                                backgroundColor: "orange"
                            }}
                        >

                        </div>Selected
                    </div>
                    <div className='flex items-center gap-1.5'>
                        <div
                            className="seat w-[35px] h-[35px] rounded flex items-center justify-center font-bold text-xs"
                            style={{
                                backgroundColor: "green"
                            }}
                        >

                        </div>Booked
                    </div>
                </div>

            </div>
            <div className="flex flex-wrap mx-auto w-fit rounded-2xl shadow-2xl justify-center">

                <div className="cabin max-w-fit p-4 m-0 w-[50%] min-w-[350px] bg-white">
                    <p className="text-2xl text-white bg-sky-500 px-2">Business Class</p>

                    {seat.length > 0 && (
                        <div>
                            {seat.map((row, i) => (
                                <React.Fragment key={i}>
                                    {i === 6 && (
                                        <>
                                            <hr className="my-2 border-sky-600" />
                                            <p className="text-2xl text-white bg-sky-500 px-2">Economy Class</p>
                                        </>
                                    )}
                                    <div className="flex justify-center my-1">
                                        {row.map((seatVal, j) => {
                                            const seatNumber = `${String.fromCharCode(65 + j)}${i + 1}`;
                                            const isSelected = mySeats.find(s => s.seatNumber === seatNumber);

                                            return (
                                                <div
                                                    key={`${i}-${j}`}
                                                    className={`${j === 2 ? "mr-4 ml-1" : "mx-1"} 
                                                        ${seatVal === true ? "cursor-not-allowed" : "cursor-pointer hover:scale-110 transition-transform duration-200"}`}
                                                    onClick={() => handleSeatClick(i, j)}
                                                >
                                                    <div
                                                        className="seat w-[35px] h-[35px] rounded flex items-center justify-center font-bold text-xs"
                                                        style={{
                                                            backgroundColor: seatVal === true || seatVal == "1"
                                                                ? "green"   // booked
                                                                : isSelected
                                                                    ? "orange" // selected
                                                                    : "lightgray" // available
                                                        }}
                                                    >
                                                        {seatNumber}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    )}
                </div>

                <div className='flex flex-col p-4 m-0 w-[50%] min-w-[350px] bg-gray-100 '>
                    <div className='flex flex-col gap-3'>
                        <div className='text-lg text-indigo-700 font-bold'>Selected seats</div>
                        <div className='flex flex-col gap-6 mt-6'>
                            <div>{
                                mySeats.length > 0 ? mySeats.map((seat) => (<span className='text-2xl text-indigo-400 font-bold p-2 rounded-full bg-white shadow-2xl mr-2'>{seat.seatNumber}</span>)) : <div className='text-2xl font-bold text-gray-400'>No seat available</div>
                            }</div>
                            <div className='flex flex-col gap-3'>
                                <div>
                                    <p className="text-gray-400 text-sm">Baggage</p>
                                    <p className="font-semibold text-gray-800 mt-1">
                                        1 × 23kg checked bag
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-400 text-sm">Cabin Bag</p>
                                    <p className="font-semibold text-gray-800 mt-1">
                                        7kg cabin bag
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-400 text-sm">Aircraft</p>
                                    <p className="font-semibold text-gray-800 mt-1">
                                        Boeing 777-300ER
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-400 text-sm">Cancellation</p>
                                    <p className="font-semibold text-red-500 mt-1">
                                        Non-refundable
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-400 text-sm">Economic class seat price</p>
                                    <p className="font-semibold text-green-600 mt-1">
                                        {flight.price}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-400 text-sm">Bussiness class seat price</p>
                                    <p className="font-semibold text-green-600 mt-1">
                                        {flight.price * 1.5}
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="w-full flex justify-center mt-28">
                        <button command="show-modal" commandfor="dialog" className="rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-gray-950/10">book Seat</button>
                        <el-dialog>
                            <dialog id="dialog" aria-labelledby="dialog-title" className="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent">
                                <el-dialog-backdrop className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"></el-dialog-backdrop>

                                <div tabindex="0" className="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0">
                                    <el-dialog-panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
                                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                            <div className="sm:flex sm:items-start">
                                                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-[50%] text-2xl bg-green-100 sm:mx-0 sm:size-6">
                                                    💸
                                                </div>
                                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                                    <h3 id="dialog-title" className="text-lg leading-6 text-gray-900 font-semibold">Flight Seat Booking</h3>
                                                    <div className="mt-4 p-4 rounded-lg shadow-md bg-white border border-gray-200">
                                                        <h3 className="text-lg font-semibold mb-3 text-sky-600 flex items-center">
                                                            ✈️ Flight Details
                                                        </h3>

                                                        <div className="space-y-2">
                                                            <div className="flex items-center mt-3">
                                                                <p className="text-gray-700 text-sm flex flex-col">
                                                                    <div className="font-bold mr-1 text-emerald-500">from </div>

                                                                    <div className="font-bold mr-1 "> {flight.origincity} ,{flight.originstate} ,{flight.origincountry} </div>
                                                                </p>
                                                                <p className="text-gray-700 text-sm height-5 flex items-center font-extrabold">

                                                                    <div className="font-extrabold mr-1 text-xl text-emerald-500">→ </div>
                                                                </p>
                                                                <p className="text-gray-700 text-sm flex flex-col">
                                                                    <div className="font-bold mr-1 text-emerald-500">to </div>
                                                                    <div className="font-bold mr-1"> {flight.destinationcity} ,{flight.destinationstate} ,{flight.destinationcountry} </div>
                                                                </p>

                                                            </div>
                                                            <p className="text-gray-700 text-sm mt-3">
                                                                <span className="font-bold mr-1 text-sky-600">Seats:</span>
                                                                <span className="text-green-600 font-semibold">
                                                                    {mySeats.map(s => s.seatNumber).join(', ')}
                                                                </span>
                                                            </p>
                                                            <p className="text-gray-700 text-sm mt-3">
                                                                <span className="font-bold mr-1 text-sky-600">Total Price:</span>
                                                                <span className="text-green-600 font-semibold">
                                                                    ₹ {calculateTotalPrice().toFixed(2)}
                                                                </span>
                                                            </p>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button type="button" command="close" commandfor="dialog" className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto" onClick={handleBookSeat}>payment</button>

                                            <button type="button" command="close" commandfor="dialog" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                                        </div>
                                    </el-dialog-panel>
                                </div>
                            </dialog>
                        </el-dialog>

                    </div>

                </div>
            </div>
        </div>
    )
}
