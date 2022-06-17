<script setup>
import { defineAsyncComponent } from "@vue/runtime-core";

const Header = defineAsyncComponent(() => import("../components/Header.vue"));
</script>

<template>
  <div>
    <Header />
    <main class="mx-2 sm:mx-6 md:mx-12">
      <h1 class="text-center text-3xl font-bold text-blue-500 my-4">Admins</h1>
      <button class="bg-green-500 text-white p-2 rounded hover:bg-green-600">
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
            <tr>
              <td>Mart Anthony</td>
              <td>Salazar</td>
              <td>mart@gmail.com</td>
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
    </main>
  </div>
</template>

<style scoped>
</style>