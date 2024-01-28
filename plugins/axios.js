// plugins/axios.js

// plugins/axios.js

import { defineNuxtPlugin } from '#app';
import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: 'http://127.0.0.1:8090/api/', // Your PocketBase API URL
  });

  // Here you can add `api` to the nuxt app context if you want it to be globally available
  nuxtApp.provide('api', api);
});
