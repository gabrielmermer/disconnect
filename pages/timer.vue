<template>
  <div class="clock-screen bg-black text-white h-screen flex flex-col items-center justify-center">
    <div class="timer-container">
      <!-- Timer Display -->
      <div class="timer-display text-center mb-8 relative">
        <svg class="timer-svg" viewBox="0 0 200 200">
          <circle class="timer-path-elapsed" cx="100" cy="100" r="90"></circle>
          <path
            :d="timerPathRemaining"
            class="timer-path-remaining"
            :style="{ strokeDasharray: timerDashArray }"
          ></path>
        </svg>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span class="text-4xl font-bold">{{ formattedTime }}</span>
        </div>
      </div>
  
      <!-- Timer Input -->
      <div class="timer-input mb-8">
        <input type="text" v-model="timerHours" placeholder="HH" class="timer-input-field" maxlength="2" />
        <input type="text" v-model="timerMinutes" placeholder="MM" class="timer-input-field" maxlength="2" />
        <input type="text" v-model="timerSeconds" placeholder="SS" class="timer-input-field" maxlength="2" />
      </div>
      
      <button @click="startTimer" class="timer-button">Start Timer</button>
      <button @click="stopTimer" class="stoptimer-button">Stop Timer</button>
    </div>
  </div>
</template>

  
  <script setup lang="ts">
  import { ref, computed, onUnmounted, watch } from 'vue';
  
  const selectInput = (event: Event) => {
  const inputElement = event.target as HTMLInputElement | null;
  if (inputElement) {
    inputElement.select();
  }
};

  
  const timerIntervalId = ref<NodeJS.Timeout | null>(null);
  const fullDashArray = 283;
  const timerPathRemaining = ref(`M 100, 100 m -90, 0 a 90,90 0 1,0 180,0 a 90,90 0 1,0 -180,0`);
  const timerDashArray = ref(`${fullDashArray} ${fullDashArray}`);
  
  const timerHours = ref('');
  const timerMinutes = ref('');
  const timerSeconds = ref('');

  const validateInput = () => {
  timerHours.value = Math.min(24, Math.max(0, parseInt(timerHours.value))).toString().padStart(2, '0');
  timerMinutes.value = Math.min(60, Math.max(0, parseInt(timerMinutes.value))).toString().padStart(2, '0');
  timerSeconds.value = Math.min(60, Math.max(0, parseInt(timerSeconds.value))).toString().padStart(2, '0');
};




  const formattedTime = computed(() => {
    return `${timerHours.value}:${timerMinutes.value}:${timerSeconds.value}`;
  });
  
  watch([timerHours, timerMinutes, timerSeconds], () => {
    const totalSeconds = parseInt(timerHours.value) * 3600 + parseInt(timerMinutes.value) * 60 + parseInt(timerSeconds.value);
    timerDashArray.value = `${(fullDashArray - (totalSeconds / 86400) * fullDashArray)} ${fullDashArray}`;
  });
  
  const startTimer = () => {
    if (timerIntervalId.value) clearInterval(timerIntervalId.value);
    let totalSeconds = parseInt(timerHours.value) * 3600 + parseInt(timerMinutes.value) * 60 + parseInt(timerSeconds.value);
    timerIntervalId.value = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const mins = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const secs = (totalSeconds % 60).toString().padStart(2, '0');
        timerHours.value = hours;
        timerMinutes.value = mins;
        timerSeconds.value = secs;
      } else {
        stopTimer();
      }
    }, 1000);
  };
  
  const stopTimer = () => {
    if (timerIntervalId.value) {
      clearInterval(timerIntervalId.value);
      timerIntervalId.value = null;
    }
    timerHours.value = '00';
    timerMinutes.value = '00';
    timerSeconds.value = '00';
  };
  
  onUnmounted(() => {
    stopTimer();
  });
  </script>

  
<style scoped>


.clock-screen {
  background-color:  #111; /* Adjusted for better visibility */
}

.timer-display {
  position: relative;
}

.timer-svg {
  width: 200px;
  height: 200px;
}

.timer-path-elapsed {
  stroke-width: 10px;
  stroke:  #3eabc3;
;
}
.timer-container {

  border: 4px solid #000000; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

color: #fff;
padding: 2rem;
border-radius: 10px;

text-align: center;
background-color: #222; /* Darker background */
box-shadow: 0 0 7px rgb(0, 204, 255); /* Add a subtle shadow */
}


.timer-input-field {
  background-color: #2c3e50;
  border: 1px solid #34495e;
  color: white;
  padding: 0.5em;
  margin-right: 0.5em;
  width: 2.5em;
  text-align: center;
}

.timer-button {
  padding: 0.5em 1em;
  margin: 0.5em;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s;
  background-color: #3eabc3;
}


.stoptimer-button {
  padding: 0.5em 1em;
  margin: 0.5em;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s;
  background-color: #dcdcdc;
  color: black
}

.timer-button:hover {
  opacity: 0.9;
}

/* ... other styles ... */
</style>


