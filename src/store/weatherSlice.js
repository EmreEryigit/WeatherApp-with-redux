import { createSlice } from "@reduxjs/toolkit";
import cities from "../cities_of_turkey.json"

const weatherSlice = createSlice({
    name: "weather",
    initialState: {
        city: cities[5],
        currentWeather: {},
        weekWeather: [],
        cities: cities,
        isLoading : true,
        weekIsLoading: true

    },
    reducers: {
        setCity: (state, action) => {
            state.city = cities.find(city => city.name === action.payload)
        },
        setCurrentWeather: (state, action) => {
            state.currentWeather = action.payload
            state.isLoading = false
        },
        setWeekWeather: (state, action) => {
            state.weekWeather = action.payload
            state.weekIsLoading = false
            
        },
       
       
    }
})

export default weatherSlice
export const weatherActions = weatherSlice.actions