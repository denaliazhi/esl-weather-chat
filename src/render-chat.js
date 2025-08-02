/**
 * This module manipulates the chat
 * section of the DOM
 */

import { getRelativeTime } from "./render-forecast";

let time, verbTense;

// prettier-ignore
function renderChat(day, tempUnit) {
  // Set verb tense in chat messages based on
  // forecast day relative to today
  time = getRelativeTime(day);
  verbTense = time == 0 ? "was" : time == 1 ? "is" : "will be";

  const chat = document.querySelector("#chat");
  clearChat(chat);

  chat.appendChild(setBubble(
    "Tom",
    "received",
    time != 2 ? `How ${verbTense} the weather in <span>${day.location.split(",", 2)[0]}</span> ${(time == 0) ? "yesterday" : "today"}?` :
    `How will the weather be in <span>${day.location.split(",", 2)[0]}</span> tomorrow?`
  ));
  chat.appendChild(setBubble(
    "You",
    "sent",
    `It ${verbTense} <span>${describeTemp(day.feelsLike)}</span>.`
  ));

  chat.appendChild(setBubble(
    "Tom",
    "received",
    `What ${verbTense} the temperature?`
  ));
  const temp = (tempUnit === "imperial") ? day.farenheit : day.celsius;
  chat.appendChild(setBubble(
    "You",
    "sent",
    `It ${verbTense} <span>${temp}</span> degrees.`
  ));

  chat.appendChild(setBubble(
    "Tom",
    "received",
    time != 2 ? `${verbTense.charAt(0).toUpperCase() + verbTense.slice(1)} it humid outside?` :
    "Will it be humid outside?" 
  ));
  chat.appendChild(setBubble(
    "You",
    "sent",
    `<span>${describeHumidity(day.dewpoint)}</span>`
  ));

  chat.appendChild(setBubble(
    "Tom",
    "received",
    time == 0 ? "Did it rain?" :
    time == 1 ? "Is it raining?" :
    "Will it rain?"
  ));
  chat.appendChild(setBubble(
    "You",
    "sent",
    `<span>${describeRain(day.precipProb)}</span> The chance of rain ${verbTense} <span>${day.precipProb}</span> percent.`
  ));
}

function clearChat(chat) {
  chat.replaceChildren();
}

function setBubble(label, status, content) {
  const container = document.createElement("div");

  const name = document.createElement("p");
  name.textContent = label;

  const bubble = document.createElement("div");
  bubble.classList.add(status);

  const text = document.createElement("p");
  text.innerHTML = content;
  bubble.appendChild(text);

  container.append(name, bubble);
  return container;
}

function describeTemp(temp) {
  if (temp > 78) {
    return "hot";
  } else if (temp > 64) {
    return "warm";
  } else if (temp > 50) {
    return "cool";
  } else {
    return "cold";
  }
}

function describeHumidity(dew) {
  if (dew > 65) {
    return `Yes, it ${verbTense} humid.`;
  } else if (dew > 50) {
    return `It ${verbTense} comfortable.`;
  } else {
    return `No, it ${verbTense} not humid.`;
  }
}

function describeRain(prob) {
  const rainTense =
    time == 0 ? "it rained." : time == 1 ? "it is raining." : "it will rain.";
  if (prob > 70) {
    return `Yes, I think ${rainTense}`;
  } else if (prob > 40) {
    return `I'm not sure ${rainTense}`;
  } else {
    return `I don't think ${rainTense}`;
  }
}

function setTempInChat(day, tempUnit) {
  const sent = document.querySelectorAll(".sent")[1];
  const temp = sent.querySelector("p");
  const newTemp = tempUnit === "imperial" ? day.farenheit : day.celsius;
  temp.innerHTML = `It ${verbTense} <span>${newTemp}</span> degrees.`;
}

export { renderChat, setTempInChat };
