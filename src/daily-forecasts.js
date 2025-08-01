/**
 * This module splits the weather data into
 * individual Forecast objects by day
 */

// Represents forecast data for a day
class Forecast {
  constructor(obj, loc) {
    this.location = loc;
    this.date = obj.datetime;
    this.farenheit = obj.temp;
    this.feelsLike = obj.feelslike;
    this.dewpoint = obj.dew;
    this.precipProb = obj.precipprob;
    this.clouds = obj.cloudcover;
    this.icon = obj.icon;
  }

  get celsius() {
    // Converts and rounds to 1 decimal place
    return Math.round((this.farenheit - 32) * (5 / 9) * 10) / 10;
  }
}

function splitByDay(obj) {
  const location = obj.resolvedAddress;
  const allDays = obj.days;
  const forecasts = allDays.map((day) => new Forecast(day, location));
  console.log(forecasts);
  return forecasts;
}

export default splitByDay;
