/* ==============================================
   weather.js
   Benin City Chamber of Commerce Weather Display
   Author: Omoregbe Oghodo
============================================== */

const weatherEl = document.getElementById("weather");
const forecastEl = document.getElementById("forecast");

const apiKey = "665909e134db00277279afaabddd1662";
const city = "Benin City, NG";
const units = "metric"; // Celsius

/* ===== LOAD WEATHER FUNCTION ===== */
async function loadWeather() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`
    );

    if (!response.ok) throw new Error("Weather data not available");

    const data = await response.json();

    // ===== CURRENT WEATHER =====
    const current = data.list[0];
    const currentTempElem = document.getElementById("current-temp");
    const weatherDescElem = document.getElementById("weather-desc");

    if (currentTempElem) currentTempElem.textContent = `${Math.round(current.main.temp)}°C`;
    if (weatherDescElem) weatherDescElem.textContent = current.weather[0].description;

    // ===== 3-DAY FORECAST =====
    const forecastList = forecastEl.querySelector("ul");
    if (forecastList) forecastList.innerHTML = "";

    const days = [1, 2, 3]; // next 3 days
    days.forEach(i => {
      const dayData = data.list[i * 8]; // approx. same time each day
      const date = new Date(dayData.dt * 1000);
      const options = { weekday: 'short' };

      const li = document.createElement("li");
      li.className = "forecast-day";
      li.textContent = `${date.toLocaleDateString('en-US', options)}: ${Math.round(dayData.main.temp)}°C`;

      forecastList.appendChild(li);
    });

  } catch (error) {
    console.error("Weather loading failed:", error);
    if (weatherEl) weatherEl.innerHTML = `<p class="error">Unable to load weather data.</p>`;
    if (forecastEl) forecastEl.innerHTML = "";
  }
}

/* ===== INITIALIZE WEATHER ===== */
document.addEventListener("DOMContentLoaded", loadWeather);
