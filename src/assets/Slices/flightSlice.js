import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setPassengerSeat } from "./staffSlice";

export const addFlight = createAsyncThunk(
    "flight/addFlight",
    async (data, { getState, dispatch }) => {
        dispatch(setPassengerSeat(data.seatNo));
        await axios.post('https://airport-system-api-p7mk.onrender.com/addFlight', data, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
    }
);

const removeFlight = async (id) => {
    axios.delete(`https://airport-system-api-p7mk.onrender.com/deleteFlight/${id}`);
};

export const getFlight = createAsyncThunk(
    "flight/getFlight",
    async (id) => {
        const response = await axios.get(`https://airport-system-api-p7mk.onrender.com/public/flight/${id}`);
        const data = response.data;
        console.log('Fetched flight info:', data);
        return response.data;
    });

const fetchFlight = async (id) => {
    const response = await axios.get(`https://airport-system-api-p7mk.onrender.com/public/flight/${id}`);
    const data = response.data;
    return data;
};

const fetchAllFlights = async () => {
    try {
        const response = await axios.get('https://airport-system-api-p7mk.onrender.com/public/allFlights');
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
    initialState: { flights: [], flightInfo: [], scheduleId: "", isFlightAdded: false },
    reducers: {
        setFlight(state, action) {
            addFlight(action.payload);
            state.flightInfo = action.payload;
            state.isFlightAdded = true;
        },
        setFlightInfo(state, action) {
            state.flightInfo = action.payload;
        },
        clearFlight(state, action) {
            removeFlight(action.payload);
        },
        getallflights(state, action) {
            state.flights = action.payload;
        },
        setSchduleId(state,action) {
            state.scheduleId = action.payload;
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
            .addCase(getFlight.fulfilled, (state, action) => {
                state.flightInfo = action.payload;
            })
    },
});

export const { setFlight, clearFlight, getallflights, setFlightInfo, setSchduleId } = flightSlice.actions;
export default flightSlice.reducer;