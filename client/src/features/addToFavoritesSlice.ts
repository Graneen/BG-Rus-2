import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../redux/store";

export interface data {
    id: string;
    user_id: number;
    toggler: boolean;
}


export interface favoritesState {
    gameId: string,
    statusFav: boolean,
}
const initialState : favoritesState  = {
    gameId: '',
    statusFav: false,
}

export const takeFavorites = createAsyncThunk("cards/takeFavorites", async(data, {rejectWithValue})=> { 
    
    try {
        const inFavorites = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/favorites/add`, data);
        return inFavorites.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});
console.log(takeFavorites)
const takeFavoritesSlice = createSlice ({
    name: 'inFavorites',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(takeFavorites.fulfilled, ((state, action) => {
            state.statusFav = action.payload
        }))
    }
})

export default takeFavoritesSlice.reducer

export const selectFavoritesCard = (state: RootState) => state.takeFavorites
