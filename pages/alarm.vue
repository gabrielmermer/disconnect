<template>
     <Notification ref="notification" :message="notificationMessage" :type="notificationType" />
  <div class="alarm-app">
    
    <aside class="side-menu">
      <nav>
        <div class="nav-links">
          <NuxtLink to="clock" class="nav-link">Clock</NuxtLink>
          <NuxtLink to="alarm" class="nav-link">Alarm</NuxtLink>
      <NuxtLink to="timer" class="nav-link">Timer</NuxtLink>
 
    </div>
      </nav>
    </aside>
    <div class="alarm-header">
          <h1 class="alarm-title">Alarms</h1>
        </div>
    <div class="alarm-screen">
      
      <div class="alarm-container">
       
        <div class="alarm-list">
          <AlarmItem v-for="(alarm, index) in alarms" :key="index" :alarm="alarm" @deleteAlarm="deleteAlarm(index)" />
        </div>

        <div v-if="showAlarmForm" class="alarm-form-modal">
    <form class="alarm-form" @submit.prevent="addAlarm">
      <input type="time" v-model="newAlarmTime" required />
      <button  type="submit">Set Alarm</button>
      <button id="cancel" type="button" @click="showAlarmForm = false">Cancel</button>
    </form>
  </div>

  
  <button
  class="fixed bottom-20 right-14 text-white font-bold py-2 px-4 rounded-full "
  @click="showAlarmForm = true" id="plusBtn">
      <svg class="w-9 h-9 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z"/>
  </svg>
    
    </button>
      </div>
    </div>
  </div>

 

 
</template>



  
 


<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Notification from '~/components/notification.vue'; 
import AlarmItem from '~/components/AlarmItem.vue';

const alarms = ref([]);
const newAlarm = ref('');
const notificationRef = ref(null);
const notificationMessage = ref('');
const notificationType = ref('');




const showAlarmForm = ref(false);
const newAlarmTime = ref('');
// Initialize alarms from local storage
const initializeAlarms = () => {
  const storedAlarms = localStorage.getItem('alarms');
  if (storedAlarms) {
    alarms.value = JSON.parse(storedAlarms);
  }
};


// Modify the addAlarm function to save the alarms in local storage
const addAlarm = () => {
  if (newAlarmTime.value) {
    const newAlarmObject = { time: newAlarmTime.value, triggered: false };
    alarms.value.push(newAlarmObject);
    newAlarmTime.value = '';
    showAlarmForm.value = false;

    // Save alarms in local storage
    localStorage.setItem('alarms', JSON.stringify(alarms.value));
  }
};

// Implement a function to remove alarms from local storage when they are deleted
const removeAlarmFromLocalStorage = () => {
  localStorage.setItem('alarms', JSON.stringify(alarms.value));
};

// Call removeAlarmFromLocalStorage whenever you delete an alarm
const deleteAlarm = (index) => {
  alarms.value.splice(index, 1);
  removeAlarmFromLocalStorage();
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
  initializeAlarms();
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.alarm-app {
  display: flex;
  height: 100vh;
  background-color: #111;
  color: #fff; 
}

.side-menu {
  width: 200px;
  background-color: #2b2e31; 
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
button {
  padding: 5px 5px;
  background-color: #0f0f0f; 
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
 
  transition: transform 0.2s ease-in-out;
}

button:hover {
transform: scale(1.35);

}

#plusBtn{
  box-shadow: 0 0 7px rgb(0, 204, 255); 
}
.alarm-screen {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.alarm-container {
  width: 100%;
  max-width: 600px;
  margin-right: 220px;
  margin-bottom: 50px;
}

.alarm-header {
  text-align: center;
  margin-left: 40px;
  margin-top: 40px;
}

.alarm-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.alarm-list {
  margin-top: 1rem;
}

.alarm-input {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}

.alarm-input-field {
  flex-grow: 1;
  margin-right: 1rem;
  padding: 0.5rem;
  background-color: #333;
  border: 1px solid #4e4e4e;
  color: #ecf0f1;
  border-radius: 4px;
}

.set-alarm-button {
  padding: 0.5rem 1rem;
  background-color: #3eabc3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.set-alarm-button:hover {
  background-color: #2980b9;
}



.alarm-form-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.alarm-form {
  background-color: #222;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 7px rgb(0, 204, 255);
}


.alarm-form input{
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #4e4e4e;
  background-color: #282a2d;
  color: #ecf0f1;
}
#cancel{
  background-color: #dcdcdc;
  color: black
}
.alarm-form button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;
  background-color: #3eabc3;
  color: white;
}

.alarm-form button:hover {
  background-color: #2980b9;
}


</style>
