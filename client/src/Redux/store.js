import {configureStore} from "@reduxjs/toolkit"
import { alertSlice } from "./Features/alertSlice"
import { authSlice } from "./Features/auth/authSlice"

export default configureStore({
    reducer:{
        alerts: alertSlice.reducer,
        auth: authSlice.reducer
    }
})