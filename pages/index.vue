<template>
  <div class="home-screen bg-black">
    <div class="time-date-container text-center py-8">
      <div class="text-6xl font-bold">{{ time }}</div>
      <div class="text-xl">{{ date }}</div>
    </div>
    <div class="weather-container text-center">
      <div class="text-4xl">17°C</div>
      <div class="text-2xl">
        <i class="fas fa-sun"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const time = ref('');
const date = ref('');

const updateTime = () => {
  const now = new Date();
  time.value = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  date.value = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

let intervalId: ReturnType<typeof setInterval>;

onMounted(() => {
  updateTime();
  intervalId = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId as unknown as number);
});
</script>


<style scoped>
.home-screen {
  background-color:black ;
  background-size: cover;
  background-position: center;
}

.time-date-container div {
  color: #fff;
}

.nav-bar ul {
  list-style: none;
}

.nav-icon {
  color: #fff;
  text-align: center;
}

.nav-icon i {
  display: block;
  margin-bottom: 0.5rem;
}

.nav-icon span {
  display: block;
  font-size: 0.75rem;
}
</style>
