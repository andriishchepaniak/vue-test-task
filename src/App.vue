<script setup>
import Navbar from "./components/Navbar.vue";
import Applications from "./components/Applications.vue";
import Customers from "./components/Customers.vue";
import NotFound from "./components/NotFound.vue";
import Sidebar from "./components/Sidebar.vue";
import AddApplication from "./components/AddApplication.vue";
import { ref, computed } from "vue";

const routes = {
  '/': Applications,
  '/customers': Customers,
  '/addApplication': AddApplication
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
  <Navbar />
  <main>
    <div class="container">
      <div class="row">
        <div class="col-3 sidebar d-flex flex-row-reverse">
          <Sidebar />
        </div>
        <div class="col-9">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </main>
</template>
