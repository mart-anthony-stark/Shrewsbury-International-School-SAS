<script setup>
import { onMounted, onUnmounted } from "@vue/runtime-core";
import Header from "./components/Header.vue";

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
  <div>
    <router-view />
  </div>
</template>

<style>
</style>
