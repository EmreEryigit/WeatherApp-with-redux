import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { weatherActions } from "../store/weatherSlice";

function DropDown() {
  const dispatch = useDispatch();
  const city = useSelector((state) => state.weather.city);
  const cities = useSelector((state) => state.weather.cities);

  return (
    <div>
      <div className="dropdown my-2">
        <button
          className="btn btn-info dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {city.name}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {cities.map((city) => (
            <li
              className="dropdown-item"
              key={city.id}
              value={city.name}
              onClick={(e) => dispatch(weatherActions.setCity(city))}
            >
              {city.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DropDown;
