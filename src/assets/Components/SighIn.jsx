import React, { useContext, useState , useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { findData } from '../Slices/staffSlice';
import { usercontext } from '../Context/usercontext';
import { staffcontext } from '../Context/staffcontext';
import { Suspense } from 'react';


export default function SighIn() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { passenger, setPassenger } = useContext(usercontext);
  const { staff, setstaff } = useContext(staffcontext);

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
    setData({ ...data, [name]: value });
  }

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      gsap.fromTo(".animate", { opacity: 0, x: -800, y: 800 }, { opacity: 1, x: 0, y: 0, duration: 0.8 });
      gsap.fromTo("form", { opacity: 0, x: -250, y: 250 }, { opacity: 1, x: 0, y: 0, duration: 0.8, delay: 0.3 });
    });
  }, []);



  return (
    <div className="w-full min-h-[70vh] flex flex-col justify-center items-center">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="text-6xl w-[100%] mx-auto max-w-[750px] text-end animate">✈️</div>
        <div className="relative w-full max-w-[750px] h-[80vh] border-black rounded-lg shadow-lg shadow-gray-400 overflow-hidden flex justify-center items-center">

          <div className="absolute inset-0 pointer-events-none -z-10 opacity-30">
            <div className="relative w-full h-[100%] max-w-[1000px] mx-auto overflow-hidden ">
              <div className="absolute w-40 h-40 sm:w-60 sm:h-60 top-[2%] left-[0%] rotate-[-1deg] bg-gradient-to-b from-cyan-200 to-blue-400 rounded-full" />
              <div className="absolute w-48 h-40 sm:w-72 sm:h-64 top-[55%] left-[30%] rotate-[-1deg] bg-gradient-to-b from-cyan-200 to-blue-400 rounded-full" />
              <div className="absolute w-40 h-40 sm:w-60 sm:h-60 top-[10%] left-[65%] bg-gradient-to-b from-cyan-200 to-blue-400 rounded-full" />
              <div className="absolute w-44 h-52 sm:w-64 sm:h-72 top-[60%] left-[70%] bg-gradient-to-b from-cyan-200 to-blue-400 rounded-full" />
              <div className="absolute w-36 h-40 sm:w-48 sm:h-52 top-[70%] left-[10%] bg-gradient-to-b from-cyan-200 to-blue-400 rounded-full" />
              <div className="absolute w-32 h-36 sm:w-40 sm:h-44 top-[25%] left-[32%] bg-gradient-to-b from-cyan-200 to-blue-400 rounded-full" />
            </div>
          </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const result = await dispatch(findData(data));
                if (Object.keys(result.payload).length === 0) {
                  navigate('/signin');
                } else {
                  if (data.role === 'passenger') {
                    setPassenger(result.payload.passenger);
                    localStorage.setItem('token', result.payload.token);
                    navigate('/flights', { state: { passenger: result } });
                  } else if (data.role === 'admin') {
                    setstaff(result.payload.staff);
                    localStorage.setItem('token', result.payload.token);
                    navigate('/AddFlight', { state: { admin: result } });
                  } else {
                    setstaff(result.payload.staff);
                    localStorage.setItem('token', result.payload.token);
                    navigate('/about', { state: { staff: result } });
                  }
                }
              } catch (error) {
                console.log("Error during sign in:", error);
              }
            }}
            className="relative z-10 w-full h-full p-5"
          >
            <div className="flex flex-col justify-center items-center h-full gap-5">
              <div className='flex items-center flex-col gap-1.5'>
                <h1 className="text-xl sm:text-2xl font-bold text-indigo-700 text-center">login with registed account</h1>
                <p className='text-[12px]'>login and fast choice your favourite seat</p>
              </div>

              <div className='w-[100%] max-w-[500px]'>
                <div className='text-sm font-bold'>role</div>
                <select name="role" onChange={handleRole} className='border-2 text-sm border-black rounded-md p-2.5 max-w-[500px] w-[100%]' required>
                  <option value="passenger">Passenger</option>
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                </select>
              </div>

              <div className='w-[100%] max-w-[500px]'>
                <div className='text-sm font-bold'>Email</div>
                <input type="text"
                  name='username'
                  value={data.username}
                  placeholder='Email'
                  onChange={handleClick}
                  className='border-2 text-sm border-black rounded-md p-2.5 max-w-[500px] w-[100%]'
                  required />
              </div>

              <div className='w-[100%] max-w-[500px]'>
                <div className='text-sm font-bold'>password</div>
                <input type="password"
                  name='password'
                  value={data.password}
                  placeholder='Password'
                  onChange={handleClick}
                  className='border-2 text-sm border-black rounded-md p-2.5 max-w-[500px] w-[100%]'
                  required />
              </div>

              <input
                type="submit"
                value="Submit"
                className="bg-indigo-600 text-white text-md rounded p-2 w-full max-w-[500px] hover:bg-indigo-900 transition"
              />

              <p className="text-center text-sm font-bold">
                Don't have an account?
                <span className="text-indigo-700 underline cursor-pointer text-sm">
                  <Link to="/signup">  Sign Up</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </Suspense>
    </div>
  )
}
