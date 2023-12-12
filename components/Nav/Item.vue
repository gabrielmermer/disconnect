<script lang="ts" setup>

const props = defineProps({
  text: String,
  route: String
});
</script>

<template>
  <li class="cursor-pointer list-none m-2 px-4 py-2 rounded-lg font-bold hover:underline underline-offset-4 ">
    <NuxtLink :to="route">
      {{ text }}
    </NuxtLink>
  </li>
</template>
