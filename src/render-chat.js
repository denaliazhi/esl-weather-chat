/**
 * This module manipulates the chat
 * section of the DOM
 */

// prettier-ignore
function renderChat(day, loc, tempUnit) {
  const chat = document.querySelector("#chat");
  clearChat(chat);

  chat.appendChild(setBubble(
    "Tom",
    "received",
    `How's the weather in <span>${loc.split(",", 2)[0]}</span>?`
  ));
  chat.appendChild(setBubble(
    "You",
    "sent",
    `It's <span>${describeTemp(day.feelsLike)}</span> today.`
  ));

  chat.appendChild(setBubble(
    "Tom",
    "received",
    "What's the temperature?"
  ));
  const temp = (tempUnit === "imperial") ? day.farenheit : day.celsius;
  chat.appendChild(setBubble(
    "You",
    "sent",
    `It's <span>${temp}</span> degrees.`
  ));

  chat.appendChild(setBubble(
    "Tom",
    "received",
    "Is it humid outside?"
  ));
  chat.appendChild(setBubble(
    "You",
    "sent",
    `<span>${describeHumidity(day.dewpoint)}</span>`
  ));

  chat.appendChild(setBubble(
    "Tom",
    "received",
    "Will it rain?"
  ));
  chat.appendChild(setBubble(
    "You",
    "sent",
    `<span>${describeRain(day.precipProb)}</span>`
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
    return "Yes, it's humid.";
  } else if (dew > 50) {
    return "It's comfortable.";
  } else {
    return "No, it's not humid.";
  }
}

function describeRain(prob) {
  if (prob > 60) {
    return "Yes, I think it will rain.";
  } else if (prob > 40) {
    return "I'm not sure. It might rain.";
  } else {
    return "No, I don't think it will rain.";
  }
}

function setTempInChat(day, tempUnit) {
  const sent = document.querySelectorAll(".sent")[1];
  const temp = sent.querySelector("p");
  const newTemp = tempUnit === "imperial" ? day.farenheit : day.celsius;
  temp.textContent = `It's ${newTemp} degrees.`;
}

export { renderChat, setTempInChat };
