<script setup>
import { ref } from "@vue/reactivity";
import { createToast } from "mosha-vue-toastify";
import { computed, getCurrentInstance, onMounted } from "vue";
import { useStore } from "vuex";
import LoadingSpinner from "./Loader.vue";

const { emit } = getCurrentInstance();
const props = defineProps(["editObj"]);
const store = useStore();
const fnameRef = ref(null);
const lnameRef = ref(null);
const emailRef = ref(null);
const passRef = ref(null);
const cpassRef = ref(null);
const loading = ref(false);
const apiBase = import.meta.env.VITE_API_URL;
const accessToken = computed(() => store.state.accessToken);

// Handle submit form for saving edited admin
const submit = async () => {
  const fname = fnameRef.value.value;
  const lname = lnameRef.value.value;
  const email = emailRef.value.value;
  const pass = passRef.value.value;
  const cpass = cpassRef.value.value;
  if (!validateEmptyInputs(fname, lname, email)) return;
  if (!validateEmail(email)) return;
  if (pass.length !== 0 && !validatePasswords(pass, cpass)) return;

  const body = {
    firstname: fname,
    lastname: lname,
    email,
  };

  if (pass.length !== 0) body["password"] = pass;

  loading.value = true;
  try {
    const res = await fetch(`${apiBase}/admin/${props.editObj._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) {
      loading.value = false;
      createToast(data.err, { type: "danger" });
      return;
    }
  } catch (error) {
    loading.value = false;
    createToast("Something went wrong", { type: "danger" });
    return;
  }

  loading.value = false;
  createToast("Admin Successfully Updated", { type: "success" });
  emit("closeModal");
};

const validateEmptyInputs = (...inputs) => {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].length === 0) {
      createToast("Inputs must not be empty string", { type: "danger" });
      return false;
    }
  }
  return true;
};

const validateEmail = (email) => {
  if (
    !String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    createToast("Invalid Email Format", { type: "danger" });
    return false;
  }
  return true;
};

const validatePasswords = (p1, p2) => {
  if (p1 !== p2) {
    createToast("Passwords do not match", { type: "danger" });
    return false;
  }
  return true;
};

onMounted(() => {
  fnameRef.value.value = props.editObj.firstname;
  lnameRef.value.value = props.editObj.lastname;
  emailRef.value.value = props.editObj.email;
});
</script>

<template>
  <div>
    <loading-spinner v-if="loading" />
    <div @click="$emit('closeModal')" class="overlay"></div>
    <form @submit.prevent="submit">
      <h1 class="text-red-700 text-3xl text-center font-bold my-2">
        Edit Admin
      </h1>
      <input ref="fnameRef" type="text" placeholder="Firstname" />
      <input ref="lnameRef" type="text" placeholder="Lastname" />
      <input ref="emailRef" type="text" placeholder="Email" />
      <input ref="passRef" type="password" placeholder="New Password" />
      <input
        ref="cpassRef"
        type="password"
        placeholder="Confirm New Password"
      />
      <button
        type="submit"
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
      >
        Save
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