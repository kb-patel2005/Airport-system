import { useState, useEffect, useContext, use } from 'react';
import { Link } from 'react-router-dom';
import { ImAirplane } from 'react-icons/im';
import { VscMenu } from 'react-icons/vsc';
import { GoX } from 'react-icons/go';
import { usercontext } from '../../Context/usercontext';
import { staffcontext } from '../../Context/staffcontext';

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
    <div className='flex justify-between items-center p-5 w-full relative'
      style={{ background: 'linear-gradient(180deg, #99cbe6, transparent)' }}>
      {/* Logo */}
      <div>
        <h1 className='flex items-center gap-2'>
          <Link to='/' className='flex items-center'>
            <svg width="130" height="80" viewBox="0 0 274 187" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28.5862 128.396L204.25 22.1643C224.492 9.9234 250.157 16.7941 261.576 37.5105C267.71 48.6384 263.082 63.0111 251.632 68.3963L48.2392 164.052L60.734 186.72L28.5862 128.396Z" fill="#6B5DFF" />
              <path d="M222.801 74.4487L185.182 142.698C174.289 162.461 149.804 169.016 130.494 157.338V157.338L187.837 53.3043L222.801 74.4487Z" fill="#6B5DFF" />
              <path d="M96.4359 68.817C98.9192 51.3876 115.033 39.4626 132.427 42.1817L171.234 48.248L166.737 79.8067L96.4359 68.817V68.817Z" fill="#6B5DFF" />
              <path d="M0.00247518 101.249L16.8292 93.8204L82.0492 147.815L37.7808 171.592L0.00247518 101.249Z" fill="#6B5DFF" />
              <path d="M88.7887 132.119L76.5155 108.992L79.316 107.506L85.4047 118.979L85.6757 118.835L89.9761 101.849L93.6349 99.907L89.4607 115.495L105.908 123.034L102.52 124.832L88.775 118.348L87.6101 123.135L91.5893 130.633L88.7887 132.119ZM108.866 105.052L110.185 107.536L100.067 112.906L98.7481 110.422L108.866 105.052ZM121.661 114.674L118.725 116.232L114.944 88.5986L117.835 87.0644L138.6 105.685L135.664 107.243L118.421 91.4423L118.24 91.5382L121.661 114.674ZM117.951 105.065L129.785 98.7843L131.104 101.269L119.269 107.549L117.951 105.065ZM132.729 79.16L145.003 102.287L142.202 103.773L129.929 80.6462L132.729 79.16ZM150.618 99.307L138.345 76.18L146.159 72.033C147.966 71.0742 149.613 70.5958 151.1 70.5979C152.583 70.5924 153.886 70.9763 155.011 71.7497C156.135 72.5231 157.059 73.5911 157.782 74.9537C158.505 76.3163 158.868 77.6725 158.87 79.0221C158.872 80.3717 158.457 81.6532 157.625 82.8668C156.789 84.0728 155.475 85.1512 153.683 86.102L147.359 89.458L146.017 86.9285L152.25 83.6205C153.485 82.9653 154.383 82.2572 154.944 81.4963C155.512 80.7315 155.79 79.9279 155.778 79.0856C155.768 78.2318 155.518 77.3419 155.027 76.416C154.535 75.49 153.933 74.7726 153.219 74.2638C152.505 73.7549 151.668 73.5141 150.708 73.5412C149.744 73.5607 148.637 73.9021 147.387 74.5653L142.463 77.1782L153.418 97.8208L150.618 99.307ZM155.99 83.1409L167.195 90.5096L163.943 92.2355L152.828 84.8189L155.99 83.1409ZM170.958 88.5125L158.685 65.3855L161.486 63.8993L172.44 84.5419L183.191 78.8368L184.509 81.3211L170.958 88.5125ZM179.373 54.4068L191.646 77.5337L188.846 79.0199L176.572 55.893L179.373 54.4068ZM203.327 41.6946L215.6 64.8215L212.89 66.2598L190.651 54.7895L190.425 54.9093L200.062 73.0676L197.261 74.5538L184.988 51.4268L187.698 49.9886L210.006 61.4801L210.232 61.3602L200.572 43.1568L203.327 41.6946ZM221.204 61.8476L208.931 38.7206L222.888 31.3136L224.207 33.7979L213.05 39.7188L217.197 47.5332L227.631 41.9958L228.949 44.4802L218.515 50.0175L222.686 57.877L234.024 51.8603L235.342 54.3446L221.204 61.8476Z" fill="white" />
            </svg>
            <span className='text-xl text-blue-800'>KRISH</span>
          </Link>
        </h1>
      </div>

      {/* Menu Icon */}
      <div className='sm:hidden font-extrabold'>
        <VscMenu
          className='cursor-pointer '
          style={{ fontSize: '25px', color: 'black' , fontWeight: 'bold'}}
          onClick={() => setMenuOpen(true)}
        />
      </div>

      {/* Navigation Menu */}
      <div
        className={`${menuOpen ? 'right-0' : 'right-[-50vw]'
          } fixed top-0 h-screen w-[50vw] sm:static sm:h-auto sm:w-auto bg-[radial-gradient(black, transparent)] backdrop-blur-2xl text-black sm:bg-transprent sm:text-black sm:backdrop-blur-none flex flex-col sm:flex-row transition-all duration-300 ease-in-out z-50`}
      >
        <ul className='p-5 sm:p-0 flex flex-col sm:flex-row gap-4 z-50'>
          {/* Close Icon */}
          <span className='cursor-pointer sm:hidden font-bold'>
            <GoX
              style={{ fontSize: '25px', color: 'black' , fontWeight: 'bold'}}
              onClick={() => setMenuOpen(false)}
            />
          </span>

          {/* Links */}

          <div className='sm:hidden w-[100%] items-center flex justify-center'>
            <div className='flex sm:hidden w-[50%] h-[100%] min-h-[100px] rounded-[50%] border border-black ml-4 cursor-pointer overflow-hidden justify-center items-center'
              onClick={() => {
                Object.keys(data).length === 0 ? setShow(false) : setShow(!show);
              }
              }
            >
              <img src={Object.keys(data).length === 0 ? `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBZKfdACXnytnsP84UBvpKKamPtmITFajBlpq3F3m8eOr63XToI0mmPnc&shttps://placehold.co/175x175` : `data:image/jpeg;base64,${data.image}`}
                className='h-[100%] w-[100%] object-cover'
                alt='' />
            </div>
          </div>

          <li className='py-3 sm:p-2'><Link to="/" className='py-5 sm:p-2 text-blue-700 font-bold'>Home</Link></li>
          <li className='py-3 sm:p-2'><Link to="/about" className='py-5 sm:p-2 text-blue-700 font-bold'>About</Link></li>
          <li className='py-3 sm:p-2'><Link to="/flights" className='py-5 sm:p-2 text-blue-700 font-bold'>Flight</Link></li>
          <li className='py-3 sm:p-2'><Link to="/passengerFlight" className='py-5 sm:p-2 text-blue-700 font-bold'>booking</Link></li>
          <li className='py-3 sm:p-2'><Link to="/signin" className='py-5 sm:p-2 text-blue-700 font-bold'>Sign In</Link></li>
          <div className='hidden sm:flex w-[40px] h-[40px] rounded-[50%] border border-black ml-4 cursor-pointer overflow-hidden justify-center items-center'
            onMouseEnter={() => {
              const notuser = Object.keys(data).length === 0;
              notuser ? setShow(false) :
                setShow(!show);
            }
            }
            onMouseLeave={() => {
              const notuser = Object.keys(data).length === 0;
              notuser ? setShow(false) :
                setShow(!show);
            }
            }>
            <img src={Object.keys(data).length === 0 ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBZKfdACXnytnsP84UBvpKKamPtmITFajBlpq3F3m8eOr63XToI0mmPnc&shttps://placehold.co/175x175" : `data:image/jpeg;base64,${data.image}`}
              className='h-[100%] w-[100%] object-cover'
              alt='' />
            {/* {`data:image/jpeg;base64,${user.image}`} */}
          </div>

          {
            show ? (
              <div
                style={{ width: "max-content" }}
                className="px-10 py-5 object-cover bg-blue-800 rounded-[33px] shadow-[7px_7px_4px_0px_rgba(0,0,0,0.25)] outline outline-1 outline-offset-[-1px] outline-zinc-400 inline-flex justify-center items-center gap-2.5 position absolute top-20 right-10 z-50 bg-white">
                <div className=" inline-flex flex-col justify-start items-center gap-3">
                  <div className='self-end text-2xl cursor-pointer' onClick={() => setShow(false)}><GoX /></div>
                  <div className="inline-flex justify-start items-center gap-2.5">
                    <div className="flex justify-start items-center gap-2.5">
                      <img className="w-20 h-20 rounded-[50%] border border-black" src={data.image === null ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBZKfdACXnytnsP84UBvpKKamPtmITFajBlpq3F3m8eOr63XToI0mmPnc&shttps://placehold.co/175x175" : `data:image/jpeg;base64,${data.image}`} />
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col justify-start items-start gap-4">
                    <div className="self-stretch justify-start text-black text-[16px] font-medium ">Name : {data.username}</div>
                    <div className="self-stretch justify-start text-black text-[16px] font-medium ">Phone: {data.phone}</div>
                    <div className="self-stretch justify-start text-black text-[16px] font-medium">Email: {data.email}</div>
                    <div className="self-stretch justify-start text-black  font-medium ">Gender: {data.gender}</div>
                  </div>
                </div>
              </div>) : ""
          }
        </ul>
      </div>
    </div>
  );
}