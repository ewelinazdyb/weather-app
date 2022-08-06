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

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#todays-temp");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(fahrenheiTemperature)}°F`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#todays-temp");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let celsiusTemperature = null;

function showCityData(response) {
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
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

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  console.log(response.data);
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

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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
