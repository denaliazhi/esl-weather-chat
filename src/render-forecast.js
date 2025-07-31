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
  icon.style.backgroundImage = `url(${path})`;
}
function getIconPath(day) {}

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
