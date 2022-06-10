import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { weatherActions } from "../store/weatherSlice";
import axios from "axios";
import Card from "./Card";
function WeekWeather() {
  const weather = useSelector((state) => state.weather.weekWeather);
  const weekIsLoading = useSelector((state) => state.weather.weekIsLoading);
  const city = useSelector((state) => state.weather.city);
  const dispatch = useDispatch();

  const getWeeklyWeather = async () => {
    axios(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${city.latitude}&lon=${city.longitude}&exclude={current,minutely,hourly}&appid=71299899d2c0b3e4e109ff823a3f6c1d`
    ).then((res) =>
      dispatch(
        weatherActions.setWeekWeather(
          res.data.daily.filter((day, index) => index > 0 && index < 5)
        )
      )
    );
  };
  useEffect(() => {
    getWeeklyWeather();
  }, [city]);
  useEffect(() => {
    getWeeklyWeather();
  }, []);

  if (weekIsLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {weather.map((day,i) => (
        <Card day={day} key={i} />
      ))}
    </div>
  );
}

export default WeekWeather;
