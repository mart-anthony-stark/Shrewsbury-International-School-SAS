<script setup>
import { watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import AccountsDropdown from "./AccountsDropdown.vue";

const route = useRoute();
watch(
  () => route.path,
  () => {
    console.log(route.path);
  }
);
</script>

<template>
  <nav class="header">
    <div class="flex gap-4">
      <router-link to="/">
        <button :class="{ active: route.name === 'Home' }">Home</button>
      </router-link>

      <accounts-dropdown
        :isActive="route.name == 'Students' || route.name == 'Admins'"
      />
    </div>
  </nav>
</template>
