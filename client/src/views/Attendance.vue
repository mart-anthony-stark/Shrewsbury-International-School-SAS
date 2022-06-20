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
const DeleteModal = defineAsyncComponent(() =>
  import("../components/DeleteModal.vue")
);
const store = useStore();
const accessToken = computed(() => store.state.accessToken);
const records = ref([]);
const isAddmodalActive = ref(false);
const delID = ref(null);
const editObj = ref(null);

const fetchRecords = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/time`);
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
    `${import.meta.env.VITE_API_URL}/time/${delID.value}`,
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
      <delete-modal
        @cancel="delID = null"
        @confirm="deleteRecord()"
        name="student"
        v-if="delID !== null"
      />
    </transition>

    <Header />
    <main class="mx-2 sm:mx-6 md:mx-12">
      <h1 class="text-center text-3xl font-bold text-red-700 my-4">
        Attendance
      </h1>
      <div class="center hidden">
        <table>
          <thead>
            <th>Student</th>
            <th>Course</th>
            <th>Section</th>
            <th>Time</th>
            <th>Date</th>
            <th>Action</th>
          </thead>
          <tbody>
            <tr v-for="student in records" :key="student._id">
              <td>
                {{
                  `${student.student?.lastname}, ${
                    student.student?.firstname
                  } ${student.student?.middlename[0].toUpperCase()}.`
                }}
              </td>
              <td>{{ student.student?.course }}</td>
              <td>{{ student.student?.section }}</td>
              <td>{{ student.time }}</td>
              <td>{{ student.date }}</td>
              <td>
                <button
                  @click="delID = student._id"
                  class="del-btn w-full m-auto"
                >
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