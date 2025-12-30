import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addData = async (data) => {
    try {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        axios.post('http://localhost:8080/api/addPassenger', formData, {
            headers: {

            }
        });
        console.log("Data added successfully:", response.data);
    } catch (error) {
        console.error("Error adding data:", error);
        throw error;
    }
};

export const updateSeatNo = createAsyncThunk(
    'user/updateSeatNo',
    async (data) => {
        try {
            const response = await axios.put("http://localhost:8080/api/addFlight", data);
            return response.data;
        } catch (error) {
            console.error('Error during add flight:', error);
        }
    }
);

const removeData = async (id) => {
    await axios.delete(`http://localhost:8080/deletePassenger/${id}`);
};

const fetchData = async (loginData) => {
    const response = await axios.post('http://localhost:8080/passengerLogin', loginData);
    const data = response.json();
    console.log(data);
    return data;
};

export const userSlice = createSlice({
    name: "user",
    initialState: { user: null, flight: {}, loading: true, error: null },
    reducers: {
        setUser(state, action) {
            addData(action.payload);
        },
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
                console.log("Flight added successfully:", action.payload, state);
                // state.flight = action.payload.flight;
            })
            .addCase(updateSeatNo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { setUser, clearUser, findUser, setFlight } = userSlice.actions;
export default userSlice.reducer;