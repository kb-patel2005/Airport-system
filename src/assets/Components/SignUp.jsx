import React, { useContext, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { setStaff } from '../Slices/staffSlice';
import { usercontext } from '../Context/usercontext';
import { staffcontext } from '../Context/staffcontext';
import { addData } from '../Slices/userSlice';


export default function SignUp() {

  const { passenger, setPassenger} = useContext(usercontext);
  const { staff, setstaff} = useContext(staffcontext);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [role, setRole] = useState("passenger");

  const [userData, setUserData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    gender: ""
  });

  const handleRole = (e) => {
    setRole(e.target.value);
  }

  const handleImage = (e) => {
    setUserData({ ...userData, image: e.target.files[0] });
  }

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUserData(
      {
        ...userData,
        [name]: value
      }
    )
  }

  return (
    <div>
      <div className='flex justify-center items-center w-full'>
        <div className='relative flex justify-center items-center w-[90%] max-w-[750px] h-[80%] rounded-lg shadow-lg shadow-gray-400'>
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
          <form className='w-[100%] h-[100%] z-10 p-5'
            onSubmit={async(e) => {
              e.preventDefault();
              if (role === 'passenger') {
                alert("passenger dispatcher running......");
                await dispatch(addData(userData));
                setPassenger(userData);
                navigate('/Signin');
              } else {
                const upadatedUserData = { ...userData, role: role };
                setstaff(upadatedUserData);
                await dispatch(setStaff(upadatedUserData));
                navigate('/Signin');
              }
            }}>
            <div className='flex flex-col justify-center items-center h-[100%] gap-5'>
              <h1 className='text-4xl sm:text-6xl font-bold'>Sign Up</h1>
              <br />

              <input type="text"
                name='username'
                placeholder='Username'
                onChange={handleChange}
                className='border-2 border-black rounded-md p-3 max-w-[500px] w-[100%]'
                required />

              <input type="password"
                name='password'
                placeholder='Password'
                onChange={handleChange}
                className='border-2 border-black rounded-md p-3 max-w-[500px] w-[100%]'
                required />

              <span className='align-left w-[70%] max-w-[500px] flex justify-start gap-5'><span className='text-xl bolder'>Gender:</span>
                <span><input type="radio" value='male' name='gender' onClick={handleChange} required /> <span className='text-xl'>Male</span></span>
                <span><input type="radio" value='female' name='gender' onClick={handleChange} required /> <span className='text-xl'>female</span></span>
              </span>

              <span>who are you?</span>
              <select name="role" onChange={handleRole} className='border-2 border-black rounded-md p-3 max-w-[500px] w-[100%]' required>
                <option value="passenger">Passenger</option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
              </select>

              <input type="email"
                name='email'
                placeholder='Email'
                onChange={handleChange}
                className='border-2 border-black rounded-md p-3 max-w-[500px] w-[100%]'
                required />

              <input type="number"
                name='phone'
                placeholder='Phone'
                onChange={handleChange}
                className='border-2 border-black rounded-md p-3 max-w-[500px] w-[100%]'
                required />

              <input type="file" 
                name='image'
                placeholder="upload profile photo"
                className='border-2 border-black rounded-md p-3 max-w-[500px] w-[100%]'
                onChange={handleImage}
              />

              <input type="submit"
                name='submit'
                value='submit'
                className='bg-gray-500 w-[100%] max-w-[500px] p-2 rounded text-xl text-white' />

              <p className='text-xl'>Already have an account? <Link to='/Signin' className='text-blue-500 underline cursor-pointer text-xl'>Sign In</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
