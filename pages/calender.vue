

<template>
  <div class="calendar-container relative">
    <div class="calendar-header">
      <h1>Calendar</h1>
    </div>
   
    <vue-cal :key="calendarKey" :events="events" style="height: 570px;"></vue-cal>


    <button
  class="fixed bottom-20 right-14 text-white font-bold py-2 px-4 rounded-full "
  @click="showAddEventForm = true" id="plusBtn">
      <svg class="w-9 h-9 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z"/>
  </svg>
    
    </button>


 
    <div
      class="fixed inset-0  bottom-10  flex justify-center items-center"
      v-show="showAddEventForm">
     
      <div class="backdrop"></div>

      <form
        class="bg-white p-6 rounded-lg shadow-lg"
        @submit.prevent="addEvent">
        <input
          type="text"
          v-model="newEvent.title"
          placeholder="Event Title"
          required
          class="block w-full px-4 py-2 mb-4 border rounded"/>
        <input
          type="datetime-local"
          v-model="newEvent.start"
          required
          class="block w-full px-4 py-2 mb-4 border rounded" />
        <input
          type="datetime-local"
          v-model="newEvent.end"
          required
          class="block w-full px-4 py-2 mb-4 border rounded"/>
        <button
          type="submit"
          class="bg-gray-900 text-white font-bold py-2 px-4 rounded" >
          Add Event
        </button>
        <button
         
          @click="showAddEventForm = false">
          Cancel
        </button>
      </form>
    </div>
  </div>
</template>

<script>

import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

export default {
  components: {
    VueCal
  },

  data() {
    return {
      events: [], 
      showAddEventForm: false,
      newEvent: {
        title: '',
        start: '',
        end: '',
      },
      calendarKey: 0,
      
    
    };
  },
  methods: {
    addEvent() {
  if (this.newEvent.title && this.newEvent.start && this.newEvent.end) {

    const formattedStart = this.newEvent.start.replace('T', ' ');
    const formattedEnd = this.newEvent.end.replace('T', ' ');

    this.events.push({
      start: formattedStart,
      end: formattedEnd,
      title: this.newEvent.title,
      class: 'custom-class',
      background: true
    });

  
    this.newEvent.title = '';
    this.newEvent.start = '';
    this.newEvent.end = '';

    this.showAddEventForm = false;
    this.calendarKey++; 
  } else {
    alert('Please fill all the fields');
  }
},
}



};
</script>

<style scoped>


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
