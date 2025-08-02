/**
 * This module manipulates the forecast
 * section of the DOM
 */
import moment from "moment";

function renderForecast(day, tempUnit) {
  setLocation(day.location);
  setDayNav(day);
  setTemp(day, tempUnit);
  setIcon(day);
  setCondition(day);
  setHumidity(day);
  setPrecip(day);
}

function setLocation(loc) {
  const [city, details] = loc.split(",", 2);

  const h2 = document.querySelector("#location h2");
  const p = document.querySelector("#location p");
  h2.textContent = city;
  p.textContent = details;
}

function setTemp(day, tempUnit) {
  const temp = document.querySelector("#temp");
  temp.textContent = tempUnit === "imperial" ? day.farenheit : day.celsius;

  const unit = document.querySelector("#unit");
  unit.textContent = tempUnit === "imperial" ? "°F" : "°C";
}

function setIcon(day) {
  const icon = document.querySelector("#main div");
  const path = getIconPath(day.icon);
  icon.style.backgroundImage = `url(https://openweathermap.org/img/wn/${path}@2x.png)`;
}

// Using icons from https://openweathermap.org/weather-conditions
function getIconPath(icon) {
  switch (icon) {
    case "clear-day":
      return "01d";
    case "clear-night":
      return "01n";
    case "cloudy":
      return "03d";
    case "partly-cloudy-day":
      return "02d";
    case "partly-cloudy-night":
      return "02n";
    case "fog":
    case "wind":
      return "50d";
    case "rain-snow-showers-day":
    case "rain-snow-showers-night":
    case "rain-snow":
    case "rain":
      return "09d";
    case "showers-day":
      return "10d";
    case "showers-night":
      return "10n";
    case "sleet":
    case "hail":
    case "snow-showers-day":
    case "snow-showers-night":
    case "snow":
      return "13d";
    case "thunder-rain":
    case "thunder-showers-day":
    case "thunder-showers-night":
    case "thunder":
      return "11d";
    default:
      return "02d";
  }
}

function setCondition(day) {
  const condition = document.querySelector("#condition");
  const cloudiness = getCondition(day.clouds);
  condition.textContent = cloudiness;
}

function getCondition(clouds) {
  if (clouds > 90) {
    return "Cloudy";
  } else if (clouds < 20) {
    return "Clear";
  } else {
    return "Partly cloudy";
  }
}

function setHumidity(day) {
  const humidity = document.querySelector("#humidity p");
  humidity.textContent = day.dewpoint + "%";
}

function setPrecip(day) {
  const precip = document.querySelector("#precip p");
  precip.textContent = day.precipProb + "%";
}

function setDayNav(day) {
  const time = getRelativeTime(day);
  const dayTitle = document.querySelector("#day");
  switch (time) {
    case 0:
      dayTitle.textContent = "Yesterday";
      break;
    case 1:
      dayTitle.textContent = "Today";
      break;
    case 2:
      dayTitle.textContent = "Tomorrow";
      break;
  }

  const prev = document.querySelector("#prev");
  const next = document.querySelector("#next");

  // Show '<' button if forecast is for today or tomorrow
  prev.textContent = `${time >= 1 ? "<" : ""}`;

  // Show '>' button if forecast is for today or tomorrow
  next.textContent = `${time <= 1 ? ">" : ""}`;
}

function getRelativeTime(day) {
  const forecastDay = moment(day.date);
  const today = moment();

  if (forecastDay.isSame(today, "day")) {
    return 1;
  } else if (forecastDay.isAfter(today, "day")) {
    // Tomorrow
    return 2;
  }
  // Yesterday
  return 0;
}

export { renderForecast, setTemp, getRelativeTime };
