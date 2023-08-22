import { authSlice } from './authSlice';
import { configureStore } from '@reduxjs/toolkit';
import { emailSlice } from './emailSlice';
const store=configureStore({
    reducer:{
        auth:authSlice.reducer,
        email:emailSlice.reducer,
        
    }
})
export default store;