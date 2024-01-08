<template>
  
  <div class="clock-app">
    <aside class="side-menu">
      <nav>
        <div class="nav-links">
          <NuxtLink to="clock" class="nav-link">Clock</NuxtLink>
          <NuxtLink to="alarm" class="nav-link">Alarm</NuxtLink>
       
      <NuxtLink to="timer" class="nav-link">Timer</NuxtLink>
      
    </div>
      </nav>
    </aside>
    <div class="clock-header">
          <h1 class="clock-title">Clock</h1>
        </div>
    <div class="clock-screen">
     
    <div class="clock">
      <div class="clock-face">
        <div class="hour-hand" :style="{ transform: `rotate(${hourRotation}deg)` }"></div>
        <div class="minute-hand" :style="{ transform: `rotate(${minuteRotation}deg)` }"></div>
        <div class="second-hand" :style="{ transform: `rotate(${secondRotation}deg)` }"></div>
        <div class="center-circle"></div>
      </div>
   
    </div>
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

.clock-app {
  display: flex;
  height: 100vh;
  background-color: #111;
  color: #fff; /* Text color */
}
.clock-screen{
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;

}
.side-menu {
  width: 200px;
  background-color: #2b2e31; 
}

.clock-header {
  text-align: center;
  margin-left: 40px;
  margin-top: 40px;
}

.clock-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.side-menu nav .nav-link {
  display: block;
  padding: 1rem;
  color: #fff;
  text-decoration: none;
  border-bottom: 1px solid #333;
}

.side-menu nav .nav-link.active {
  background-color: #3eabc3;
}


.clock {
  position: fixed;
  width: 200px;
  height: 200px;
  border-radius: 50%; 
  margin-right: 220px;
  margin-bottom: 50px;
}

.clock-face {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #222; 
  box-shadow: 0 0 7px rgb(0, 204, 255); 
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


.hour-hand {
  width: 10px;
  height: 40%;
  background-color: #ffffff; 
  transform: translateX(-50%) rotate(0deg);
  transition: transform 0.5s;
}

.minute-hand {
  width: 6px;
  height: 50%;
  background-color: #ffffff; 
  transform: translateX(-50%) rotate(0deg);
  transition: transform 0.5s;
}

.second-hand {
  width: 3px;
  height: 50%;
  background-color: #3eabc3; 
  transform: translateX(-50%) rotate(0deg);
  transition: transform 0.5s cubic-bezier(0.4, 2.4, 0.6, 0.8);
}

.center-circle {
  width: 15px;
  height: 15px;
  background-color: #ffffff; 
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.time-display {
  font-size: 2rem;
  color: #fff; 
  margin-top: 20px;
}


</style>
