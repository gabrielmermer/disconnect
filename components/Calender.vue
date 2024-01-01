<template>
  <vue-cal :events="events" />
</template>

<script>
import VueCal from 'vue-cal';

import 'vue-cal/dist/vuecal.css'

export default {
  components: {
    VueCal
  },
  data() {
    return {
      events: [
       
      ]
    };
  }
};
</script>
