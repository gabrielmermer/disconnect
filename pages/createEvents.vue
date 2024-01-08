<template>
  <div class="screen">
    <div class="fixed inset-0 bottom-10 flex justify-center items-center" v-show="showAddEventForm">
      <div class="backdrop"></div>

      <form class="bg-white p-6 rounded-lg shadow-lg" @submit.prevent="addEvent">
        <input type="text" v-model="newEvent.title" placeholder="Event Title" required class="block w-full px-4 py-2 mb-4 border rounded"/>
        <input type="datetime-local" v-model="newEvent.start" required class="block w-full px-4 py-2 mb-4 border rounded" />
        <input type="datetime-local" v-model="newEvent.end" required class="block w-full px-4 py-2 mb-4 border rounded"/>
        <button type="submit" class="bg-gray-900 text-white font-bold py-2 px-4 rounded">Add Event</button>
        <button @click="cancelAndGoBack">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

const newEvent = reactive({
  title: '',
  start: '',
  end: ''
});
const showAddEventForm = ref(true);
const cancelAndGoBack = () => {
  showAddEventForm.value = false; 
    window.location.href = '/calender';

};

const addEvent = () => {
  if (newEvent.title && newEvent.start && newEvent.end) {
    let events = [];
    if (localStorage.getItem('calendarEvents')) {
      events = JSON.parse(localStorage.getItem('calendarEvents'));
    }

    const formattedStart = newEvent.start.replace('T', ' ');
    const formattedEnd = newEvent.end.replace('T', ' ');

    events.push({
      start: formattedStart,
      end: formattedEnd,
      title: newEvent.title,
      class: 'custom-class',
      background: true
    });

    localStorage.setItem('calendarEvents', JSON.stringify(events));

    newEvent.title = '';
    newEvent.start = '';
    newEvent.end = '';
    showAddEventForm.value = false;
    window.location.href = '/calender';
  } else {
    alert('Please fill all the fields');
  }
};
</script>

<style scoped>
.screen{

  display: flex;
  height: 100vh;
  background-color: #111;
  color: #fff; /* Text color */
}

form {

 
  display: flex;
  flex-direction: column;
  gap: 10px; 
  background-color: #2b2e31; 
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 7px rgb(0, 204, 255); 
  border: 4px solid #000000; 
  position: relative;
  z-index: 1000; 
}


input {
  border: 1px solid #4e4e4e; 
  background-color: #282a2d; 
  color: #ecf0f1;
  padding: 10px;
  border-radius: 4px;
}

input::placeholder {
  color: #95a5a6; 
}


button {
  padding: 5px 5px;
  background-color: #0f0f0f; 
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease;

}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  backdrop-filter: blur(5px); 
  z-index: 999;
}



#plusBtn{
  box-shadow: 0 0 7px rgb(0, 204, 255); 
}


.calendar-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #000000;
  color: white;
}

.calendar-header {
  text-align: center;
  padding: 8.3px;
  border-bottom: 1px solid #333;
  font-size: xx-large;
}


</style>
