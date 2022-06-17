<script setup>
import { defineAsyncComponent } from "@vue/runtime-core";
import { useStore } from "vuex";
import { computed, ref } from "vue";

const Header = defineAsyncComponent(() => import("../components/Header.vue"));
const store = useStore();

const accessToken = computed(() => store.state.accessToken);
</script>

<template>
  <div>
    <Header />
    <h1>Home</h1>
  </div>
</template>