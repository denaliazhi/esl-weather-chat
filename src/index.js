/**
 * This module handles the user's interactions with
 * the website and determines an appropriate response
 */

import "./styles.css";
import getWeatherData from "./weather-api.js";
import splitByDay from "./daily-forecasts.js";
import renderForecast from "./render-forecast.js";
import renderChat from "./render-chat.js";

function handler() {
  // Determine content to show on page load
  let location = localStorage.getItem("lastSearch")
    ? localStorage.getItem("lastSearch")
    : "New York, NY";

  const input = document.querySelector("input");
  input.setAttribute("placeholder", location);

  search(location);

  // Handle new search
  const searchBtn = document.querySelector("button");

  searchBtn.addEventListener("click", () => {
    let value = formatInput(input.value);
    if (!isValidInput(value)) {
      alert("Invalid input. Use format: city*, state, country. * = required.");
      return;
    }

    search(value).catch((err) => {
      alert(`We couldn't get the forecast for this location. ${err}`);
    });
  });
  // Handle temperature toggle
  const toggle = document.querySelector(".toggle div");
  const indicator = toggle.querySelector("div");
  const labels = document.querySelectorAll(".toggle p");
  console.log(labels);

  toggle.addEventListener("click", () => {
    console.log(toggle.id);
    // TO DO: move the following DOM manipulation into separate function
    if (toggle.id === "f") {
      console.log("converting to celsius");
      indicator.style.marginLeft = "auto";
      labels[0].style.color = "var(--translucent)";
      labels[1].style.color = "white";
      // TO DO: call func to convert temp display
      toggle.id = "c";
    } else {
      console.log("converting to farenheit");
      indicator.style.removeProperty("margin-left");
      labels[0].style.color = "white";
      labels[1].style.color = "var(--translucent)";
      // TO DO: call func to convert temp display
      toggle.id = "f";
    }
  });
}

async function search(loc) {
  try {
    // Fetch current weather data for location
    const data = await getWeatherData(loc);

    // Split forecast data by day
    const dailyForecasts = splitByDay(data);

    // Update last searched location in local storage
    const validLoc = data.resolvedAddress;
    localStorage.setItem("lastSearch", validLoc);

    // For current day's forecast:
    renderForecast(dailyForecasts[1], validLoc);
    renderChat(dailyForecasts[1], validLoc);
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
