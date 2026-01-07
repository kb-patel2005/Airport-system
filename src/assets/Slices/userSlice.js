import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addData = createAsyncThunk(
    'user/addData',
    async (data) => {
        try {
            console.log("Inside addData thunk:", data);
            const pass = new FormData();
            pass.append("username", data.username);
            pass.append("password", data.password);
            pass.append("gender", data.gender);
            pass.append("email", data.email);
            pass.append("phone", data.phone);
            pass.append("image", data.image);
            await axios.post("https://airport-system-api-p7mk.onrender.com/api/addPassenger", pass, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            return data;
        } catch (error) {
            alert("Error adding data:", error);
            console.error("Error adding data:", error);
            return error;
        }
    }
);

export const updateSeatNo = createAsyncThunk(
    'user/updateSeatNo',
    async (data) => {
        try {
            await axios.put("https://airport-system-api-p7mk.onrender.com/api/addFlight", data);
            //  await axios.put("http://localhost:8080/api/addFlight", data);
            return data;
        } catch (error) {
            console.error('Error during add flight:', error);
        }
    }
);

const removeData = async (id) => {
    await axios.delete(`https://airport-system-api-p7mk.onrender.com/deletePassenger/${id}`);
};

const fetchData = async (loginData) => {
    const response = await axios.post('https://airport-system-api-p7mk.onrender.com/api/passengerLogin', loginData);
    const data = response.json();
    console.log(data);
    return data;
};

export const userSlice = createSlice({
    name: "user",
    initialState: { user: null, flight: {}, loading: true, error: null },
    reducers: {
        clearUser(state, action) {
            removeData(action.payload);
        },
        findUser(state, action) {
            fetchData(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateSeatNo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateSeatNo.fulfilled, (state, action) => {
                state.loading = false;
                state.flight = action.payload.flight;
            })
            .addCase(updateSeatNo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addData.fulfilled, (state, action) => {
                state.loading = false;
                console.log("Data added successfully:", action.payload);
            })
            .addCase(addData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { setUser, clearUser, findUser, setFlight } = userSlice.actions;
export default userSlice.reducer;