<template>
      <Notification ref="notification" :message="notificationMessage" :type="notificationType" />
  <div class="alarm-screen">

  
    <div class="alarm-container">
     
      <div class="alarm-header">
        <h1 class="alarm-title"> Alarm</h1>
      </div>
      <div class="alarm-list">
        <div v-for="(alarm, index) in alarms" :key="index" class="alarm-item">
          <div class="alarm-info">
            <p class="alarm-text">{{ alarm .time}}</p>
          </div>
          <button @click="deleteAlarm(index)" class="delete-button">Delete</button>
        </div>
      </div>
      <div class="alarm-input">
        <input
          type="time"
          v-model="newAlarm"
          class="alarm-input-field"
        />
        <button @click="addAlarm" class="set-alarm-button">Set Alarm</button>
      </div>


    </div>  
  </div>
 
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Notification from '~/components/notification.vue'; 


const alarms = ref([]);
const newAlarm = ref('');
const notificationRef = ref(null);
const notificationMessage = ref('');
const notificationType = ref('');


const addAlarm = () => {
  if (newAlarm.value) {
    alarms.value.push({ time: newAlarm.value.slice(0, 5), triggered: false });
    newAlarm.value = '';
  }
};

const deleteAlarm = (index) => {
  alarms.value.splice(index, 1);
};

const checkAlarms = () => {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).slice(0, 5);

  alarms.value.forEach((alarm, index) => {
    if (alarm.time === currentTime && !alarm.triggered) {
      notificationMessage.value = `Alarm for ${alarm.time} is ringing!`;
      notificationType.value = 'warning'; 
      notificationRef.value.show(); 
      alarms.value[index].triggered = true; 
    }
  });
};

let intervalId;

onMounted(() => {
  intervalId = setInterval(checkAlarms, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>


<style scoped>
.alarm-screen {
  background-color: #111;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.alarm-container {
  border: 4px solid #000000; 
  color: #fff;
  padding: 2rem;
  border-radius: 10px;
 
  text-align: center;
  background-color: #222; 
  box-shadow: 0 0 7px rgb(0, 204, 255); 
}

.alarm-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.alarm-list {
  margin-top: 1rem;
}

.alarm-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.alarm-info {
  flex-grow: 1;
  text-align: left;
}

.alarm-text {
  font-size: 1.2rem;
}

.delete-button {
  padding: 0.5em 1em;
  margin: 0.5em;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s;
  background-color: #dcdcdc;
  color: black
}

.alarm-input {
  display: flex;
  align-items: center;
}

.alarm-input-field {
  border: 1px solid #4e4e4e;
  background-color: #282a2d;
  color: #ecf0f1;
  padding: 10px;
  border-radius: 4px;
  margin-right: 1rem;
}

.set-alarm-button {
  padding: 0.5em 1em;
  margin: 0.5em;
  cursor: pointer;
  border: none;

  background-color: #3eabc3;
}

</style>
