<template>
  <div class="alarm-item">
    <div class="alarm-time">{{ alarm.time }}</div>
    <div class="alarm-label">{{ alarm.label }}</div>
    <div class="days-container">
      <span v-for="day in alarm.days" :key="day" :class="{ active: day.active }">{{ day.label }}</span>
    </div>
  
    <button @click="deleteAlarm" class="delete-button">Delete</button>
  </div>
</template>

<script>
export default {
  props: {
    alarm: {
      type: Object,
      required: true
    }
  },
  methods: {
  
    deleteAlarm() {
      this.$emit('delete-alarm', this.alarm.id);
    }
  }
};
</script>

<style scoped>
.alarm-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #333;
  border-radius: 8px;
  color: #fff;
  font-family: 'Arial', sans-serif;
}

.alarm-time {
  font-size: 1.5rem;
  font-weight: bold;
}

.alarm-label {
  margin-left: 1rem;
  flex-grow: 1;
}

.days-container span {
  margin-right: 0.5rem;
  padding: 0.25rem 0.5rem;
  background-color: #555;
  border-radius: 4px;
  user-select: none;
}

.days-container span.active {
  background-color: #3eabc3;
}


.delete-button {
  padding: 0.5rem 1rem;
  background-color: #d9534f;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #c9302c;
}
</style>
