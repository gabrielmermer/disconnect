<template>

  <div   class="calendar-container relative">



    <vue-cal :key="calendarKey" :events="events" style="height: 570px;"></vue-cal>


    <NuxtLink to="/createEvents" >

<button
class="fixed bottom-15 right-14 text-white font-bold py-2 px-4 rounded-full "
id="plusBtn">
  <svg class="w-9 h-9 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z"/>
</svg>

</button>


</NuxtLink>


</div>
  
</template>



<script setup>
import { onMounted } from 'vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

const events = ref([]);

const calendarKey = ref(0);

onMounted(() => {
  if (localStorage.getItem('calendarEvents')) {
    events.value = JSON.parse(localStorage.getItem('calendarEvents'));
  }
});
</script>


<style scoped>


button {
  padding: 5px 5px;
  background-color: #0f0f0f;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease;

}




#plusBtn {
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
