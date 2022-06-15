<script setup>
import Dropdown from "./AccountsDropdown.vue";
</script>

<template>
  <nav class="header">
    <div class="flex gap-4">
      <router-link to="/">
        <button class="active">Home</button>
      </router-link>

      <dropdown />
    </div>
  </nav>
</template>
