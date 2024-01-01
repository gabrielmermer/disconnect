<template>
  <div class="weatherScreen">
    <div class="weather-widget">
      <h1 class="weather-title">Weather Forecast</h1>
      <div v-if="error" class="error">
        Error loading weather data: {{ error }}
      </div>
      <div v-else-if="weatherData">
        <!-- Conditionally render the date input and button -->
        <div v-if="!buttonPressed">
          <!-- Date Picker -->
          <input type="date" v-model="selectedDate">
          <!-- Trigger Button -->
          <button @click="filterWeatherByDate">Show Weather</button>
        </div>
        
        <!-- Weather Data Display with Overflow Scroll -->
        <div class="weather-list-container">
          <ul class="weather-list">
            <li v-for="(data, index) in filteredWeatherData" :key="index">
              {{ new Date(data.time).toLocaleTimeString() }} - 
              Temp: {{ data.temperature }}°C,
              Humidity: {{ data.humidity }}%,
              <!-- Add more data as needed -->
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
  max-height: 300px; /* Set a max height for the container */
  overflow-y: scroll; /* Enable vertical scrolling when content overflows */
  scrollbar-width: thin; /* Adjust scrollbar width */
  scrollbar-color: #3498db #111; /* Customize scrollbar colors */
}

.weather-list-container::-webkit-scrollbar {
  width: 10px; /* Adjust the scrollbar width for Webkit browsers */
}

.weather-list-container::-webkit-scrollbar-thumb {
  background-color: #3498db; /* Customize the scrollbar thumb color */
  border-radius: 5px; /* Add some border radius to the thumb */
}

.weather-list-container::-webkit-scrollbar-thumb:hover {
  background-color: #2980b9; /* Change thumb color on hover */
}

.weather-list-container::-webkit-scrollbar-track {
  background-color: #111; /* Customize the scrollbar track color */
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
  color: #e74c3c; /* Red color for errors/loading */
  text-align: center;
}

button {
  background-color: #2980b9; /* Blue background */
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
    latitude: '16.3721',
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
  
  // Update the buttonPressed variable to hide the button and date input
  buttonPressed.value = true;
};

onMounted(fetchWeatherData);
</script>
