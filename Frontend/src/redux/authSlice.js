import { createSlice } from "@reduxjs/toolkit";
//createslice simplifies the process of managing state by combining reducers, actions, and initial state into a single structure.

const authSlice = createSlice({
    name:'auth',
    initialState:{
        loading:false,
        user:null          //null is there because user is an object that will contain many values
    },
    reducers:{
        //actions
        setLoading:(state,action) => {
            state.loading = action.payload;
        },
        setAuthUser:(state,action) => {
            state.user = action.payload;
        }
    }

});

export const {
    setLoading,
    setAuthUser
} = authSlice.actions;

export default authSlice.reducer;