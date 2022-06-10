import React from "react";

function Card(props) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayConv = (UNIX_timestamp) => {
    let day = (Math.floor(UNIX_timestamp / 86400) + 4) % 7;
    let gün = days[day].substring(0, 3);
    return gün;
  };
  const cels = (F) => {
    return Math.round(F - 273) + " °C";
  };
  const today = new Date();
  const hour = today.getHours();

  
  let cardClasses;
  if (hour < 6 || hour > 20) {
    cardClasses = "night";
  }

  return (
    <div className={`d-inline-block card mx-2 border shadow ${cardClasses}`}>
      <section>{dayConv(props.day.dt)}</section>
      <img
        src={`http://openweathermap.org/img/wn/${props.day.weather[0].icon}@2x.png`}
        alt=""
      />
      <article>{cels(props.day.temp.day)}</article>
    </div>
  );
}

export default Card;
