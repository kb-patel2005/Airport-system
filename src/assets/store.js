import { combineReducers, configureStore} from "@reduxjs/toolkit";
import  userSlice from "./Slices/userSlice";
import  staffSlice  from "./Slices/staffSlice";
import flightSlice from "./Slices/flightSlice";


const reducers = combineReducers({
    user: userSlice,
    staff: staffSlice,
    flight: flightSlice
});

const store = configureStore({reducer: reducers});

console.log(store);

export default store;