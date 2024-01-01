<template>
  <div class="clock-screen">
    <!-- Clock -->
    <div class="clock">
      <div class="clock-face">
        <div class="hour-hand" :style="{ transform: `rotate(${hourRotation}deg)` }"></div>
        <div class="minute-hand" :style="{ transform: `rotate(${minuteRotation}deg)` }"></div>
        <div class="second-hand" :style="{ transform: `rotate(${secondRotation}deg)` }"></div>
        <div class="center-circle"></div>
      </div>
   
    </div>

    <!-- Navigation Links -->
    <div class="nav-links">
      <NuxtLink to="timer" class="nav-link">Timer</NuxtLink>
      <NuxtLink to="alarm" class="nav-link">Alarm</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const time = ref('');
const updateTime = () => {
  const now = new Date();
  time.value = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};


const hourRotation = computed(() => {
  const now = new Date();
  const hours = now.getHours() % 12; 
  const minutes = now.getMinutes();
  return hours * 30 + minutes * 0.5; 
});

const minuteRotation = computed(() => {
  const now = new Date();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  return minutes * 6 + seconds * 0.1; 
});

const secondRotation = ref(0); 

let updateTimeInterval: NodeJS.Timeout | null = null;
let secondRotationInterval: NodeJS.Timeout | null = null;

onMounted(() => {
  updateTime();
  updateTimeInterval = setInterval(updateTime, 1000);

 
  secondRotationInterval = setInterval(() => {
    secondRotation.value += 6; 
  }, 1000);
});

onUnmounted(() => {
  if (updateTimeInterval) {
    clearInterval(updateTimeInterval);
  }
  if (secondRotationInterval) {
    clearInterval(secondRotationInterval);
  }
});
</script>

<style scoped>
.clock-screen {
  background-color: #111; /* Keep dark mode */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.clock {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%; /* Make it a circle */
  
}

.clock-face {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #222; /* Darker background */
  box-shadow: 0 0 7px rgb(0, 204, 255); /* Add a subtle shadow */
}

.hour-hand,
.minute-hand,
.second-hand,
.center-circle {
  position: absolute;
  transform-origin: center bottom;
  bottom: 50%;
  left: 50%;
}

/* Radical styles for clock hands and center circle */
.hour-hand {
  width: 10px;
  height: 40%;
  background-color: #ffffff; /* Radical color */
  transform: translateX(-50%) rotate(0deg);
  transition: transform 0.5s;
}

.minute-hand {
  width: 6px;
  height: 50%;
  background-color: #ffffff; /* Radical color */
  transform: translateX(-50%) rotate(0deg);
  transition: transform 0.5s;
}

.second-hand {
  width: 3px;
  height: 50%;
  background-color: #3eabc3; /* Radical color */
  transform: translateX(-50%) rotate(0deg);
  transition: transform 0.5s cubic-bezier(0.4, 2.4, 0.6, 0.8);
}

.center-circle {
  width: 15px;
  height: 15px;
  background-color: #ffffff; /* Radical color */
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.time-display {
  font-size: 2rem;
  color: #fff; /* White text color */
  margin-top: 20px;
}

/* Style navigation links */
.nav-links {
  margin-top: 20px;
  display: flex;
  gap: 20px;
}

.nav-link {
  text-decoration: none;
  color: #bababa; /* Red color for links */
  font-weight: bold;
  font-size: 1.5rem;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #3eabc3; /* Orange color on hover */
  text-decoration: underline;
}
</style>
