import {createSlice} from "@reduxjs/toolkit"

export const alertSlice = createSlice({
    name: "alerts",
    initialState: {
        loading: false,
    }
})