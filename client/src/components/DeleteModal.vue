<script setup>
const props = defineProps(["name"]);
</script>


<template>
  <div class="delete-modal">
    <i class="fa fa-trash-o" aria-hidden="true"></i>
    <h1>You are about to delete a single record</h1>
    <h2>This will delete a/an {{ props.name || "item" }} in the system</h2>
    <h2>Are you sure?</h2>
    <div class="buttons">
      <button @click="$emit('cancel')" class="cancel">Cancel</button>
      <button @click="$emit('confirm')" class="confirm">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.delete-modal {
  @apply fixed bg-gray-100 shadow-md text-center rounded p-4 top-1/2 left-1/2;
  transform: translate(-50%, -50%);
}
.delete-modal i {
  @apply text-4xl text-red-500 rounded-full border-2 border-red-500 h-16 w-16 flex items-center justify-center m-auto;
}
.delete-modal h1 {
  @apply text-2xl font-bold text-gray-800;
}
.delete-modal h2 {
  @apply text-lg text-gray-600;
}
.delete-modal .buttons {
  @apply float-right mt-4;
}
.delete-modal .buttons button {
  @apply px-4 py-2;
}
.delete-modal .buttons .cancel {
  @apply font-bold;
}
.delete-modal .buttons .confirm {
  @apply bg-red-600 rounded text-white;
}
</style>