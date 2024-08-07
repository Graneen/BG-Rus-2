import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../../src/redux/store";


export interface estimationGame {
    result: number; 
    rateArr: number;
}

export interface feedBack {
    [x: string]: any;
    createdAt: string;
    description: string;
    game_id: number;
    id: number;
    updatedAt: string;
    user_id: number;
}

export interface GameCard {
    id: number;
    poster: string;
    image1: string;
    image2: string;
    video: string;
    title: string;
    genre: string;
    theme: string;
    year: string;
    author: string;
    description: string;
    difficulty: string;
    players: string;
    minPlayers: number;
    maxPlayers: number;
    time: string;
}

export interface boardGame {
    boardGame: GameCard;
    estimationGame: estimationGame;
    feedBackGame: feedBack[];
    
}

export interface boardGameState {
    list: boardGame,
    loading: boolean,
    error: null | string
}



const initialState : boardGameState  = {
    list: {
        boardGame: {
            id: 0,
            poster: "",
            image1: "",
            image2: "",
            video: "",
            title: "",
            genre: "",
            theme: "",
            year: "",
            author: "",
            description: "",
            difficulty: "",
            players: "",
            minPlayers: 0,
            maxPlayers: 0,
            time: ""
        },
        estimationGame: {
            result: 0,
            rateArr: 0,
        },
        feedBackGame: []
    },
    loading: false,
    error: null
}


export const getGameCard = createAsyncThunk("cards/getGameCard", async(payload: string, {rejectWithValue})=> { 
    
    try {
        const card = await axios(`${import.meta.env.VITE_REACT_APP_API_URL}/boardgame/${payload}`);
        return card.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

// export const takeFavorite = createAsyncThunk("cards/takeFavorite", async(data, {rejectWithValue})=> { 
    
//     try {
//         const inFavorite = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/favorites`, data);
//         console.log(inFavorite.data)
//         return inFavorite.data;
//     } catch (error) {
//         return rejectWithValue(error);
//     }
// });

const gameCardSlice = createSlice ({
    name: 'gameCard',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(getGameCard.pending, (state => {
            state.loading = true,
            state.error = null
        }))
        .addCase(getGameCard.fulfilled, ((state, action) => {
            state.loading = false,
            state.error = null,
            state.list = action.payload
        }))
        .addCase(getGameCard.rejected, ((state, action) => {
            state.error = action.payload as string,
            state.loading = false
        }))
        // .addCase(takeFavorite.fulfilled, ((state, action) => {
        //     state.statusFav = action.payload
        // }))

    }
})

export default gameCardSlice.reducer


export const selectGameCard = (state: RootState) => state.getGameCard

// export const selectFavorite = (state: RootState) => state.takeFavorite

export const selectGameCardError = (state: RootState) => state.getGameCard.error

export const selectGameCardLoading = (state: RootState) => state.getGameCard.loading