<script setup>
import QrcodeVue from "qrcode.vue";

const { value } = defineProps(["value"]);
</script>

<template>
  <div class="container">
    <div @click="$emit('onClose')" class="overlay"></div>
    <div class="qr-container">
      <qrcode-vue :value="value._id" :size="280"></qrcode-vue>
      <h2 class="text-center font-bold text-red-800">
        {{ value.lastname }}, {{ value.firstname }}
        {{ value.middlename[0].toUpperCase() }}.
      </h2>
      <h2 class="text-center font-bold text-red-800">
        {{ value.course }} - {{ value.section }}
      </h2>
      <img
        id="logo"
        src="../assets/school.png"
        alt="Shrewsbury International School"
      />
    </div>
  </div>
</template>

<style scoped>
.overlay {
  @apply fixed inset-0 z-10;
  background: rgba(0, 0, 0, 0.4);
}
.qr-container {
  @apply fixed bg-white rounded p-4 top-1/2 left-1/2 z-30;
  transform: translate(-50%, -50%);
}
#logo {
  height: 50px;
  margin: auto;
}
</style>