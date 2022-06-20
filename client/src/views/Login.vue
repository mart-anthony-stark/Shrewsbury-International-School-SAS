<script setup>
import { ref } from "vue";
import { createToast } from "mosha-vue-toastify";
import LoadingSpinner from "../components/Loader.vue";
import { useRouter } from "vue-router";

const emailRef = ref(null);
const passwordRef = ref(null);
const apiBase = import.meta.env.VITE_API_URL;
const isLoading = ref(false);
const router = useRouter();

const login = async () => {
  const email = emailRef.value.value;
  const password = passwordRef.value.value;
  if (email.length === 0 || password.length === 0) {
    createToast("Email and password must not be empty ", { type: "danger" });
    return;
  }
  const body = JSON.stringify({ email, password });

  try {
    isLoading.value = true;
    const res = await fetch(`${apiBase}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    const data = await res.json();
    if (!res.ok) {
      isLoading.value = false;
      createToast(data["msg"], { type: "danger" });
      return;
    }

    createToast("Successfully logged in!", { type: "success" });
    isLoading.value = false;
    localStorage.setItem("refresh-token", data["refreshToken"]);
    router.push("/");
  } catch (error) {
    createToast("Something went wrong", { type: "danger" });
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="main-container center h-screen">
    <loading-spinner v-if="isLoading" />
    <div class="w-full max-w-xs">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <img class="w-28 m-auto" src="../assets/school.png" alt="Shrewsbury International School" />
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            ref="emailRef"
            class="
              shadow
              appearance-none
              border
              rounded
              w-full
              py-2
              px-3
              text-gray-700
              leading-tight
              focus:outline-none focus:shadow-outline
            "
            id="email"
            type="text"
            placeholder="Email"
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            ref="passwordRef"
            class="
              shadow
              appearance-none
              rounded
              w-full
              py-2
              px-3
              text-gray-700
              mb-3
              leading-tight
              focus:outline-none focus:shadow-outline
            "
            id="password"
            type="password"
            placeholder="******************"
          />
          <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
        </div>
        <div class="flex items-center justify-between">
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
            Sign In
          </button>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs">
        &copy;2020 CNSC All rights reserved.
      </p>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)),
    url("../assets/school-grounds.webp");
  background-size: cover;
  background-repeat: none;
  background-position: center;
}
</style>