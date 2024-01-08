<template>
  <div class="weather-widget">
    <h1 class="weather-title">Weather Forecast</h1>
    <div v-if="error" class="error">
      Error loading weather data: {{ error }}
    </div>
    <div v-else-if="weatherData">
      <div class="weather-details" v-if="currentWeather">
        <p>{{ currentWeather.time }} - Temp: {{ currentWeather.temperature }}°C, Humidity: {{ currentWeather.humidity }}%</p>
      </div>
      <div v-else class="loading">Loading...</div>
    </div>
  </div>
</template>



<script setup>
import { ref, watchEffect } from 'vue';

const props = defineProps({
  currentDate: String,
  currentTime: String
});

const weatherData = ref(null);
const currentWeather = ref(null);
const error = ref(null);

const fetchWeatherData = async () => {
  const baseUrl = 'https://api.open-meteo.com/v1/forecast';
  const params = new URLSearchParams({
    latitude: '48.2085',
    longitude: '16.3721',
    hourly: 'temperature_2m,relative_humidity_2m',
    timezone: 'Europe/Berlin'
  });

  try {
    const response = await fetch(`${baseUrl}?${params}`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    weatherData.value = await response.json();
    updateCurrentWeather();
  } catch (e) {
    error.value = e.message;
  }
};


const updateCurrentWeather = () => {
  if (weatherData.value && props.currentDate && props.currentTime) {
    try {
      const datetime = new Date(`${props.currentDate} ${props.currentTime}`);
      if (isNaN(datetime)) throw new Error('Invalid datetime');

      currentWeather.value = weatherData.value.hourly.time.reduce((closest, current, index) => {
        const currentTime = new Date(current);
        return (closest === null || Math.abs(datetime - currentTime) < Math.abs(datetime - new Date(closest.time)))
          ? { time: current, temperature: weatherData.value.hourly.temperature_2m[index], humidity: weatherData.value.hourly.relative_humidity_2m[index] }
          : closest;
      }, null);
    } catch (e) {
      console.error(e.message);
      error.value = 'Invalid date/time format';
    }
  }
};


watchEffect(() => {
  fetchWeatherData();
});
</script>





<style>
.weatherScreen {
  background-color: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.weather-widget {
  border: 4px solid #000000;
  color: #fff;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  background-color: #222;

  margin-bottom: 40px;
}

.weather-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.weather-list-container {
  max-height: 300px; 
  overflow-y: scroll; 
  scrollbar-width: thin; 

}

.weather-list-container::-webkit-scrollbar {
  width: 10px;
}

.weather-list-container::-webkit-scrollbar-thumb {

  border-radius: 5px; 
}


.weather-list-container::-webkit-scrollbar-track {
  background-color: #111; 
}


.weather-list {
  list-style: none;
  padding: 0;
}

.weather-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.error,
.loading {
  color: #ffffff; 
  text-align: center;
}

button {
  background-color: #000000; 
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 5px;
  cursor: pointer;
  border-radius: 4px;
}

input[type="date"] {
  background-color: #34495e;
  border: 1px solid #7f8c8d;
  color: white;
  display: block;
  margin: 10px auto;
  padding: 5px;
  border-radius: 4px;
  transition: border-color 0.3s ease;
}

input[type="date"]:hover,
input[type="date"]:focus {
  border-color: #000000;
}
</style>