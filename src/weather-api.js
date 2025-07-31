/**
 * This module gets weather data for a given
 * location from https://www.visualcrossing.com/
 */

import moment from "moment";

// Free API key exposed in this project
const key = "JWBFXXUEHSFZ6CMGKQR6SFNKQ";

async function getWeatherData(loc) {
  const [startDate, endDate] = getDateRange();

  try {
    const resp = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc}/${startDate}/${endDate}?unitGroup=us&include=days&key=${key}&iconset=icons2&contentType=json`
    );
    const data = await resp.json();
    return data;
  } catch (err) {
    throw new Error("Weather data not found.");
  }
}

function getDateRange() {
  let start = new Date();
  start.setDate(start.getDate() - 1);
  start = moment(start).format("YYYY-MM-DD");

  let end = new Date();
  end.setDate(end.getDate() + 1);
  end = moment(end).format("YYYY-MM-DD");

  return [start, end];
}

export default getWeatherData;
