function refreshWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let city = document.querySelector("#weather-app-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let updateTimeElement = document.querySelector("#last-update-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  city.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  updateTimeElement.innerHTML = updateTime(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/H`;
  temperatureElement.innerHTML = `${Math.round(temperature)}°`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"
 class="current-weather-icon" /> `;
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let dates = date.getDate();
  let day = days[date.getDay()];
  let month = months[date.getMonth()];

  return `${day} | ${dates} ${month}`;
}

function updateTime(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `Last update: ${hours}:${minutes}`;
}

function search(city) {
  let apiKey = "da86o89f290fa6e48t8fe94b9553bb0f";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  console.log(url);
  axios.get(url).then(refreshWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  search(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

search("Bristol");
