<template>
  <div class="weatherScreen">
    <div class="weather-widget">
      <h1 class="weather-title">Weather Forecast</h1>
      <div v-if="error" class="error">
        Error loading weather data: {{ error }}
      </div>
      <div v-else-if="weatherData">
     
        <div v-if="!buttonPressed">
          
          <input type="date" v-model="selectedDate">
          
          <button @click="filterWeatherByDate">Show Weather</button>
        </div>
        
       
        <div class="weather-list-container">
          <ul class="weather-list">
            <li v-for="(data, index) in filteredWeatherData" :key="index">
              {{ new Date(data.time).toLocaleTimeString() }} - 
              Temp: {{ data.temperature }}°C,
              Humidity: {{ data.humidity }}%,
             
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="loading">
        Loading...
      </div>
    </div>
  </div>
</template>


<style>
.weatherScreen {
  background-color: #111;
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
  box-shadow: 0 0 7px rgb(0, 204, 255);
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
  scrollbar-color: #3498db #111; 
}

.weather-list-container::-webkit-scrollbar {
  width: 10px; 
}

.weather-list-container::-webkit-scrollbar-thumb {
  background-color: #3498db; 
  border-radius: 5px; 
}

.weather-list-container::-webkit-scrollbar-thumb:hover {
  background-color: #2980b9; 
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
  background-color: #2980b9; 
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
  margin-top: 40px;
  padding: 10px;
  border-radius: 4px;
  transition: border-color 0.3s ease;
}

input[type="date"]:hover,
input[type="date"]:focus {
  border-color: #2980b9;
}
</style>




<script setup>

import { ref, onMounted } from 'vue';

const weatherData = ref(null);
const filteredWeatherData = ref([]);
const error = ref(null);
const selectedDate = ref(new Date().toISOString().split('T')[0]); // Default to today

const fetchWeatherData = async () => {
  const baseUrl = 'https://api.open-meteo.com/v1/forecast';
  const params = new URLSearchParams({
    latitude: '48.2085',
    longitude: '16.3721',
    hourly: 'temperature_2m,relative_humidity_2m,snowfall,cloud_cover_high',
    timezone: 'Europe/Berlin',
    forecast_days: '3'
  });

  try {
    const response = await fetch(`${baseUrl}?${params}`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    weatherData.value = await response.json();
  } catch (e) {
    error.value = e.message;
  }
};
const buttonPressed = ref(false);

const filterWeatherByDate = () => {
  if (!weatherData.value || !selectedDate.value) return;
  const date = new Date(selectedDate.value);
  filteredWeatherData.value = weatherData.value.hourly.time
    .map((time, index) => ({
      time,
      temperature: weatherData.value.hourly.temperature_2m[index],
      humidity: weatherData.value.hourly.relative_humidity_2m[index]
      // Add more data as needed
    }))
    .filter(data => new Date(data.time).toDateString() === date.toDateString());
  
  
  buttonPressed.value = true;
};

onMounted(fetchWeatherData);
</script>






