/**
 * This module splits the weather data into
 * individual Forecast objects by day
 */

// Represents forecast data for a day
class Forecast {
  constructor(obj) {
    this.farenheit = obj.temp;
    this.feelsLike = obj.feelslike;
    this.dewpoint = obj.dew;
    this.precipProb = obj.precipprob;
    this.clouds = obj.cloudcover;
    this.icon = obj.icon;
  }

  get celsius() {
    return (this.farenheit - 32) * (5 / 9);
  }
}

function splitByDay(obj) {
  const allDays = obj.days;
  const forecasts = allDays.map((day) => new Forecast(day));
  console.log(forecasts);
  return forecasts;
}

export default splitByDay;
