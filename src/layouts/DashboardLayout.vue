<template>
  <div class="flex flex-col h-screen">
    <Header @toggle-sidebar="toggleSidebar" />
    <div class="flex flex-1">
      <Aside  />
      <main class="flex-1 ml-0 md:ml-80 mt-24 bg-white border border-gray-100 py-6 px-4 md:px-10">
        <router-view />
      </main>
    </div>
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Aside from '../components/Aside.vue';
// import Footer from '../components/Footer.vue';

export default {
  components: {
    Header,
    Aside,
    // Footer
  },
  data() {
    return {
      isSidebarOpen: false, // Initial state of the sidebar
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen; // Toggle sidebar visibility
    }
  }
};
</script>

<style scoped>
/* Ajoutez des styles supplémentaires si nécessaire */
</style>
