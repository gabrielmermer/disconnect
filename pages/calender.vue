<template>
  <div class="calendar-container relative">



    <vue-cal :key="calendarKey" :events="events" style="height: 570px;"></vue-cal>

    <div class="Btns">



      <button id="Btn" class="   text-white font-bold py-2 px-4 rounded-full " @click="clearEvents">
        <svg class="w-9 h-9 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
          fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M9 3V4H4V6H5V19C5 20.104 5.896 21 7 21H17C18.104 21 19 20.104 19 19V6H20V4H15V3H9ZM7 6H17V19H7V6ZM9 8V17H11V8H9ZM13 8V17H15V8H13Z" />
        </svg>


      </button>

      <NuxtLink to="/createEvents">

        <button id="Btn" class=" text-white font-bold py-2 px-4 rounded-full ">
          <svg class="w-9 h-9 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z" />
          </svg>

        </button>


      </NuxtLink>
    </div>
  </div>
</template>



<script setup>
import { onMounted } from 'vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

const events = ref([]);

const calendarKey = ref(0);

const clearEvents = () => {
  events.value = []; // Clear the events array
  localStorage.removeItem('calendarEvents'); // Clear the stored data
  calendarKey.value++; // Update the key to force reactivity if necessary
};

onMounted(() => {
  if (localStorage.getItem('calendarEvents')) {
    events.value = JSON.parse(localStorage.getItem('calendarEvents'));
  }
});
</script>


<style scoped>
.Btns {
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  transition: transform 0.2s ease-in-out;
}

#Btn {

  padding: 5px 5px;
  background-color: #0f0f0f;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;

  transition: transform 0.2s ease-in-out;
}

#Btn:hover {
  transform: scale(1.35);

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
