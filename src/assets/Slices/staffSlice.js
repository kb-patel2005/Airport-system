import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const addStaff = async (data) => {
    console.log(data.image);
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key]);
    }
    axios.post('https://airport-system-api-p7mk.onrender.com/staffRegister',formData, {
      headers: {
        
      }
    });
    alert("Staff added successfully");
};

const removeStaff = async (id) => {
    axios.delete(`https://airport-system-api-p7mk.onrender.com/staffLogout/${id}`);
};

export const findData = createAsyncThunk(
    'staff/findData',
    async (loginData, thunkAPI) => {
        if (!loginData) return null;

        const endpoint =
            loginData.role === 'passenger'
                ? 'https://airport-system-api-p7mk.onrender.com/api/passengerLogin'
                : 'https://airport-system-api-p7mk.onrender.com/staffLogin';

        try {
            const response = await axios.post(endpoint, loginData);
            return { ...response.data };
        } catch (error) {
            console.error('Error during login:', error);
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }

    }
);

export const staffSlice = createSlice({
    name: "staff",
    initialState: { staff: null, passenger: {}, role: null, loading: true, error: null },
    reducers: {
        setStaff(state, action) {
            addStaff(action.payload);
        },
        clearStaff(state, action) {
            removeStaff(action.payload);
        },
        setFlightToPassenger(state, action) {
            state.passenger = {...state.passenger ,seatno: action.payload.seatno, flight: action.payload.flight};
        },
        setPassengerSeat(state, action) {
            state.passenger = {...state.passenger , seatno: action.payload};
        },
        deleteflightfrompassenger(state, action) {
            state.passenger = {...state.passenger , flight: null , seatno: null};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(findData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(findData.fulfilled, (state, action) => {
                state.loading = false;
                if (Object.keys(action.payload).length === 0 || action.payload === null) {
                    state.staff = null;
                    state.passenger = null;
                    state.role = null;
                } else {
                    if (action.payload.role === "staff" || action.payload.role === "admin") {
                        sessionStorage.setItem('user', JSON.stringify(action.payload));
                        state.staff = action.payload;
                        state.role = action.payload.role;
                    } else {
                        state.passenger = action.payload;
                        state.role = action.payload.role;
                    }
                }
            })
            .addCase(findData.rejected, state => {
                state.loading = false;
                state.error = "Failed to fetch data";
            });
    }
});

export const { setStaff, clearStaff, getmember, setPassengerSeat, deleteflightfrompassenger, setFlightToPassenger } = staffSlice.actions;
export default staffSlice.reducer;