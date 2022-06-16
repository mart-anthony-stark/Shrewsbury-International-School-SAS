<script setup>
import { defineAsyncComponent } from "@vue/runtime-core";

const Header = defineAsyncComponent(() => import("../components/Header.vue"));
</script>

<template>
  <div>
    <Header />
    <h1>Home</h1>
  </div>
</template>