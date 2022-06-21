<script setup>
const { value } = defineProps(["value"]);
</script>

<template>
  <div class="container">
    <div class="qr-container"></div>
  </div>
</template>

<style scoped>
.container {
  @apply fixed inset-0 z-10;
  background: rgba(0, 0, 0, 0.4);
}
.qr-container {
  @apply fixed bg-white rounded p-2 top-1/2 left-1/2;
}
</style>