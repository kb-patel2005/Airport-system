import React, { useContext, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { findData } from '../../Slices/staffSlice';
import { usercontext } from '../../Context/usercontext';
import { staffcontext } from '../../Context/staffcontext';


export default function SighIn() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {passenger , setPassenger} = useContext(usercontext);
  const {staff , setstaff} = useContext(staffcontext);

  const [data, setData] = useState({
    username: "",
    password: "",
    role: "passenger"
  });

  const handleRole = (e) => {
    setData({ ...data, role: e.target.value });
  }

  const handleClick = (e) => {
    let { name, value } = e.target;
    setData(
      {
        ...data,
        [name]: value
      }
    )
  }

  return (
    <div className="w-screen min-h-[70vh] flex justify-center items-center px-4">
      <div className="relative w-full max-w-[750px] h-[80vh] border-black rounded-lg shadow-lg shadow-gray-400 overflow-hidden flex justify-center items-center">

        {/* Background gradient circles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-[100%] max-w-[1000px] mx-auto overflow-hidden ">
            <div className="absolute w-40 h-40 sm:w-60 sm:h-60 top-[2%] left-[0%] rotate-[-1deg] bg-gradient-to-b from-cyan-200 to-blue-400 rounded-full" />
            <div className="absolute w-48 h-40 sm:w-72 sm:h-64 top-[55%] left-[30%] rotate-[-1deg] bg-gradient-to-b from-cyan-200 to-blue-400 rounded-full" />
            <div className="absolute w-40 h-40 sm:w-60 sm:h-60 top-[10%] left-[65%] bg-gradient-to-b from-cyan-200 to-blue-400 rounded-full" />
            <div className="absolute w-44 h-52 sm:w-64 sm:h-72 top-[60%] left-[70%] bg-gradient-to-b from-cyan-200 to-blue-400 rounded-full" />
            <div className="absolute w-36 h-40 sm:w-48 sm:h-52 top-[70%] left-[10%] bg-gradient-to-b from-cyan-200 to-blue-400 rounded-full" />
            <div className="absolute w-32 h-36 sm:w-40 sm:h-44 top-[25%] left-[32%] bg-gradient-to-b from-cyan-200 to-blue-400 rounded-full" />
          </div>
        </div>

        {/* Form content */}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const result = await dispatch(findData(data));
              if (Object.keys(result.payload).length === 0) {
                navigate('/signin');
              } else {
                if (data.role === 'passenger') {
                  setPassenger(result.payload);
                  navigate('/flights', { state: { passenger: result } });
                } else if (data.role === 'admin') {
                  setstaff(result.payload);
                  navigate('/AddFlight', { state: { admin: result } });
                } else {
                  setstaff(result.payload);
                  navigate('/about', { state: { staff: result } });
                }
              }
            } catch (error) {
              console.log("Error during sign in:", error);
            } finally {
              console.log("Sign-in process completed.");
            }
          }}
          className="relative z-10 w-full h-full p-5"
        >
          <div className="flex flex-col justify-center items-center h-full gap-5">
            <h1 className="text-4xl sm:text-5xl font-bold text-center">Sign In</h1>
            <span className="text-base sm:text-lg">Who are you?</span>

            <select
              name="role"
              onChange={handleRole}
              className="border-2 border-black rounded-md p-3 w-full max-w-[500px]"
            >
              <option value="passenger">Passenger</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>

            <input
              type="text"
              placeholder="Username"
              name="username"
              value={data.username}
              onChange={handleClick}
              required
              className="border-2 border-black rounded-md p-3 w-full max-w-[500px]"
            />

            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleClick}
              placeholder="Password"
              required
              className="border-2 border-black rounded-md p-3 w-full max-w-[500px]"
            />

            <input
              type="submit"
              value="Submit"
              className="bg-gray-500 text-white text-xl rounded p-3 w-full max-w-[500px] hover:bg-gray-600 transition"
            />

            <p className="text-center">
              Don't have an account?
              <span className="text-blue-500 underline cursor-pointer text-xl">
                <Link to="/signup">  Sign Up</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
