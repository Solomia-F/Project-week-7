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
  let urlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  console.log(urlForecast);
  axios.get(url).then(refreshWeather);
  axios.get(urlForecast).then(displayForecast);
  axios.get(url).then(changeBackground);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  search(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  console.log(response.data);

  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <div class="weather-forecast-icon">
            <img src="${
              day.condition.icon_url
            }" class="weather-forecast-icon" />
            </div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">${Math.round(
                day.temperature.maximum
              )}°</div>
              <div class="weather-forecast-temperature">${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
          </div>`;
    }
  });

  forecastElement.innerHTML = forecastHtml;
}

function changeBackground(response) {
  let condition = response.data.condition.icon;

  console.log(condition);

  if (condition === "clear-sky-day") {
    document.getElementById("bg-img").style.backgroundImage =
      "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/144/597/original/sun-rays-cloudy-sky_%281%29.jpg?1727007945')";
  } else if (condition === "few-clouds-day") {
    document.getElementById("bg-img").style.backgroundImage =
      "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/144/475/original/cloudy-sky-daylight-background.jpg?1726923284')";
  } else if (condition === "scattered-clouds-day") {
    document.getElementById("bg-img").style.backgroundImage =
      "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/144/473/original/blue-sky-with-white-clouds-background.jpg?1726923265')";
  } else if (condition === "broken-clouds-day") {
    document.getElementById("bg-img").style.backgroundImage =
      "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/144/599/original/closeup-large-gray-clouds.jpg?1727009773')";
  } else if (condition === "shower-rain-day") {
    document.getElementById("bg-img").style.backgroundImage =
      "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/144/604/original/camper-window-with-rain-drops_%281%29.jpg?1727010534')";
  } else if (condition === "rain-day") {
    document.getElementById("bg-img").style.backgroundImage =
      "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/144/596/original/rain-outside-windows-villa.jpg?1727007304')";
  } else if (condition === "thunderstorm-day") {
    document.getElementById("bg-img").style.backgroundImage =
      "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/144/479/original/mesmerizing-scene-lightning-thunderstorm-night.jpg?1726923331')";
  } else if (condition === "snow-day") {
    document.getElementById("bg-img").style.backgroundImage =
      "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/144/482/original/snow-setting-on-a-pine-tree.-photo-p-parnxoxo.jpg?1726923365')";
  } else if (condition === "mist-day") {
    document.getElementById("bg-img").style.backgroundImage =
      "url('https://s3.amazonaws.com/shecodesio-production/uploads/files/000/144/478/original/les-tuman-utro-proseka-tumannoe-utro-tumannyi-les-oboi.jpg?1726923318')";
  }
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

search("Bristol");
