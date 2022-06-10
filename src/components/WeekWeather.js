import React, {useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux"
import { weatherActions } from '../store/weatherSlice'
import axios from 'axios'
import Card from './Card'
function WeekWeather() {
    const weather = useSelector(state => state.weather.weekWeather)
    const weekIsLoading = useSelector(state => state.weather.weekIsLoading)
    const city = useSelector(state => state.weather.city)
    const dispatch = useDispatch()
  
    const getWeeklyWeather = async () => {
        axios(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.latitude}&lon=${city.longitude}&exclude={current,minutely,hourly}&appid=71299899d2c0b3e4e109ff823a3f6c1d`)
        .then(res => dispatch(weatherActions.setWeekWeather(res.data.daily.filter((day, index) => index >0  && index < 5))))
        
        
    }
    useEffect(() => {
        getWeeklyWeather()
    },[city])
    useEffect(() => {
        getWeeklyWeather()
    },[])
    
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];   
      
    function timeConverter(UNIX_timestamp){

        let day = (Math.floor(UNIX_timestamp / 86400) + 4)%7
        let gün = days[day].substring(0,3)
        
        return gün
      }
  
      const cels = (F) => {
        return Math.round((F - 273)) + " °C";
      }
      const isLoading = useSelector(state => state.weather.isLoading)
    
  
    
    

      if( weekIsLoading){
        return  <div>Loading...</div>
      }
      return (
        <div>
        {weather.map(day => (
            <Card day={day} />
        ))}
      
        </div>
      ) 
  

   
  
}

export default WeekWeather