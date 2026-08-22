import React, { Suspense, useContext, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { setStaff } from '../Slices/staffSlice';
import { usercontext } from '../Context/usercontext';
import { staffcontext } from '../Context/staffcontext';
import { addData } from '../Slices/userSlice';
import { Helmet } from 'react-helmet';

export default function SignUp() {

  const { passenger, setPassenger } = useContext(usercontext);
  const { staff, setstaff } = useContext(staffcontext);

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
  useEffect(() => {
    // Lazy load GSAP only when this component mounts
    import("gsap").then(({ gsap }) => {
      gsap.fromTo(".animate", { opacity: 0, y: 800 }, { opacity: 1, y: 0, duration: 0.8 });
      gsap.fromTo("form", { opacity: 0, y: 250 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.3 });
    });
  }, []);

  return (
    <section>
      <Helmet>
        <title>Sign Up | Airport System</title>

        <meta
          name="description"
          content="Create your Airport System account to book flights, manage bookings, and enjoy real-time seat maps and flight tracking."
        />

        {/* Don't index authentication page */}
        <meta name="robots" content="noindex, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Sign Up | Airport System" />
        <meta
          property="og:description"
          content="Create your Airport System account to book flights, manage bookings, and enjoy real-time seat maps and flight tracking."
        />
        <meta
          property="og:image"
          content="https://airportsystem.netlify.app/flight_system.webp"
        />
        <meta
          property="og:url"
          content="https://airportsystem.netlify.app/Signup"
        />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sign Up | Airport System" />
        <meta
          name="twitter:description"
          content="Create your Airport System account to book flights, manage bookings, and enjoy real-time seat maps and flight tracking."
        />
        <meta
          name="twitter:image"
          content="https://airportsystem.netlify.app/flight_system.webp"
        />

        {/* Canonical */}
        <link
          rel="canonical"
          href="https://airportsystem.netlify.app/Signup"
        />
      </Helmet>

      <Suspense fallback={<div>Loading...</div>}>
        <div className='flex justify-center items-center w-full flex-col'>
          <div className="sm:text-6xl text-4xl mx-auto animate -rotate-45">✈️</div>

          <div className='relative flex  flex-col justify-center items-center min-w-[350px] py-4 px-5 w-[100%] max-w-[750px] h-[80%] rounded-2xl shadow-lg shadow-gray-400'>
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
            <form className='w-[100%] h-[100%] z-10 p-5'
              onSubmit={async (e) => {
                e.preventDefault();
                if (role === 'passenger') {
                  alert("passenger dispatcher running......");
                  const result = await dispatch(addData(userData));
                  setPassenger(result.payload.passenger);
                  navigate('/Signin');
                } else {
                  const upadatedUserData = { ...userData, role: role };
                  setstaff(upadatedUserData);
                  await dispatch(setStaff(upadatedUserData));
                  navigate('/Signin');
                }
              }}>
              <div className='flex flex-col justify-center items-center h-[100%]  gap-5'>
                <div className='flex flex-col items-center'>

                  <h1 className='text-xl sm:text-2xl font-extrabold mb-2 text-indigo-700'>Create your account</h1>
                  <h3 className='text-[13px] text-black'>sign up to book flight and explore world</h3>
                  <p className="text-xl font-extrabold text-red-700">it is not real website, it is a demo </p>
                </div>

                <div className='w-[100%] max-w-[500px]'>
                  <label htmlFor='username' className='text-sm font-bold'>User Name</label>
                  <input type="text"
                    id='username'
                    name='username'
                    className='border-2 text-sm border-black rounded-md p-2.5 max-w-[500px] w-[100%]'
                    placeholder='User Name'
                    onChange={handleChange}
                    required />
                </div>

                <div className='w-[100%] max-w-[500px]'>
                  <label htmlFor='password' className='text-sm font-bold'>Password</label>
                  <input type="password"
                    id='password'
                    name='password'
                    placeholder='Password'
                    className='border-2 text-sm border-black rounded-md p-2.5 max-w-[500px] w-[100%]'
                    onChange={handleChange}
                    required />
                </div>
                <div className='w-[100%] max-w-[500px]'>
                  <label htmlFor='gender' className='w-[100%] bolder text-sm font-bold'>Gender:</label>
                  <div className='flex gap-3 w-[100%]' id='gender'>
                    <span><input type="radio" value='male' name='gender' onClick={handleChange} required /><span className='ml-1.5 text-sm font-bold'>Male</span></span>
                    <span><input type="radio" value='female' name='gender' onClick={handleChange} required /><span className='ml-1.5 text-sm font-bold'>female</span></span>
                  </div>
                </div>
                <div className='w-[100%] max-w-[500px]'>
                  <label htmlFor='role' className='text-sm font-bold'>role</label>
                  <select id="role" name="role" onChange={handleRole} className='border-2 text-sm border-black rounded-md p-2.5 max-w-[500px] w-[100%]' required>
                    <option value="passenger">Passenger</option>
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>

                <div className='w-[100%] max-w-[500px]'>
                  <label htmlFor='email' className='text-sm font-bold'>Email</label>
                  <input type="email"
                    id='email'
                    name='email'
                    placeholder='Email'
                    onChange={handleChange}
                    className='border-2 text-sm border-black rounded-md p-2.5 max-w-[500px] w-[100%]'
                    required />
                </div>

                <div className='w-[100%] max-w-[500px]'>
                  <label htmlFor='phone' className='text-sm font-bold'>Email</label>
                  <input type="number"
                    id='phone'
                    name='phone'
                    placeholder='Phone'
                    onChange={handleChange}
                    className='border-2 text-sm border-black rounded-md p-2.5 max-w-[500px] w-[100%]'
                    required />
                </div>



                <input type="file"
                  name='image'
                  placeholder="upload profile photo"
                  className='border-2 text-sm border-black rounded-md p-2.5 max-w-[500px] w-[100%]'
                  onChange={handleImage}
                />

                <input type="submit"
                  name='submit'
                  value='submit'
                  className='bg-indigo-700 w-[100%] max-w-[500px] p-1.5 rounded text-xl text-white' />

                <p className='text-sm'>Already have an account? <Link to='/Signin' className='text-indigo-700 underline cursor-pointer text-sm'>Sign In</Link></p>
              </div>
            </form>
            <div className="container mx-auto p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* First square */}
                <div className="flex flex-col bg-white items-center justify-center shadow-lg hover:shadow-2xl rounded-lg p-6">
                  <span className="text-4xl text-blue-500">
                    <svg width="35" height="35" viewBox="0 0 24 24" fill="none">
                      <g clip-path="url(#clip0_403_3275)">
                        <path d="M18.5811 2.14067L12.3161 0.0516681C12.111 -0.016653 11.8893 -0.016653 11.6841 0.0516681L5.41912 2.14067C4.42303 2.47155 3.55654 3.10793 2.94277 3.95938C2.329 4.81083 1.99916 5.83406 2.00012 6.88367V12.0007C2.00012 19.5637 11.2001 23.7407 11.5941 23.9147C11.7219 23.9715 11.8603 24.0008 12.0001 24.0008C12.14 24.0008 12.2783 23.9715 12.4061 23.9147C12.8001 23.7407 22.0001 19.5637 22.0001 12.0007V6.88367C22.0011 5.83406 21.6713 4.81083 21.0575 3.95938C20.4437 3.10793 19.5772 2.47155 18.5811 2.14067ZM20.0001 12.0007C20.0001 17.4557 13.6811 21.0337 12.0001 21.8897C10.3171 21.0367 4.00012 17.4697 4.00012 12.0007V6.88367C4.00018 6.25395 4.1984 5.64021 4.56669 5.12941C4.93498 4.61861 5.45467 4.23666 6.05212 4.03767L12.0001 2.05467L17.9481 4.03767C18.5456 4.23666 19.0653 4.61861 19.4336 5.12941C19.8018 5.64021 20.0001 6.25395 20.0001 6.88367V12.0007Z" fill="oklch(0.52 0.25 278.85)" />
                        <path d="M15.2999 8.30032L11.1119 12.5003L8.86792 10.1603C8.77786 10.0619 8.66901 9.98242 8.54778 9.92667C8.42654 9.87092 8.29538 9.84001 8.16201 9.83573C8.02864 9.83146 7.89577 9.85393 7.77122 9.9018C7.64667 9.94968 7.53296 10.022 7.43679 10.1145C7.34062 10.207 7.26393 10.3178 7.21125 10.4404C7.15856 10.563 7.13095 10.6949 7.13003 10.8283C7.12911 10.9618 7.1549 11.094 7.20589 11.2173C7.25688 11.3407 7.33203 11.4525 7.42692 11.5463L9.73291 13.9463C9.90489 14.1321 10.1128 14.281 10.3439 14.3842C10.5751 14.4873 10.8248 14.5425 11.0779 14.5463H11.1109C11.359 14.5472 11.6047 14.4987 11.8339 14.4038C12.0631 14.3088 12.2711 14.1693 12.4459 13.9933L16.7179 9.72132C16.8112 9.62822 16.8853 9.51764 16.9358 9.39592C16.9864 9.27419 17.0125 9.14369 17.0127 9.01188C17.0128 8.88007 16.987 8.74952 16.9367 8.62769C16.8863 8.50585 16.8125 8.39512 16.7194 8.30182C16.6263 8.20852 16.5157 8.13446 16.394 8.08389C16.2723 8.03332 16.1418 8.00722 16.01 8.00708C15.8782 8.00694 15.7476 8.03277 15.6258 8.08308C15.5039 8.13339 15.3932 8.20721 15.2999 8.30032Z" fill="oklch(0.52 0.25 278.85)" />
                      </g>
                      <defs>
                        <clipPath id="clip0_403_3275">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                  </span>
                  <h3 className="mt-2 text-md font-semibold">Secure Account</h3>
                  <p className="text-center text-[12px] text-gray-400">
                    your data is protected with top security
                  </p>
                </div>

                {/* Second square */}
                <div className="flex flex-col bg-white items-center justify-center shadow-lg rounded-lg hover:shadow-2xl p-6 ">
                  <span className="text-4xl text-red-500">
                    <svg width="40" height="40" viewBox="0 0 281 281" fill="none" >
                      <path d="M126.527 34.0781C133.214 24.1817 147.786 24.1817 154.473 34.0781C162.652 46.1844 178.016 51.1771 191.749 46.1904C202.975 42.1139 214.764 50.6796 214.356 62.6162C213.858 77.2178 223.354 90.2875 237.396 94.3252C248.874 97.6261 253.376 111.485 246.03 120.902C237.044 132.422 237.044 148.578 246.03 160.098C253.376 169.515 248.874 183.374 237.396 186.675C223.354 190.712 213.858 203.782 214.356 218.384C214.764 230.32 202.975 238.886 191.749 234.81C178.016 229.823 162.652 234.816 154.473 246.922C147.786 256.818 133.214 256.818 126.527 246.922C118.348 234.816 102.984 229.823 89.251 234.81C78.0246 238.886 66.2357 230.32 66.6436 218.384C67.1424 203.782 57.6456 190.712 43.6045 186.675C32.1263 183.374 27.6237 169.515 34.9697 160.098C43.956 148.578 43.956 132.422 34.9697 120.902C27.6237 111.485 32.1263 97.6261 43.6045 94.3252C57.6456 90.2875 67.1424 77.2178 66.6436 62.6162C66.2357 50.6796 78.0246 42.1139 89.251 46.1904C102.984 51.1771 118.348 46.1844 126.527 34.0781Z" stroke="oklch(0.52 0.25 278.85)" strokeWidth={15} />
                      <circle cx="103" cy="109" r="20.5" stroke="oklch(0.52 0.25 278.85)" strokeWidth={15} />
                      <circle cx="177" cy="165" r="20.5" stroke="oklch(0.52 0.25 278.85)" strokeWidth={15} />
                      <line x1="96.8799" y1="189.132" x2="170.88" y2="84.6648" stroke="oklch(0.52 0.25 278.85)" strokeWidth={15} />
                    </svg>


                  </span>
                  <h3 className="mt-2 text-md font-semibold">Exclusive Deals</h3>
                  <p className="text-center text-[12px] text-gray-400">
                    get Access to special offers and discounts
                  </p>
                </div>

                {/* Third square */}
                <div className="flex flex-col bg-white items-center justify-center rounded-lg shadow-lg hover:shadow-2xl p-6">
                  <span className="text-4xl text-yellow-500">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                      <path d="M20.9999 12.4236V10.9996C20.9999 8.61269 20.0517 6.3235 18.3638 4.63567C16.676 2.94785 14.3868 1.99963 11.9999 1.99963C9.61294 1.99963 7.32376 2.94785 5.63593 4.63567C3.9481 6.3235 2.99989 8.61269 2.99989 10.9996V12.4236C1.95105 12.8855 1.09269 13.6936 0.568511 14.7127C0.0443322 15.7318 -0.113849 16.9001 0.120447 18.0219C0.354744 19.1437 0.967297 20.151 1.85556 20.8751C2.74382 21.5992 3.85388 21.9962 4.99989 21.9996C5.53032 21.9996 6.03903 21.7889 6.4141 21.4138C6.78918 21.0388 6.99989 20.5301 6.99989 19.9996V13.9996C6.99989 13.4692 6.78918 12.9605 6.4141 12.5854C6.03903 12.2103 5.53032 11.9996 4.99989 11.9996V10.9996C4.99989 9.14312 5.73739 7.36264 7.05014 6.04989C8.3629 4.73713 10.1434 3.99963 11.9999 3.99963C13.8564 3.99963 15.6369 4.73713 16.9496 6.04989C18.2624 7.36264 18.9999 9.14312 18.9999 10.9996V11.9996C18.4695 11.9996 17.9607 12.2103 17.5857 12.5854C17.2106 12.9605 16.9999 13.4692 16.9999 13.9996V19.9996H13.9999C13.7347 19.9996 13.4803 20.105 13.2928 20.2925C13.1052 20.4801 12.9999 20.7344 12.9999 20.9996C12.9999 21.2649 13.1052 21.5192 13.2928 21.7067C13.4803 21.8943 13.7347 21.9996 13.9999 21.9996H18.9999C20.1459 21.9962 21.256 21.5992 22.1442 20.8751C23.0325 20.151 23.645 19.1437 23.8793 18.0219C24.1136 16.9001 23.9554 15.7318 23.4313 14.7127C22.9071 13.6936 22.0487 12.8855 20.9999 12.4236ZM4.99989 19.9996C4.20424 19.9996 3.44118 19.6836 2.87857 19.121C2.31596 18.5583 1.99989 17.7953 1.99989 16.9996C1.99989 16.204 2.31596 15.4409 2.87857 14.8783C3.44118 14.3157 4.20424 13.9996 4.99989 13.9996V19.9996ZM18.9999 19.9996V13.9996C19.7955 13.9996 20.5586 14.3157 21.1212 14.8783C21.6838 15.4409 21.9999 16.204 21.9999 16.9996C21.9999 17.7953 21.6838 18.5583 21.1212 19.121C20.5586 19.6836 19.7955 19.9996 18.9999 19.9996Z" fill="oklch(0.52 0.25 278.85)" />
                    </svg>

                  </span>
                  <h3 className="mt-2 text-md font-semibold">24/7 Support</h3>
                  <p className="text-center text-[12px] text-gray-400">
                    we're here to help you anytime
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </section>
  )
}
