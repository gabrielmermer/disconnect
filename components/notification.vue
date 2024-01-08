<template>
  <div v-if="visible" class="notification" :class="type">
    {{ message }}
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  message: String,
  type: String
});

const visible = ref(false);

const show = () => {
  visible.value = true;
  setTimeout(() => {
    visible.value = false;
  }, 10000); 
};

watch(() => props.message, (newVal) => {
  if (newVal) {
    show();
  }
});

defineExpose({
  show
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.notification {
  position: fixed;

  left: 50%;
  transform: translateX(-50%);
  min-width: 300px;
  padding: 16px;
  border-radius: 4px;
  color: #fff;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  z-index: 1000;
}

.info {
  background-color: #2f86eb;
}

.error {
  background-color: #e3342f;
}

.success {
  background-color: #38c172;
}

.warning {
  background-color: #f59f00;
}
</style>
