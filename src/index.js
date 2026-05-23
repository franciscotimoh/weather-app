import getWeatherData from "./getWeatherData";
import "./styles.css";

const conditionDisplay = document.querySelector(".condition");
const locationDisplay = document.querySelector(".location");
const tempDisplay = document.querySelector(".temp");
const feelsLikeDisplay = document.querySelector(".feels-like");
const windSpeedDisplay = document.querySelector(".wind-speed");
const humidityDisplay = document.querySelector(".humidity");
const uvIndexDisplay = document.querySelector(".uv-index");

const locationSearch = document.querySelector("input.location-search");
const searchErrorMessage = document.querySelector("div.validation-error");
const locationForm = document.querySelector("form.location-form");

const tempUnitToggle = document.querySelector(".temp-unit-toggle");
let unitGroup = "us";

const updateDOM = (weatherData) => {
    conditionDisplay.textContent = weatherData.conditions;
    locationDisplay.textContent = weatherData.address;
    tempDisplay.textContent = weatherData.temp;
    feelsLikeDisplay.textContent = weatherData.feelsLike;
    windSpeedDisplay.textContent = weatherData.windSpeed;
    humidityDisplay.textContent = weatherData.humidity;
    uvIndexDisplay.textContent = weatherData.uvIndex;
};

const applyUnits = (weatherData) => {
    return {
        ...weatherData,
        temp:
            unitGroup === "us"
                ? `${weatherData.temp} °F`
                : `${weatherData.temp} °C`,
        feelsLike:
            unitGroup === "us"
                ? `${weatherData.feelsLike} °F`
                : `${weatherData.feelsLike} °C`,
        windSpeed:
            unitGroup === "us"
                ? `${weatherData.windSpeed} mph`
                : `${weatherData.windSpeed} kph`,
    };
};

tempUnitToggle.addEventListener("change", async (e) => {
    unitGroup = e.target.checked ? "metric" : "us";
    const location = locationSearch.value;
    const results = await getWeatherData(location, unitGroup);

    if (!results) {
        searchErrorMessage.classList.remove("hidden");
        return;
    } else {
        searchErrorMessage.classList.add("hidden");
    }

    const resultsWithUnits = applyUnits(results);
    updateDOM(resultsWithUnits);
});

locationForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const location = locationSearch.value;
    const results = await getWeatherData(location, unitGroup);

    if (!results) {
        searchErrorMessage.classList.remove("hidden");
        return;
    } else {
        searchErrorMessage.classList.add("hidden");
    }

    const resultsWithUnits = applyUnits(results);
    updateDOM(resultsWithUnits);
});

const results = await getWeatherData("Seoul", unitGroup);
const resultsWithUnits = applyUnits(results);
updateDOM(resultsWithUnits);
