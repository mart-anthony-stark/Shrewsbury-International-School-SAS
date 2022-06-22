<script setup>
import QrcodeVue from "qrcode.vue";
import { ref } from "@vue/reactivity";
import * as htmlToImage from "html-to-image";
import domtoimage from "dom-to-image-more";
// import { handleDownload } from "../utils/index.js";

const { value } = defineProps(["value"]);
const imageRef = ref(null);

const handleDownload = () => {
  domtoimage
    .toJpeg(document.getElementById(imageRef.value.id), { quality: 0.95 })
    .then(function (dataUrl) {
      var link = document.createElement("a");
      link.download = "my-image-name.jpeg";
      link.href = dataUrl;
      link.click();
    });
  // const node = document.getElementById('capture');
  // htmlToImage
  //   .toPng(node)
  //   .then(function (dataUrl) {
  //     var img = new Image();
  //     img.src = dataUrl;
  //     document.body.appendChild(img);
  //   })
  //   .catch(function (error) {
  //     console.error("oops, something went wrong!", error);
  //   });
};
const print = () => window.print();
</script>

<template>
  <div class="container">
    <div @click="$emit('onClose')" class="overlay"></div>
    <div id="capture" ref="imageRef" class="qr-container">
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
    <div class="download-btn grid grid-cols-2 gap-2">
      <button @click="handleDownload()">Download</button>
      <button @click="print()">Print</button>
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
.download-btn {
  @apply fixed z-30 bottom-6;
  left: 50%;
  transform: translateX(-50%);
}
.download-btn button {
  @apply bg-red-800 hover:bg-red-700  px-4 py-2  text-white rounded;
}
@page {
  margin: 0;
}
@media print {
  .download-btn {
    display: none;
  }
}
</style>