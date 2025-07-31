/**
 * This module handles the user's interactions with
 * the website and determines an appropriate response
 */

import "./styles.css";
import getWeatherData from "./weather-api.js";
// import splitByDay from "./split-forecast-data.js";
// import renderForecast from "./render-forecast.js";
// import renderChat from "./render-chat.js";

function handler() {
  // Determine content to show on page load
  let location = localStorage.getItem("lastSearch")
    ? localStorage.getItem("lastSearch")
    : "New York, NY";

  search(location);

  // Handle new search
  const input = document.querySelector("input");
  const searchBtn = document.querySelector("button");

  searchBtn.addEventListener("click", () => {
    if (!isValidInput(input.value)) {
      alert(
        "Invalid input. Please follow this format: city, state (optional), country (optional)"
      );
      return;
    }

    location = input.value;
    try {
      search(location);
    } catch (err) {
      alert(`Sorry, we couldn't get the forecast for this location. ${err}`);
    }
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

function search(loc) {
  // getWeatherData("New York,NY").then((resp) => {
  // console.log(resp);
  // });
  // Fetch current weather data for location
  // Split data into individual Forecast obj
  // Update last searched location in local storage
  // For current day's forecast:
  //    Update forecast widget
  //    Update chat widget
}

function isValidInput(str) {
  // Trim white spaces
  str = str.trim();
  // Trim commas
  str = str.replace(/^,+|,+$/g, "");

  console.log(str);
  // Check that string only has these characters
  const regex = /^[a-zA-Z,\s]+$/;
  if (!regex.test(str)) return false;

  return true;
}

function formatInput(str) {}

handler();
