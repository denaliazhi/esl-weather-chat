/**
 * This module handles the user's interactions with
 * the website and determines an appropriate response
 */

import "./styles.css";
import getWeatherData from "./weather-api.js";
import splitByDay from "./daily-forecasts.js";
import { renderForecast, setTemp } from "./render-forecast.js";
import { renderChat, setTempInChat } from "./render-chat.js";

async function handler() {
  // Determine content to show on page load
  let location = localStorage.getItem("lastSearch")
    ? localStorage.getItem("lastSearch")
    : "New York, NY";

  const input = document.querySelector("input");
  input.setAttribute("placeholder", location);

  // Set default temperature unit
  let unit = "imperial";

  // Index [0-2] in forecasts array, representing
  // the day for which the forecast is rendered
  let dayToRender = 1;

  let forecasts = await search(location, unit, dayToRender);
  console.log(forecasts);

  // Handle user's new search
  const searchBtn = document.querySelector("button");

  searchBtn.addEventListener("click", () => {
    let place = formatInput(input.value);
    if (!isValidInput(place)) {
      alert("Invalid input. Use format: city*, state, country. * = required.");
      return;
    }

    search(place, unit, dayToRender)
      .then((resp) => {
        forecasts = resp;
      })
      .catch((err) => {
        alert(`We couldn't get the forecast for this location. ${err}`);
      });
  });

  // Handle temperature toggle
  const toggle = document.querySelector(".toggle div");
  const indicator = toggle.querySelector("div");
  const labels = document.querySelectorAll(".toggle p");

  toggle.addEventListener("click", () => {
    switchUnit();
    setTemp(forecasts[dayToRender], unit);
    setTempInChat(forecasts[dayToRender], unit);
  });

  function switchUnit() {
    if (toggle.id === "imperial") {
      // Switching to metric (celsius)
      indicator.style.marginLeft = "auto";
      labels[0].style.color = "var(--translucent)";
      labels[1].style.color = "white";
      toggle.id = "metric";
    } else {
      // Switching to imperial (farenheit)
      indicator.style.removeProperty("margin-left");
      labels[0].style.color = "white";
      labels[1].style.color = "var(--translucent)";
      toggle.id = "imperial";
    }
    unit = toggle.id;
  }

  // Handle nav button for previous day's forecast
  const prev = document.querySelector("#prev");
  prev.addEventListener("click", () => {
    if (dayToRender === 0) return;

    dayToRender--;
    renderForecast(forecasts[dayToRender], unit);
    renderChat(forecasts[dayToRender], unit);
  });

  // Handle nav button for next day's forecast
  const next = document.querySelector("#next");
  next.addEventListener("click", () => {
    if (dayToRender === forecasts.length - 1) return;

    dayToRender++;
    renderForecast(forecasts[dayToRender], unit);
    renderChat(forecasts[dayToRender], unit);
  });
}

async function search(loc, unit, dayToRender) {
  try {
    // Fetch current weather data for location
    const data = await getWeatherData(loc);

    // Split forecast data by day
    const dailyForecasts = splitByDay(data);

    // Update last searched location in local storage
    localStorage.setItem("lastSearch", data.resolvedAddress);

    // Render current day's forecast
    dayToRender = 1;
    renderForecast(dailyForecasts[dayToRender], unit);
    renderChat(dailyForecasts[dayToRender], unit);

    // Return array of forecasts (prev, curr, and next day)
    return dailyForecasts;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function isValidInput(str) {
  // Check that string only has these characters
  const regex = /^[a-zA-Z,\s]+$/;
  if (!regex.test(str)) return false;

  return true;
}

function formatInput(str) {
  str = str.trim();
  // Trim commas
  str = str.replace(/^,+|,+$/g, "");
  return str;
}

handler();
