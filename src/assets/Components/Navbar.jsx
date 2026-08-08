import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { VscMenu } from 'react-icons/vsc';
import { GoX } from 'react-icons/go';
import { AiOutlineUser } from 'react-icons/ai';
import { usercontext } from '../Context/usercontext';
import { staffcontext } from '../Context/staffcontext';

export default function Navbar() {

  const [show, setShow] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const [data, setData] = useState({});

  const { passenger, setPassenger } = useContext(usercontext);
  const { staff, setStaff } = useContext(staffcontext);

  useEffect(() => {
    Object.keys(passenger).length === 0 ? setData(staff) : Object.keys(staff).length === 0 ? setData(passenger) : setData(null);
  }, [passenger, staff]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  return (

    <nav
      className="flex justify-between items-center p-5 w-full relative"
      aria-label="Main navigation">
      {/* Logo */}
      <div>
        <h1 className='flex items-center gap-2'>
          <Link to='/' className='flex items-center w-15'>
            <img
              src="/flight_system.webp"
              alt="Airport System"
              width="50"
              height="50"
              decoding="async"
              className="h-[50px] w-[50px]"
            />
            <span className='text-2xl font-bold text-blue-700 ml-2'><i>SkyConnect</i></span>
          </Link>
        </h1>
      </div>

      <div className="sm:hidden">
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
          className="cursor-pointer"
        >
          <VscMenu
            className="text-2xl text-black font-bold"
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Navigation Menu */}
      <div
        className={`${menuOpen ? 'right-0' : 'right-[-50vw]'
          } fixed top-0 h-screen w-[50vw] sm:static sm:h-auto sm:w-auto bg-[radial-gradient(black, transparent)] backdrop-blur-2xl text-black sm:bg-transprent sm:text-black sm:backdrop-blur-none flex flex-col sm:flex-row transition-all duration-300 ease-in-out z-50`}
      >
        <ul className='p-5 sm:p-0 flex flex-col sm:flex-row gap-4 z-50'>
          {/* Close Icon */}
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
            className="sm:hidden cursor-pointer rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <GoX
              className="text-2xl text-black"
              aria-hidden="true"
            />
          </button>

          {/* Links */}

          <div className='sm:hidden w-[100%] items-center flex justify-center'>
            <button
              type="button"
              aria-label="Open profile menu"
              className="flex sm:hidden w-[50%] h-[100%] min-h-[100px] rounded-full border border-black ml-4 overflow-hidden justify-center items-center"
              onClick={() => {
                Object.keys(data).length === 0
                  ? setShow(false)
                  : setShow(!show);
              }}
            >
              {Object.keys(data).length === 0 ? <AiOutlineUser className='h-[100%] w-[100%] object-cover' /> : <img src={`data:image/jpeg;base64,${data.image}`} alt="User profile" />}
            </button>
          </div>

          <li className='py-3 sm:p-2'><Link to="/" className="py-5 sm:p-2 text-blue-900 font-normal rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li className='py-3 sm:p-2'><Link to="/about" className="py-5 sm:p-2 text-blue-900 font-normal rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setMenuOpen(false)}>About</Link></li>
          <li className='py-3 sm:p-2'><Link to="/flights" className="py-5 sm:p-2 text-blue-900 font-normal rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setMenuOpen(false)}>Flight</Link></li>
          <li className='py-3 sm:p-2'><Link to="/passengerFlight" className="py-5 sm:p-2 text-blue-900 font-normal rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setMenuOpen(false)}>booking</Link></li>
          <li className='py-3 sm:p-2'><Link to="/signin" className="py-5 sm:p-2 text-blue-900 font-normal rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setMenuOpen(false)}>Sign In</Link></li>
          <button
            type="button"
            aria-label="User profile"
            className="hidden sm:flex w-[40px] h-[40px] rounded-full border border-black ml-4 overflow-hidden justify-center items-center"
            onMouseEnter={() => { Object.keys(data).length === 0 ? setShow(false) : setShow(!show); }}
            onMouseLeave={() => { Object.keys(data).length === 0 ? setShow(false) : setShow(!show); }}>
            {Object.keys(data).length === 0 ? <AiOutlineUser className='h-[100%] w-[100%] object-cover' /> : <img src={`data:image/jpeg;base64,${data.image}`} alt='userProfile pic'></img>}
          </button>

          {show ? (
            <div style={{ width: "max-content" }}
              className="px-10 py-5 object-cover rounded-[33px] shadow-[7px_7px_4px_0px_rgba(0,0,0,0.25)] outline-offset-[-1px] outline-zinc-400 inline-flex justify-center items-center gap-2.5 position absolute top-20 right-10 z-50 bg-white">
              <div className=" inline-flex flex-col justify-start items-center gap-3">
                <button
                  type="button"
                  aria-label="Close profile"
                  className="self-end text-2xl"
                  onClick={() => setShow(false)}
                >
                  <GoX aria-hidden="true" />
                </button>
                <div className="inline-flex justify-start items-center gap-2.5">
                  <div className="flex justify-start items-center gap-2.5">
                    <img
                      className="w-20 h-20 rounded-full border border-black"
                      src={data.image ? `data:image/jpeg;base64,${data.image}` : "/flight_system.png"}
                      alt="User profile"
                    />
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-4">
                  <div className="self-stretch justify-start text-black text-[16px] font-medium ">Name : {data.username}</div>
                  <div className="self-stretch justify-start text-black text-[16px] font-medium ">Phone: {data.phone}</div>
                  <div className="self-stretch justify-start text-black text-[16px] font-medium">Email: {data.email}</div>
                  <div className="self-stretch justify-start text-black  font-medium ">Gender: {data.gender}</div>
                </div>
              </div>
            </div>) : ""}
        </ul>
      </div >
    </nav >
  );
}