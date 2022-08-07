let currentDate = new Date();

function formatDate(date) {
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekdays[date.getDay()];

  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day} ${hour}:${minute}`;
}

let dateText = document.querySelector("#date-time-text");
dateText.innerHTML = formatDate(currentDate);

function changeCityDisplayed() {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");

  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = `${searchInput.value.toUpperCase().trim()}`;
}

let citySearchForm = document.querySelector("#search-city-form");
citySearchForm.addEventListener("submit", changeCityDisplayed);

function showSearchCityData(response) {
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  let cityTemp = document.querySelector("#todays-temp");
  cityTemp.innerHTML = `${temperature}`;

  let humidity = Math.round(response.data.main.humidity);
  let cityHumidity = document.querySelector("#humidity");
  cityHumidity.innerHTML = `${humidity}%`;

  let windSpeed = Math.round(response.data.wind.speed);
  let cityWindSpeed = document.querySelector("#wind-speed");
  cityWindSpeed.innerHTML = `${windSpeed}m/s`;

  let conditions = response.data.weather[0].main;
  let cityConditions = document.querySelector("#conditions");
  cityConditions.innerHTML = `${conditions.toLowerCase()}`;

  getForecast(response.data.coord);
}

function fetchCityData() {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  let city = capitalizeFirstLetter(searchInput.value);

  let apiKey = `07c8d029e683ec94d2784e3188d6f11d`;
  let apiUrlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=${apiKey}&units=metric`;

  axios.get(apiUrlSearch).then(showSearchCityData);
}

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

citySearchForm.addEventListener("submit", fetchCityData);

function showCurrentCityData(response) {
  let currentCityName = response.data.name;
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = `${currentCityName.toUpperCase().trim()}`;

  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  let cityTemp = document.querySelector("#todays-temp");
  cityTemp.innerHTML = `${temperature}`;

  let humidity = Math.round(response.data.main.humidity);
  let cityHumidity = document.querySelector("#humidity");
  cityHumidity.innerHTML = `${humidity}%`;

  let windSpeed = Math.round(response.data.wind.speed);
  let cityWindSpeed = document.querySelector("#wind-speed");
  cityWindSpeed.innerHTML = `${windSpeed}m/s`;

  let conditions = response.data.weather[0].main;
  let cityConditions = document.querySelector("#conditions");
  cityConditions.innerHTML = `${conditions.toLowerCase()}`;

  getForecast(response.data.coord);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `07c8d029e683ec94d2784e3188d6f11d`;
  let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrlCurrent).then(showCurrentCityData);
}

navigator.geolocation.getCurrentPosition(showPosition);

function currentButtonClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentButtonClick);

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return weekdays[date.getDay()];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weekly-forecast");
  let days = ["Sun", "Mon", "Tues", "Thurs", "Fri"];
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
       <div class="col">
              <p class="weekday">${formatForecastDay(forecastDay.dt)}</p>
              <i class="fa-solid fa-sun sun-icon"></i>
              <p class="small-temps"><span class="max">${Math.round(
                forecastDay.temp.max
              )}°</span> <span class="min">${Math.round(
          forecastDay.temp.min
        )}°</span></p>
            </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKey = `07c8d029e683ec94d2784e3188d6f11d`;
  let apiUrlForecast = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrlForecast).then(displayForecast);
}
