<script setup>
import { defineAsyncComponent, onBeforeMount, ref } from "@vue/runtime-core";

const Header = defineAsyncComponent(() => import("../components/Header.vue"));

const records = ref([]);

const fetchRecords = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/student`);
  const data = await res.json();
  records.value = data;
};

onBeforeMount(() => fetchRecords());
</script>

<template>
  <div>
    <Header />
    <main class="mx-2 sm:mx-6 md:mx-12">
      <h1 class="text-center text-3xl font-bold text-red-700 my-4">Students</h1>
      <button class="bg-green-500 text-white p-2 rounded hover:bg-green-600">
        <i class="fa fa-plus" aria-hidden="true"></i> Add New Student
      </button>
      <div class="center hidden">
        <table>
          <thead>
            <th>Firstname</th>
            <th>Middlename</th>
            <th>Lastname</th>
            <th>Course</th>
            <th>Section</th>
            <th>Action</th>
          </thead>
          <tbody>
            <tr v-for="student in records" :key="student._id">
              <td>{{ student.firstname }}</td>
              <td>{{ student.middlename }}</td>
              <td>{{ student.lastname }}</td>
              <td>{{ student.email }}</td>
              <td>{{ student.course }}</td>
              <td>{{ student.section }}</td>
              <td class="grid grid-cols-2 gap-2">
                <button class="edit-btn">
                  <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
                </button>
                <button class="del-btn">
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