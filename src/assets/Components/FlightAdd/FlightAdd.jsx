import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { flightRoutes } from '../flightRotes';
import { addFlight } from '../../Slices/flightSlice';

export default function FlightAdd() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [data, setData] = useState({
        airline: "",
        origincountry: "",
        originstate: "",
        origincity: "",
        destinationcountry: "",
        destinationstate: "",
        destinationcity: "",
        price: ""
    });

    const allcountry = flightRoutes.map(e => e.from.country);
    const uniquecountry = [...new Set(allcountry)];

    const state = flightRoutes.filter(e => e.from.country == data.origincountry);
    const dstate = flightRoutes.filter(e => e.from.country == data.destinationcountry);

    const city = flightRoutes.filter(e => e.from.state == data.originstate);
    const dcity = flightRoutes.filter(e => e.from.state == data.destinationstate);

    const handleClick = (e) => {
        let { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    }

    const handleCountryChange = (e) => {
        setData({
            ...data,
            origincountry: e.target.value,
            originstate: "",
            origincity: ""
        });
    };

    const dhandleCountryChange = (e) => {
        setData({
            ...data,
            destinationcountry: e.target.value,
            destinationstate: "",
            destinationcity: ""
        });
    };

    const handleStateChange = (e) => {
        setData({
            ...data,
            originstate: e.target.value,
            origincity: ""
        });
    };

    const dhandleStateChange = (e) => {
        setData({
            ...data,
            destinationstate: e.target.value,
            destinationcity: ""
        });
    };

    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = sessionStorage.getItem("user");
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            if (parsedUser.role !== "admin") {
                navigate('/');
            }
        } else {
            navigate('/');
        }
    }, [navigate]);

    if (!user || user.role !== "admin") return null;


    return (

        <div className='w-screen h-[70vh] flex justify-center items-center'>
            <div className='flex justify-center items-center w-[90%] h-[80%] max-w-[750px] border-2 border-black rounded-lg shadow-lg shadow-gray-400'>
                <form
                    onSubmit={async () => {
                        try {
                            await dispatch(addFlight(data));
                        } catch (error) {
                            console.error("Error adding flight:", error);
                        }
                    }}
                    className='w-[100%] h-[100%] p-5'>
                    <div className='flex flex-col justify-center items-center h-[100%] gap-5'>
                        <h1 className='text-4xl sm:text-6xl font-bold'>Add Fight</h1>
                        <br />

                        <input type="text"
                            placeholder='airline'
                            name='airline'
                            value={data.airline}
                            className='border-2 border-black rounded-md p-3 max-w-[500px] w-[100%]'
                            onChange={handleClick}
                            required />
                        <div>
                            <p className='text-xl text-left'>set origin:</p>
                            <div className='flex'>

                                <select name="origincountry"
                                    className='border-2 border-black rounded-md p-2 mx-1 w-full'
                                    onChange={
                                        handleCountryChange
                                    }
                                    required
                                >
                                    <option>select country</option>
                                    {uniquecountry.map((e, index) =>
                                    (
                                        <option key={index} value={e}>{e}</option>
                                    )
                                    )}
                                </select>

                                <select
                                    name="originstate"
                                    className="border-2 border-black rounded-md p-2 mx-1 w-full"
                                    value={data.originstate}
                                    onChange={handleStateChange}
                                    required
                                >
                                    <option value="">select state</option>
                                    {state.map((e, index) => (
                                        <option key={index} value={e.from.state}>
                                            {e.from.state}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    name="origincity"
                                    className="border-2 border-black rounded-md p-2 w-full mx-1"
                                    value={data.origincity}
                                    onChange={handleClick}
                                    required
                                >
                                    <option value="">select city</option>
                                    {city.map((e, index) => (
                                        <option key={index} value={e.from.city}>
                                            {e.from.city}
                                        </option>
                                    ))}
                                </select>

                            </div>
                        </div>
                        <div>
                            <p className='text-xl text-left'>set destination:</p>
                            <div className='flex'>

                                <select name="destinationcountry"
                                    className='border-2 border-black rounded-md p-2 mx-1 w-full'
                                    onChange={
                                        dhandleCountryChange
                                    }
                                    value={data.destinationcountry}
                                    required
                                >
                                    <option>select country</option>
                                    {uniquecountry.map((e, index) =>
                                    (
                                        <option key={index} value={e}>{e}</option>
                                    )
                                    )}
                                </select>

                                <select
                                    name="destinationstate"
                                    className="border-2 border-black rounded-md p-2 mx-1 w-full"
                                    onChange={dhandleStateChange}
                                    value={data.destinationstate}
                                    required
                                >
                                    <option value="">select state</option>
                                    {dstate.map((e, index) => (
                                        <option key={index} value={e.from.state}>
                                            {e.from.state}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    name="destinationcity"
                                    className="border-2 border-black rounded-md p-2 w-full mx-1"
                                    onChange={handleClick}
                                    value={data.destinationcity}
                                    required
                                >
                                    <option value="">select city</option>
                                    {dcity.map((e, index) => (
                                        <option key={index} value={e.from.city}>
                                            {e.from.city}
                                        </option>
                                    ))}
                                </select>

                            </div>
                        </div>
                        <input
                            type="number"
                            name='price'
                            value={data.destination}
                            onChange={handleClick}
                            placeholder='ticket price'
                            className='border-2 border-black rounded-md p-2 max-w-[500px] w-[100%]'
                            required />

                        <input type="submit" name='submit' value='submit' className='bg-gray-500 w-[100%] max-w-[500px] p-2 rounded text-xl text-white' />
                    </div>
                </form>
            </div>
        </div>
    )
}