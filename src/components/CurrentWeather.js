import {useSelector} from "react-redux"

function CurrentWeather(props) {
    const weather = useSelector(state => state.weather.currentWeather)
    const city = useSelector(state => state.weather.city)
  
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
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        let day = (Math.floor(UNIX_timestamp / 86400) + 4)%7
        let gün = days[day]
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + " " + gün + ' ' + hour + ':' + min + ':' + sec ;
        return time;
      }
     
  
      const cels = (F) => {
        return Math.round((F - 273)) + " °C";
      }
  
      const time = timeConverter(weather.dt)
      const isLoading = useSelector(state => state.weather.isLoading)
      const weekIsLoading = useSelector(state => state.weather.weekIsLoading)
    
      if(isLoading || weekIsLoading){
        return  <div>Loading...</div>
      }
      
    
  return (
    <div className="card" style={{width : "100%", height: "15rem"}}>   
        <nav>{city.name}</nav>
        <div className="row">
        <div className="col-md-4"><h1>
        {cels(weather.main.temp)}
        </h1></div>
        <div className="col-md-4">
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} className="card-img" alt="..." style={{width: "80px", alignContent: "center"}}/>
        </div>
        <div className="col-md-4">
            <span>{time} </span>
            <span>Wind{weather.wind.speed}m/s</span>
            <span>{}</span>
        </div>
        </div>
        
        
    </div>
  )
}

export default CurrentWeather