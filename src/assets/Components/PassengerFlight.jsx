import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const PassengerFlight = ({ passengerId }) => {
  const [bookings, setBookings] = useState([]);
  const [successDelete, setSuccessDelete] = useState(false);

  const passenger = useSelector(state => state.staff.passenger);

  useEffect(() => {
    axios.get(`https://airport-system-api-p7mk.onrender.com/api/passengerSeats`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then((res) => setBookings(res.data))

    console.log(bookings)

  }, []);

  const cancelSeat = async (seatId, bookingId) => {
    try {
      await axios.put(
        `https://airport-system-api-p7mk.onrender.com/api/cancelBookedSeat/${seatId}?bookingId=${bookingId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      // Update local state: mark seat as cancelled inside the booking
      setBookings((prev) =>
        prev.map((booking) =>
          booking.bookingId === bookingId
            ? {
              ...booking,
              bookedSeats: booking.bookedSeats.map((seat) =>
                seat.id === seatId ? { ...seat, status: "CANCELLED" } : seat
              )
            }
            : booking
        )
      );
    } catch (err) {
      alert("Something went wrong");
    }
  };


  const cancelTicket = async (id) => {
    await axios.put(`https://airport-system-api-p7mk.onrender.com/api/cancelBooking`, [String(id)], {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then((res) => setSuccessDelete(true)).catch((res) => alert('something went wrong'));
    setBookings((prev) => prev.filter((s) => s.bookingId !== id))
  }

  const totalPrice = (seats) => {
    let total = 0;
    seats.forEach((seat) => {
      total += seat.seatPrice;
    });
    return total;
  }

  return (
    <div>
      <div className="text-xl font-bold text-center mb-5 text-indigo-700">My Bookings</div>
      {bookings.map((booking) => (
        <div
          key={booking.bookingId}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 max-w-5xl mx-auto mb-5"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Flight Ticket</h1>
              <p className="text-blue-100 mt-1">
                Booking ID : #{booking.bookingId}
              </p>
            </div>

            <div className="bg-white/20 px-4 py-2 rounded-xl text-sm font-semibold backdrop-blur-sm">
              {booking.status}
            </div>
          </div>

          {/* Flight Details */}
          <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 border-b border-dashed border-slate-300">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="text-sm text-slate-500">From</div>
                  <div className="font-bold">
                    <div className="text-2xl">
                      {booking.flight.origincity}
                    </div>
                    <div className="text-sm text-slate-600">
                      {booking.flight.originstate}, {booking.flight.origincountry}
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-center min-w-[120px]">
                  <div className="w-full h-[2px] bg-slate-300 relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 text-xl">
                      ✈️
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-slate-500">To</div>
                  <div className="font-bold">
                    <div className="text-2xl">
                      {booking.flight.destinationcity}
                    </div>
                    <div className="text-sm text-slate-600">
                      {booking.flight.destinationstate}, {booking.flight.destinationcountry}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-100 rounded-2xl p-4">
                  <div className="text-sm text-slate-500">Airline</div>
                  <div className="font-semibold text-slate-800 mt-1">
                    {booking.flight.airline}
                  </div>
                </div>

                <div className="bg-slate-100 rounded-2xl p-4">
                  <div className="text-sm text-slate-500">Departure</div>
                  <div >
                    <div className="font-semibold text-slate-800 mt-1">{booking.schedule.departureTime.toLocaleString().slice(0, 10)}</div>
                    <div className="text-sm font-normal">{booking.schedule.departureTime.toLocaleString().slice(11, 16)}</div>
                  </div>
                </div>

                <div className="bg-slate-100 rounded-2xl p-4">
                  <div className="text-sm text-slate-500">Arrival</div>
                  <div>
                    <div className="font-semibold text-slate-800 mt-1">{booking.schedule.arrivalTime.toLocaleString().slice(0, 10)}</div>
                    <div className="text-sm font-normal">{booking.schedule.arrivalTime.toLocaleString().slice(11, 16)}</div>
                  </div>
                </div>

                <div className="bg-slate-100 rounded-2xl p-4">
                  <div className="text-sm text-slate-500">Booking Date</div>
                  <div className="font-semibold text-slate-800 mt-1">
                    {booking.bookingDate.toLocaleString().split('T')[0]}
                  </div>
                </div>
              </div>
            </div>

            {/* Passenger */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
              <div className="text-lg font-bold text-slate-800 mb-4">
                Passenger Details
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-slate-500">Name</div>
                  <div className="font-semibold text-slate-800">
                    {passenger.username}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-slate-500">Seats</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {booking.bookedSeats.map((seat, i) => (
                      <div
                        key={i}
                        className="bg-blue-600 text-white px-3 py-1 rounded-xl text-sm font-semibold"
                      >
                        {seat.seatNumber}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-slate-500">Total Price</div>
                  <div className="text-xl font-bold text-green-600 mt-1">
                    ₹{totalPrice(booking.bookedSeats).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seat Table */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <h2 className="text-2xl font-bold text-slate-800">
                Seat Details
              </h2>

              <button className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-2 rounded-xl font-semibold" onClick={() => cancelTicket(booking.bookingId)}>
                Cancel Ticket
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">

                <thead>
                  <tr className="bg-slate-100 text-left">
                    <th className="p-2 rounded-l-xl">Seat</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Status</th>
                    <th className="p-2 rounded-r-xl">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {booking.bookedSeats.map((seat, i) => (
                    <tr
                      key={i}
                      className="border-b border-slate-200"
                    >

                      <td className="p-2 font-medium text-slate-700">
                        {seat.seatNumber}
                      </td>

                      <td className="p-2 text-slate-600">
                        ₹{seat.seatPrice.toLocaleString()}
                      </td>

                      <td className="p-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${seat.status === "CANCELLED"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                            }`}
                        >
                          {seat.status}
                        </span>
                      </td>

                      <td className="p-2">
                        <button
                          className="bg-red-500 hover:bg-red-600 transition text-white p-2 rounded-lg"
                          onClick={() => cancelSeat(seat.id, booking.bookingId)}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M23 4.5C23 3.67158 22.3285 3 21.5 3H17.724C17.0921 1.20736 15.4007 0.00609375 13.5 0H10.5C8.59928 0.00609375 6.90789 1.20736 6.27602 3H2.5C1.67158 3 1 3.67158 1 4.5C1 5.32842 1.67158 6 2.5 6H3.00002V18.5C3.00002 21.5376 5.46245 24 8.5 24H15.5C18.5376 24 21 21.5376 21 18.5V6H21.5C22.3285 6 23 5.32842 23 4.5Z"
                              fill="white"
                            />
                          </svg>
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      ))}


    </div >
  );
};

export default PassengerFlight;