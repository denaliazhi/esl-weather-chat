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

  let renderedForecast = await search(location, unit);
  console.log(renderedForecast);

  // Handle user's new search
  const searchBtn = document.querySelector("button");

  searchBtn.addEventListener("click", () => {
    let value = formatInput(input.value);
    if (!isValidInput(value)) {
      alert("Invalid input. Use format: city*, state, country. * = required.");
      return;
    }

    search(value, unit)
      .then((resp) => {
        renderedForecast = resp;
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
    setTemp(renderedForecast, unit);
    setTempInChat(renderedForecast, unit);
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
}

async function search(loc, unit) {
  try {
    // Fetch current weather data for location
    const data = await getWeatherData(loc);

    // Split forecast data by day
    const dailyForecasts = splitByDay(data);

    // Update last searched location in local storage
    const validLoc = data.resolvedAddress;
    localStorage.setItem("lastSearch", validLoc);

    // For current day's forecast:
    renderForecast(dailyForecasts[1], validLoc, unit);
    renderChat(dailyForecasts[1], validLoc, unit);

    return dailyForecasts[1];
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
