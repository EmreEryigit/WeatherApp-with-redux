
import CurrentWeather from './CurrentWeather'
import WeekWeather from './WeekWeather'
import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {weatherActions} from "../store/weatherSlice"
function Widget() {
    const dispatch = useDispatch()
   
    const city = useSelector(state => state.weather.city)
    const weekWeather = useSelector(state => state.weather.weekWeather)
    const getWeather = async () => {
        axios(`https://api.openweathermap.org/data/2.5/weather?lat=${city.latitude}&lon=${city.longitude}&appid=71299899d2c0b3e4e109ff823a3f6c1d`)
        .then(res => dispatch(weatherActions.setCurrentWeather(res.data)))
        .catch(e => console.log(e))
    }
    useEffect(() => {
        
        getWeather()
      
    },[city])
    getWeather()
    
  
    console.log(weekWeather)
    
  return (
    <div className='card shadow-lg border'>
    <div className="card-body">
        <CurrentWeather />
    </div>
        
        <div className="card-footer">
        <WeekWeather />
        </div>
        
    
        
    </div>
  )
}

export default Widget