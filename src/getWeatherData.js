const key = "NARL9QKV9QCSTM3T8HT7JLSTK";

async function getWeatherData(location, unitGroup) {
    const requestURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&key=${key}`;
    try {
        const response = await fetch(requestURL);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return {
            conditions: result.currentConditions.conditions,
            address: result.resolvedAddress,
            temp: result.currentConditions.temp,
            feelsLike: result.currentConditions.feelslike,
            windSpeed: result.currentConditions.windspeed,
            humidity: result.currentConditions.humidity,
            uvIndex: result.currentConditions.uvindex,
        };
    } catch (error) {
        console.error(error.message);
    }
}

export default getWeatherData;
