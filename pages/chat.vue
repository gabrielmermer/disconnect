<template>
  <div class="flex flex-col items-center justify-between p-6 pb-16 min-h-screen bg-black">
    <h1 class="text-3xl font-bold text-white mb-1">Chat with OpenAI</h1>
    <div class="w-3/4 bg-gray-900 rounded-lg shadow-md p-4">
      <ul class="space-y-2">
        <li v-for="(msg, index) in messages" :key="index" 
            :class="{'text-right': msg.sender === 'user', 'text-left': msg.sender === 'bot'}">
          <div class="inline-block rounded-lg px-4 py-2" :class="{'bg-blue-200': msg.sender === 'user', 'bg-gray-200': msg.sender === 'bot'}">
            {{ msg.content }}
          </div>
        </li>
      </ul>
      <div class="mt-4">
        <input type="text" v-model="userInput" 
               @keyup.enter="sendMessage" 
               class="w-full rounded border p-2" 
               placeholder="Type a message...">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const messages = ref([]);
const userInput = ref('');

const sendMessage = async () => {
  if (!userInput.value) return;
  messages.value.push({ sender: 'user', content: userInput.value });
  try {
    const response = await axios.post('/api/chat', { message: userInput.value });
    messages.value.push({ sender: 'bot', content: response.data.message });
  } catch (error) {
    console.error('Error:', error);
    messages.value.push({ sender: 'bot', content: 'Error processing your request.' });
  }
  userInput.value = '';
};
</script>