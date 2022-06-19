<script setup>
import {
  computed,
  defineAsyncComponent,
  onBeforeMount,
  ref,
} from "@vue/runtime-core";
import { createToast } from "mosha-vue-toastify";
import { useStore } from "vuex";

const Header = defineAsyncComponent(() => import("../components/Header.vue"));
const AddModal = defineAsyncComponent(() =>
  import("../components/AddAdminModal.vue")
);
const DeleteModal = defineAsyncComponent(() =>
  import("../components/DeleteModal.vue")
);
const EditModal = defineAsyncComponent(() =>
  import("../components/EditAdminModal.vue")
);

const store = useStore();
const accessToken = computed(() => store.state.accessToken);
const isAddmodalActive = ref(false);
const isDelModalActive = ref(false);
const editObj = ref(null);
const currentDeleteID = ref("");
const admins = ref([]);

const fetchAdmins = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/admin`);
  const data = await res.json();
  admins.value = data;
};

//Handle Close add modal
const closeModal = () => {
  fetchAdmins();
  isAddmodalActive.value = false;
};

const initDelete = (id) => {
  currentDeleteID.value = id;
  isDelModalActive.value = true;
};

const closeEditModal = () => {
  fetchAdmins();
  editObj.value = null;
};

const deleteRecord = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/admin/${currentDeleteID.value}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
      },
    }
  );
  if (!res.ok) {
    createToast("Something went wrong!", { type: "danger" });
  } else {
    createToast("Successfully deleted record", { type: "success" });
    fetchAdmins();
  }
  cancelDelete();
};
const cancelDelete = () => {
  currentDeleteID.value = null;
  isDelModalActive.value = false;
};

onBeforeMount(() => fetchAdmins());
</script>

<template>
  <div>
    <transition name="fade">
      <add-modal @closeModal="closeModal()" v-if="isAddmodalActive" />
    </transition>

    <transition name="fade">
      <edit-modal
        @closeModal="closeEditModal()"
        v-if="editObj !== null"
        :editObj="editObj"
      />
    </transition>

    <transition name="fade">
      <delete-modal
        @cancel="cancelDelete()"
        @confirm="deleteRecord()"
        name="admin"
        v-if="isDelModalActive"
      />
    </transition>

    <Header />
    
    <main class="mx-2 sm:mx-6 md:mx-12">
      <h1 class="text-center text-3xl font-bold text-red-700 my-4">Admins</h1>
      <button
        @click="isAddmodalActive = true"
        class="bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        <i class="fa fa-plus" aria-hidden="true"></i> Add New Admin
      </button>
      <div class="center hidden">
        <table>
          <thead>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Action</th>
          </thead>
          <tbody>
            <tr v-for="admin in admins" :key="admin._id">
              <td>{{ admin["firstname"] }}</td>
              <td>{{ admin["lastname"] }}</td>
              <td>{{ admin["email"] }}</td>
              <td class="grid grid-cols-2 gap-2">
                <button @click="editObj = admin" class="edit-btn">
                  <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
                </button>
                <button @click="initDelete(admin._id)" class="del-btn">
                  <i class="fa fa-trash" aria-hidden="true"></i> Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 v-if="admins.length === 0" class="text-center text-3xl text-gray-600">
        There are no records to display
      </h2>
    </main>
  </div>
</template>

<style scoped>
</style>