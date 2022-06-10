import { useSelector } from "react-redux";

function CurrentWeather(props) {
  const weather = useSelector((state) => state.weather.currentWeather);
  const city = useSelector((state) => state.weather.city);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    let day = (Math.floor(UNIX_timestamp / 86400) + 4) % 7;
    let gün = days[day];
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      date +
      " " +
      month +
      " " +
      year +
      " " +
      gün +
      " " +
      hour +
      ":" +
      min +
      ":" +
      sec;
    return time;
  }

  const cels = (F) => {
    return Math.round(F - 273) + " °C";
  };

  const time = timeConverter(weather.dt);
  const isLoading = useSelector((state) => state.weather.isLoading);
  const weekIsLoading = useSelector((state) => state.weather.weekIsLoading);

  if (isLoading || weekIsLoading) {
    return <div>Loading...</div>;
  }
  const today = new Date();

  const hour = today.getHours();

 
  let cardClasses;
  if (hour < 6 || hour > 20) {
    cardClasses = "night";
  }

  return (
    <div
      className={`card border shadow-lg ${cardClasses}`}
      style={{ width: "100%", margin: "2rem 0 0 ", height: "15rem" }}
    >
      <nav>
        <b>
          <h1>{city.name}</h1>
        </b>
      </nav>
      <div className="row my-auto">
        <div className="col-md-4 my-auto">
          <h1>{cels(weather.main.temp)}</h1>
        </div>
        <div className="col-md-4">
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            className="card-img"
            alt="..."
            style={{ width: "8rem" }}
          />
        </div>
        <div className="col-md-4 my-auto d-grid gap-3">
          <div>{time} </div>

          <div>Wind {weather.wind.speed} m/s</div>
          <div>{}</div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
