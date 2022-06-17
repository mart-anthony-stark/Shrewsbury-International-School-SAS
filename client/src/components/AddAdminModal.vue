<script setup>
import { ref } from "@vue/reactivity";

const fnameRef = ref(null);
const lnameRef = ref(null);
const emailRef = ref(null);
const passRef = ref(null);
const cpassRef = ref(null);
const submit = () => {
  console.log("Submit");
};
</script>

<template>
  <div>
    <div @click="$emit('closeModal')" class="overlay"></div>
    <form @submit.prevent="submit()">
      <h1 class="text-red-700 text-3xl text-center font-bold my-2">Admin</h1>
      <input ref="fnameRef" type="text" placeholder="Firstname" />
      <input ref="lnameRef" type="text" placeholder="Lastname" />
      <input ref="emailRef" type="text" placeholder="Email" />
      <input ref="passRef" type="password" placeholder="Password" />
      <input ref="cpassRef" type="password" placeholder="Confirm Password" />
      <button
        @click="login()"
        class="
          bg-blue-500
          hover:bg-blue-700
          text-white
          font-bold
          py-2
          px-4
          rounded
          focus:outline-none focus:shadow-outline
          w-full
        "
        type="button"
      >
        Add New Admin
      </button>
    </form>
  </div>
</template>

<style scoped>
.overlay {
  @apply fixed z-10 inset-0;
  background: rgba(0, 0, 0, 0.4);
}
form {
  @apply fixed z-20 bg-white rounded w-full p-4;
  left: 50%;
  top: 50%;
  min-height: 300px;
  max-width: 400px;
  transform: translate(-50%, -50%);
}
form input {
  @apply w-full p-2 border-b-2 border-gray-700 outline-none my-4 focus-within:border-red-800 focus-within:bg-gray-100;
}
</style>