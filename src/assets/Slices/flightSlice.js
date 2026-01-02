import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setPassengerSeat } from "./staffSlice";

export const addFlight = createAsyncThunk(
    "flight/addFlight",
    async(data,{getState,dispatch})=>{
        dispatch(setPassengerSeat(data.seatNo));
        await axios.post('https://airport-system-api-p7mk.onrender.com/addFlight', data);
    }
);

export const updateFlight = createAsyncThunk(
    "flight/updateFlight",
    async(data)=>{
        await axios.put('https://airport-system-api-p7mk.onrender.com/updateFlight', data);
    }
);

const removeFlight = async (id) => {
    axios.delete(`https://airport-system-api-p7mk.onrender.com/deleteFlight/${id}`);
};

const fetchFlight = async (id) => {
    const response = await axios.get(`https://airport-system-api-p7mk.onrender.com/flight/${id}`);
    const data = response.data;
    return data;
};

const fetchAllFlights = async () => {
    try {
        const response = await axios.get('https://airport-system-api-p7mk.onrender.com/allFlights');
        const data = response.data;
        return data;
    } catch (error) {
        return [];
    }
}

export const getAllFlightsThunk = () => async (dispatch) => {
  const data = await fetchAllFlights();
  dispatch(getallflights(data)); // dispatch reducer with plain array
};

export const flightSlice = createSlice({
    name: "flight",
    initialState: { flights:[] ,flightInfo:[] ,bussinessSeat:[] ,ecomomicsSeat:[] ,isFlightAdded: false },
    reducers: {
        setFlight(state, action) {
            addFlight(action.payload);
            state.flightInfo = action.payload;
            state.isFlightAdded = true;
        },
        clearFlight(state, action) {
            removeFlight(action.payload);
        },
        getFlight(state, action) {
            const flight = fetchFlight(action.payload);
            if (flight) {
                state.flightInfo = flight;
                state.bussinessSeat = JSON.parse(flight.bussinessClass);
                state.ecomomicsSeat = JSON.parse(flight.economicClass);
                return flight;
            } else {
                state.flightInfo = null;
                return null;
            }
        },
        getallflights(state, action) {
            state.flights = action.payload; 
        }
    },
    extraReducers: (builder) => {
        builder.
            addCase(addFlight.fulfilled, (state) => {
                state.isFlightAdded = true;
            })
            .addCase(addFlight.rejected, (state) => {
                state.isFlightAdded = false;
            })
            .addCase(addFlight.pending, (state) => {
                state.isFlightAdded = false;
            })
    },
});

export const { setFlight, clearFlight, getFlight, getallflights } = flightSlice.actions;
export default flightSlice.reducer;