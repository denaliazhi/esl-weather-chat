/**
 * This module manipulates the chat
 * section of the DOM
 */

// prettier-ignore
function renderChat(day, loc) {
  const chat = document.querySelector("#chat");
  clearChat(chat);

  chat.appendChild(setBubble(
    "Tom",
    "received",
    `How's the weather in ${loc.split(",", 2)[0]}?`
  ));
  chat.appendChild(setBubble(
    "You",
    "sent",
    `It's ${describeTemp(day.feelsLike)} today.`
  ));

  chat.appendChild(setBubble(
    "Tom",
    "received",
    "What's the temperature?"
  ));
  chat.appendChild(setBubble(
    "You",
    "sent",
    `It's ${day.farenheit} degrees.`
  ));

  chat.appendChild(setBubble(
    "Tom",
    "received",
    "Is it humid outside?"
  ));
  chat.appendChild(setBubble(
    "You",
    "sent",
    describeHumidity(day.dewpoint)
  ));

  chat.appendChild(setBubble(
    "Tom",
    "received",
    "Will it rain?"
  ));
  chat.appendChild(setBubble(
    "You",
    "sent",
    describeRain(day.precipProb)
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
  text.textContent = content;
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
  if (dew > 70) {
    return "Yes, it's very humid.";
  } else if (dew > 60) {
    return "Yes, it's humid.";
  } else if (dew > 55) {
    return "It's comfortable.";
  } else {
    return "No, it isn't humid.";
  }
}

function describeRain(prob) {
  if (prob === 100) {
    return "It's raining right now.";
  } else if (prob > 60) {
    return "Yes, it probably will rain.";
  } else if (prob > 40) {
    return "It might rain.";
  } else if (prob > 10) {
    return "No, it probably won't rain.";
  } else {
    return "No, it won't rain.";
  }
}

export default renderChat;
