<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps(["isActive"]);
const isDropdownVisible = ref(false);

const router = useRouter();
const navigate = (link) => {
  router.push(link);
};
</script>


<template>
  <div
    class="dropdown"
    :class="{ open: isDropdownVisible, active: isActive }"
    @click="isDropdownVisible = !isDropdownVisible"
  >
    <button>
      Accounts <i class="fa fa-angle-down" aria-hidden="true"></i>
    </button>
    <div class="dropdown-content">
      <div class="option" @click="navigate('/accounts/admin')">
        <span>Admin</span> <i class="fa fa-user" aria-hidden="true"></i>
      </div>
      <div class="option" @click="navigate('/accounts/student')">
        <span>Student</span>
        <i class="fa fa-graduation-cap" aria-hidden="true"></i>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  @apply relative inline-block;
}
i {
  @apply text-blue-500 items-center;
}
.dropdown.active button i {
  @apply text-white;
}
.dropdown-content {
  @apply hidden absolute bg-gray-100 text-black;
  min-width: 130px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown.open .dropdown-content {
  @apply block;
}
.option {
  @apply cursor-pointer flex justify-between;
  padding: 12px 16px;
}
.option:hover {
  background: rgb(231, 231, 231);
}
</style>