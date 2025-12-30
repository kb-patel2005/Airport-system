import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function PassengerData() {

    const navigate = useNavigate();

    const passenger = JSON.parse(sessionStorage.getItem('user'));

    useEffect(() => {
    if (!passenger) {
        alert("No passenger data found. Please log in.");
        navigate('/signin');
    }else{
        if(passenger.role !== 'passenger'){
            alert("Access denied. Only passengers can view this page.");
            navigate('/');
        }
    }}, [navigate, passenger]);

    const { username, gender, email, phone, passportNumber, flight } = passenger.passenger;
    return (
        <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
            <div className="bg-blue-600 text-white text-center py-4">
                <h2 className="text-xl font-semibold">Passenger Details</h2>
            </div>
            <div className="p-6 space-y-4">
                <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Passport No:</span>
                    <span className="text-gray-900">{passportNumber}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Name:</span>
                    <span className="text-gray-900">{username}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Gender:</span>
                    <span className="text-gray-900">{gender}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Email:</span>
                    <span className="text-gray-900">{email}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Phone:</span>
                    <span className="text-gray-900">{phone}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Flight No:</span>
                    <span className="text-gray-900">{flight.flightId}</span>
                </div>
            </div>
        </div>
    );
}
