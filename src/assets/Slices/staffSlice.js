import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const addStaff = async (data) => {
    const formData = new FormData();

    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("gender", data.gender);
    formData.append("role", data.role);
    formData.append("phone", data.phone);
    formData.append("email", data.email);

    formData.append("image", data.image);

    const response = await axios.post(
        "https://airport-system-api-p7mk.onrender.com/auth/staffRegister",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
    );

    alert("Staff added successfully");
    return response.data;
};


const removeStaff = async (id) => {
    const response = await axios.delete(`https://airport-system-api-p7mk.onrender.com/staffLogout`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
};

export const findData = createAsyncThunk(
    'staff/findData',
    async (loginData, thunkAPI) => {
        if (!loginData) return null;

        const endpoint =
            loginData.role === 'passenger'
                ? 'https://airport-system-api-p7mk.onrender.com/auth/passengerLogin'
                : 'https://airport-system-api-p7mk.onrender.com/auth/staffLogin';

        try {
            const response = await axios.post(endpoint, loginData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }

    }
);

export const staffSlice = createSlice({
    name: "staff",
    initialState: { staff: null, passenger: {}, role: null, loading: true, error: null },
    reducers: {
        setStaff(state, action) {
            const result = addStaff(action.payload);
            state.staff = result.staff;
            localStorage.setItem('token', result.token);
        },
        clearStaff(state, action) {
            const result = removeStaff(action.payload);
            state.staff = result.staff;
            localStorage.removeItem('token');
        },
        setFlightToPassenger(state, action) {
            state.passenger = { ...state.passenger, seatno: action.payload.seatno, flight: action.payload.flight };
        },
        setPassengerSeat(state, action) {
            state.passenger = { ...state.passenger, seatno: action.payload };
        },
        deleteflightfrompassenger(state) {
            state.passenger = { ...state.passenger, flight: null, seatno: null };
        },
        setRole(state, action) {
            state.role = action.payload;
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
                        state.passenger = action.payload.passenger;
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

export const { setStaff, clearStaff, getmember, setPassengerSeat, deleteflightfrompassenger, setFlightToPassenger, setRole } = staffSlice.actions;
export default staffSlice.reducer;