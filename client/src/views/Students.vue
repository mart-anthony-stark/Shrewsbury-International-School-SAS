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
  import("../components/AddStudentModal.vue")
);
const DeleteModal = defineAsyncComponent(() =>
  import("../components/DeleteModal.vue")
);
const EditModal = defineAsyncComponent(() =>
  import("../components/EditStudentModal.vue")
);
const QrModal = defineAsyncComponent(() => import("../components/QrCode.vue"));

const store = useStore();
const accessToken = computed(() => store.state.accessToken);
const records = ref([]);
const isAddmodalActive = ref(false);
const delID = ref(null);
const editObj = ref(null);
const qrValue = ref(null);

const fetchRecords = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/student`);
  const data = await res.json();
  records.value = data;
};

const closeAddModal = () => {
  isAddmodalActive.value = false;
  fetchRecords();
};

const closeEditModal = () => {
  fetchRecords();
  editObj.value = null;
};

const deleteRecord = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/student/${delID.value}`,
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
    fetchRecords();
  }
  delID.value = null;
};

onBeforeMount(() => fetchRecords());
</script>

<template>
  <div>
    <transition name="fade">
      <qr-modal
        @onClose="qrValue = null"
        :value="qrValue"
        v-if="qrValue != null"
      />
    </transition>

    <transition name="fade">
      <add-modal @closeModal="closeAddModal()" v-if="isAddmodalActive" />
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
        @cancel="delID = null"
        @confirm="deleteRecord()"
        name="student"
        v-if="delID !== null"
      />
    </transition>

    <Header />
    <main class="mx-2 sm:mx-6 md:mx-12">
      <h1 class="text-center text-3xl font-bold text-red-700 my-4">Students</h1>
      <button
        @click="isAddmodalActive = true"
        class="bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        <i class="fa fa-plus" aria-hidden="true"></i> Add New Student
      </button>
      <div class="center hidden">
        <table>
          <thead>
            <th>UID</th>
            <th>Firstname</th>
            <th>Middlename</th>
            <th>Lastname</th>
            <th>Course</th>
            <th>Section</th>
            <th>Action</th>
          </thead>
          <tbody>
            <tr v-for="student in records" :key="student._id">
              <td>{{ student._id }}</td>
              <td>{{ student.firstname }}</td>
              <td>{{ student.middlename }}</td>
              <td>{{ student.lastname }}</td>
              <td>{{ student.course }}</td>
              <td>{{ student.section }}</td>
              <td class="grid grid-cols-3 gap-2">
                <button
                  @click="qrValue = student"
                  class="bg-blue-600 rounded text-white"
                >
                  <i class="fa fa-qrcode" aria-hidden="true"></i>
                  QR
                </button>
                <button @click="editObj = student" class="edit-btn">
                  <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
                </button>
                <button @click="delID = student._id" class="del-btn">
                  <i class="fa fa-trash" aria-hidden="true"></i> Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2
        v-if="records.length === 0"
        class="text-center text-3xl text-gray-600"
      >
        There are no records to display
      </h2>
    </main>
  </div>
</template>