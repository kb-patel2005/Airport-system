import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const PassengerFlight = ({ passengerId }) => {
  const [seat, SetSeat] = useState([]);
  const [successDelete, setSuccessDelete] = useState(false);

  const passenger = useSelector(state => state.staff.passenger);

  useEffect(() => {
    axios.get(`https://airport-system-api-p7mk.onrender.com/api/passengerSeats/${passenger.id}`).then((res) => SetSeat(res.data))
  }, []);

  const cancelSeat = async (flightId, seatNumber) => {
    await axios.delete(`https://airport-system-api-p7mk.onrender.com/api/cancelSeat/${flightId}/${seatNumber}`).then((res)=>setSuccessDelete(true)).catch((res)=>alert('something went wrong'));
    successDelete ? SetSeat((prev) => prev.filter((s) => !(s.flightId === flightId && s.SeatNumber === seatNumber))): "";
  }

  return (
    <div>

      <table className="table-fixed w-full border-collapse rounded-lg shadow-md overflow-hidden">
        <thead className="bg-green-100 text-green-700">
          <tr>
            <th className="px-4 py-2 text-left">Flight Id</th>
            <th className="px-4 py-2 text-left">Seat Number</th>
            <th className="px-4 py-2 text-left">From</th>
            <th className="px-4 py-2 text-left">To</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {seat.map((seat, i) => (
            <tr
              key={i}
              className="hover:bg-green-50 transition-colors duration-200"
            >
              <td className="border px-4 py-2">{seat.flightId}</td>
              <td className="border px-4 py-2">{seat.SeatNumber}</td>
              <td className="border px-4 py-2 text-sm">{seat.from}</td>
              <td className="border px-4 py-2 text-sm">{seat.to}</td>
              <td className="border px-4 py-2 font-semibold text-green-600">
                ₹{seat.price}
              </td>
              <td className="border px-4 py-2 text-center">
                <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow-sm transition duration-200" onClick={()=>cancelSeat(seat.flightId,seat.SeatNumber)}>
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div >
  );
};

export default PassengerFlight;
