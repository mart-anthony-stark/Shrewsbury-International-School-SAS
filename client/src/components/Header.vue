<script setup>
import { useRoute } from "vue-router";
import AccountsDropdown from "./AccountsDropdown.vue";

const route = useRoute();
</script>

<template>
  <nav class="header">
    <div class="flex gap-4 items-center">
      <img
        id="cnsc-logo"
        class="w-14 h-14"
        src="../assets/cnsc.png"
        alt="CNSC"
      />

      <router-link to="/">
        <button :class="{ active: route.name === 'Home' }">Home</button>
      </router-link>

      <accounts-dropdown
        :isActive="route.name == 'Students' || route.name == 'Admins'"
      />
    </div>
  </nav>
</template>

<style scoped>
</style>