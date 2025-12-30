import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation , useNavigate} from 'react-router-dom';
import { updateFlight } from '../../Slices/flightSlice';
import { updateSeatNo } from '../../Slices/userSlice';
import { setFlightToPassenger } from '../../Slices/staffSlice';

export default function FlightSeats() {

    const selector = useSelector(state => state.staff);
    const dispatch = useDispatch();
    const location = useLocation();
    const [flightData, setFlightData] = useState({ ...location.state });
    const [bseat, setBseat] = useState([]);
    const [eseat, setEseat] = useState([]);
    const [mySeat, setMySeat] = useState([]);
    const [haveSeat, setHaveSeat] = useState(false);
    const navig = useNavigate();

    useEffect(() => {
        selector.passenger.seatno != null ? setHaveSeat(true) : setHaveSeat(false);
        setBseat(JSON.parse(flightData.bussinessClass));
        setEseat(JSON.parse(flightData.economicClass));
    }, []);

    const updateSeat = (row, col, value, func) => {
        func(prev =>
            prev.map((r, ri) =>
                r.map((c, ci) => (ri === row && ci === col ? value : c))
            )
        );
    };
    return (
        <>
            <p>click your favorate seat from available seats and then click <b>Book seat</b></p>
            <div
                className='w-[100%] flex justify-center'>
                <button
                    className="bg-sky-500 cursor-pointer hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300"
                    onClick={async () => {
                        await dispatch(updateFlight({
                            ...flightData,
                            bussinessClass: JSON.stringify(bseat),
                            economicClass: JSON.stringify(eseat)
                        }));
                        dispatch(setFlightToPassenger({
                            seatno: `${mySeat[0] + 1}${mySeat[1] + 1}${mySeat[2]}`,
                            flight: {
                                ...flightData,
                                bussinessClass: JSON.stringify(bseat),
                                economicClass: JSON.stringify(eseat)
                            }
                        }));
                        console.log(selector.passenger);
                        await dispatch(updateSeatNo({
                            passengerId: (selector.passenger).passportNumber,
                            flight: location.state,
                            seatNo: `${mySeat[0] + 1}${mySeat[1] + 1}${mySeat[2]}`
                        }));
                        navig('/');
                    }}
                >Book seat</button>
            </div>
            <div className='flex my-0 mt-2 p-0 justify-center'>

                <div className='max-w-fit'
                    style={{ textAlign: '-webkit-center' }}>
                    <div className="h-56 bg-sky-400 rounded-t-full border-t-black"></div>
                    <p className='text-2xl text-white bg-sky-400'>Business class</p>
                    <div className='bg-sky-400 '>
                        {
                            bseat.map((e, i) => (
                                <div key={i} className="flex w-fit bg-sky-400">
                                    {e.map((e1, j) => (
                                        <div
                                            key={`${i}-${j}`}
                                            className={`${j == 1 ? "mr-7 ml-2.5 my-2.5" : "m-2.5"}  cursor-pointer relative`}
                                            onClick={() => {
                                                if (e1 == 0) {
                                                    if (haveSeat) {
                                                        alert("You already have a seat booked! cancel then book new seat.");
                                                        return;
                                                    } else {
                                                        if (Object.keys(mySeat).length === 0) {
                                                            setMySeat([i, j, "B"]);
                                                            updateSeat(i, j, 1, setBseat);
                                                        } else {
                                                            mySeat[2] === "B" ? updateSeat(mySeat[0], mySeat[1], 0, setBseat) : updateSeat(mySeat[0], mySeat[1], 0, setEseat);
                                                            setMySeat([i, j, "B"]);
                                                            updateSeat(i, j, 1, setBseat);
                                                        };
                                                    }
                                                } else { }
                                            }}
                                        >
                                            <p className='absolute top-[2px] left-3 font-extrabold text-xl text-red-700 z-10'>{i + 1}{j + 1}</p>
                                            <svg width="50" height="30" viewBox="0 0 125 125" fill="none" xmlns="http://www.w3.org/2000/svg" opacity={0.7}>
                                                <rect x="14.7058" width="95.5882" height="98.5277" fill={`${bseat[i][j] === 1 ? "green" : "#a9a9a9"}`} />
                                                <path d="M125 125H0V0.300629H25.9121C25.3162 2.9552 25 5.71618 25 8.55063V53.6307C25 74.3414 41.7893 91.1307 62.5 91.1307C83.2106 91.1306 100 74.3413 100 53.6307V8.55063C100 5.7162 99.6838 2.95517 99.0879 0.300629H125V125Z" fill="#D9D9D9" />
                                            </svg>
                                        </div>
                                    ))}
                                </div>
                            ))
                        }
                    </div>
                    <p className='text-2xl text-white bg-sky-400'>Economic class</p>
                    <div className='bg-sky-400'>
                        {
                            eseat.map((e, i) => (
                                <div key={i} className="flex w-[100%]">
                                    {e.map((e1, j) => (
                                        <div
                                            key={`${i}-${j}`}
                                            className={`${j == 2 ? "mr-5 ml-0.5 my-1" : "my-1 mx-0.5"}  cursor-pointer relative`}
                                            onClick={() => {
                                                if (haveSeat) {
                                                    alert("You already have a seat booked! cancel then book new seat.");
                                                    return;
                                                } else {
                                                    if (e1 == 0) {
                                                        if (Object.keys(mySeat).length === 0) {
                                                            setMySeat([i, j, "E"]);
                                                            updateSeat(i, j, 1, setEseat);
                                                        } else {
                                                            mySeat[2] === "B" ? updateSeat(mySeat[0], mySeat[1], 0, setBseat) : updateSeat(mySeat[0], mySeat[1], 0, setEseat);
                                                            setMySeat([i, j, "E"]);
                                                            updateSeat(i, j, 1, setEseat);
                                                        };
                                                    } else { }
                                                }
                                            }}
                                        >
                                            <p className='absolute top-[2px] left-3 font-semibold text-red-700 z-10'>{i + 1}{j + 1}</p>
                                            <svg width="50" height="30" viewBox="0 0 125 125" fill="none" xmlns="http://www.w3.org/2000/svg" opacity={0.7}>
                                                <rect x="14.7058" width="95.5882" height="98.5277" fill={`${eseat[i][j] === 1 ? "green" : "#a9a9a9"}`} />
                                                <path d="M125 125H0V0.300629H25.9121C25.3162 2.9552 25 5.71618 25 8.55063V53.6307C25 74.3414 41.7893 91.1307 62.5 91.1307C83.2106 91.1306 100 74.3413 100 53.6307V8.55063C100 5.7162 99.6838 2.95517 99.0879 0.300629H125V125Z" fill="#D9D9D9" />
                                            </svg>
                                        </div>
                                    ))}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
