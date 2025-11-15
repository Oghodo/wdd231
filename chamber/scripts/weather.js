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

/* ===== UTILITY FUNCTION ===== */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

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
    if (weatherDescElem) weatherDescElem.textContent = capitalize(current.weather[0].description);

    // ===== 3-DAY FORECAST =====
    const forecastList = forecastEl.querySelector("ul");
    if (forecastList) forecastList.innerHTML = "";

    // Use approximate midday data for next 3 days
    const dayIndices = [8, 16, 24]; // roughly 24h intervals (3-hour increments)
    dayIndices.forEach(i => {
      const dayData = data.list[i];
      if (!dayData) return;

      const date = new Date(dayData.dt * 1000);
      const options = { weekday: "short" };

      const li = document.createElement("li");
      li.className = "forecast-day";
      li.innerHTML = `
        <strong>${date.toLocaleDateString("en-US", options)}:</strong> 
        ${Math.round(dayData.main.temp)}°C, ${capitalize(dayData.weather[0].description)}
      `;
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
