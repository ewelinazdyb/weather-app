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

function convertCelToFarClick() {
  event.preventDefault();
  let changeToF = document.querySelector("#todays-temp");
  changeToF.innerHTML = `80°F`;
}

let convertCelToFar = document.querySelector("#cel-to-far");
convertCelToFar.addEventListener("click", convertCelToFarClick);

function convertFarToCelClick() {
  event.preventDefault();
  let changeToC = document.querySelector("#todays-temp");
  changeToC.innerHTML = `26°C`;
}

let convertFarToCel = document.querySelector("#far-to-cel");
convertFarToCel.addEventListener("click", convertFarToCelClick);

function showCityData(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector("#todays-temp");
  cityTemp.innerHTML = `${temperature}°C`;

  let humidity = Math.round(response.data.main.humidity);
  let cityHumidity = document.querySelector("#humidity");
  cityHumidity.innerHTML = `${humidity}%`;

  let windSpeed = Math.round(response.data.wind.speed);
  let cityWindSpeed = document.querySelector("#wind-speed");
  cityWindSpeed.innerHTML = `${windSpeed}m/s`;

  let conditions = response.data.weather[0].main;
  let cityConditions = document.querySelector("#conditions");
  cityConditions.innerHTML = `${conditions.toLowerCase()}`;
}

function fetchCityData() {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  let city = capitalizeFirstLetter(searchInput.value);

  let apiKey = `07c8d029e683ec94d2784e3188d6f11d`;
  let apiUrlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=${apiKey}&units=metric`;

  axios.get(apiUrlSearch).then(showCityData);
}

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

citySearchForm.addEventListener("submit", fetchCityData);

function showCurrentCityData(response) {
  let currentCityName = response.data.name;
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = `${currentCityName.toUpperCase().trim()}`;

  let temperature = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector("#todays-temp");
  cityTemp.innerHTML = `${temperature}°C`;

  let humidity = Math.round(response.data.main.humidity);
  let cityHumidity = document.querySelector("#humidity");
  cityHumidity.innerHTML = `${humidity}%`;

  let windSpeed = Math.round(response.data.wind.speed);
  let cityWindSpeed = document.querySelector("#wind-speed");
  cityWindSpeed.innerHTML = `${windSpeed}m/s`;

  let conditions = response.data.weather[0].main;
  let cityConditions = document.querySelector("#conditions");
  cityConditions.innerHTML = `${conditions.toLowerCase()}`;
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
