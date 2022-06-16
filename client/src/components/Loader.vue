<template>
  <div class="loadingio-spinner-blocks-qu4b56uwsp center">
    <div class="ldio-0jqjdf0wmaan">
      <div style="left: 38px; top: 38px; animation-delay: 0s"></div>
      <div style="left: 80px; top: 38px; animation-delay: 0.125s"></div>
      <div style="left: 122px; top: 38px; animation-delay: 0.25s"></div>
      <div style="left: 38px; top: 80px; animation-delay: 0.875s"></div>
      <div style="left: 122px; top: 80px; animation-delay: 0.375s"></div>
      <div style="left: 38px; top: 122px; animation-delay: 0.75s"></div>
      <div style="left: 80px; top: 122px; animation-delay: 0.625s"></div>
      <div style="left: 122px; top: 122px; animation-delay: 0.5s"></div>
    </div>
  </div>
</template>

<style scoped>
@keyframes ldio-0jqjdf0wmaan {
  0% {
    background: #fffb16;
  }
  12.5% {
    background: #fffb16;
  }
  12.625% {
    background: #870400;
  }
  100% {
    background: #870400;
  }
}
.loadingio-spinner-blocks-qu4b56uwsp {
  width: 200px;
  height: 200px;
  display: flex;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 99;
}
.ldio-0jqjdf0wmaan div {
  position: absolute;
  width: 40px;
  height: 40px;
  background: #870400;
  animation: ldio-0jqjdf0wmaan 1s linear infinite;
}
.ldio-0jqjdf0wmaan {
  width: 200px;
  height: 200px;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-0jqjdf0wmaan div {
  box-sizing: content-box;
}
</style>