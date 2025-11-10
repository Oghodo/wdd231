/* === weather.js ===
   Displays current weather and 3-day forecast
   Author: Omoregbe Oghodo
*/

const apiKey = "665909e134db00277279afaabddd1662";
const city = "Benin City";
const units = "metric"; // Celsius
const currentTempEl = document.getElementById("current-temp");
const weatherDescEl = document.getElementById("weather-desc");
const forecastEl = document.getElementById("forecast").querySelector("ul");

async function getWeather() {
  try {
    // Current weather
    const currentRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`
    );
    const currentData = await currentRes.json();
    currentTempEl.textContent = `${Math.round(currentData.main.temp)}°C`;
    weatherDescEl.textContent = currentData.weather[0].description;

    // 3-day forecast
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`
    );
    const forecastData = await forecastRes.json();

    // Filter forecast: pick one forecast per day (around 12:00)
    const forecastDays = [];
    const today = new Date().getDate();

    forecastData.list.forEach(item => {
      const date = new Date(item.dt_txt);
      if (date.getHours() === 12 && date.getDate() !== today && forecastDays.length < 3) {
        forecastDays.push({
          day: date.toLocaleDateString("en-US", { weekday: "short" }),
          temp: Math.round(item.main.temp)
        });
      }
    });

    // Populate forecast list
    forecastEl.innerHTML = "";
    forecastDays.forEach(day => {
      const li = document.createElement("li");
      li.textContent = `${day.day}: ${day.temp}°C`;
      forecastEl.appendChild(li);
    });

  } catch (error) {
    console.error("Weather loading failed:", error);
    currentTempEl.textContent = "--";
    weatherDescEl.textContent = "Unable to load weather";
    forecastEl.innerHTML = `<li>--</li><li>--</li><li>--</li>`;
  }
}

getWeather();
