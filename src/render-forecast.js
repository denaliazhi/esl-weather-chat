/**
 * This module manipulates the forecast
 * section of the DOM
 */

function renderForecast(day, loc) {
  setLocation(loc);
  setTemp(day);
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

function setTemp(day) {
  const temp = document.querySelector("#temp");
  temp.textContent = day.farenheit;
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

export default renderForecast;
