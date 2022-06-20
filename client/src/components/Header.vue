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
        class="w-10 h-14"
        src="../assets/school.png"
        alt="CNSC"
      />

      <router-link to="/">
        <button :class="{ active: route.name === 'home' }">Home</button>
      </router-link>

      <accounts-dropdown
        :isActive="route.name == 'students' || route.name == 'admins'"
      />

      <router-link to="/attendance">
        <button :class="{ active: route.name === 'attendance' }">
          Attendance
        </button>
      </router-link>
    </div>
  </nav>
</template>

<style scoped>
</style>