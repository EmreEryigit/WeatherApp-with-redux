import CurrentWeather from "./CurrentWeather";
import WeekWeather from "./WeekWeather";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { weatherActions } from "../store/weatherSlice";
import DropDown from "./DropDown";
function Widget() {
  const dispatch = useDispatch();

  const city = useSelector((state) => state.weather.city);

  const getWeather = async () => {
    axios(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.latitude}&lon=${city.longitude}&appid=71299899d2c0b3e4e109ff823a3f6c1d`
    )
      .then((res) => dispatch(weatherActions.setCurrentWeather(res.data)))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getWeather();
  }, [city]);
  getWeather();

  const today = new Date();

  const hour = today.getHours();

  let cardClasses;
  if (hour < 6 || hour > 20) {
    cardClasses = "night";
  }
  return (
    <>
      <DropDown />

      <div
        className={`card shadow-lg border ${cardClasses}`}
        style={{ backgroundColor: "black" }}
      >
        <div className="card-body">
          <CurrentWeather />
        </div>

        <div className="card-footer">
          <WeekWeather />
        </div>
      </div>
    </>
  );
}

export default Widget;
