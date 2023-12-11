import {createSlice} from "@reduxjs/toolkit"

export const alertSlice = createSlice({
    name: "alerts",
    initialState: {
        loading: false,
    },
    reducers:{
        //Actions --> We can use it in any part of the project
        showLoading: (state) => {
            state.loading = true
        },
        hideLoading: (state) => {
            state.loading = false
        }
    }
})

export const {showLoading,hideLoading} = alertSlice.actions