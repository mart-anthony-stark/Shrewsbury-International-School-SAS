<script setup>
import { onMounted, onUnmounted } from "@vue/runtime-core";

// let counter;
// onMounted(() => {
//   counter = setInterval(() => {
//     console.log("count");
//   }, 1000);
// });

// onUnmounted(() => {
//   clearInterval(counter);
// });
</script>

<template>
  <div class="center p-2 pt-0">
    <router-view />
  </div>
</template>

<style>
</style>
