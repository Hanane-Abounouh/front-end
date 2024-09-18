<template>
  <aside :class="{'block': isSidebarOpen, 'hidden': !isSidebarOpen, 'md:block': true}" class="fixed z-50 w-80 h-full bg-[#2a2185] shadow-lg border border-gray-50">
    <button @click="toggleSidebar" class="absolute top-4 right-4 md:hidden p-2 text-white">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
    <h1 class="px-6 py-8 text-2xl font-bold text-white text-center border-b border-[#3a3387] mb-6">Gestion de Projet</h1>
    
    <div class="text-white">
      <ul class="mt-6 space-y-2">
        <li class="relative px-6 py-3">
          <router-link
            to="/dashboard"
            class="flex h-12 items-center truncate rounded-t-3xl rounded-b-3xl px-6 py-4 text-white outline-none transition duration-300 ease-linear hover:bg-white hover:text-[#2a2185]"
            active-class="bg-white text-[#2a2185]"
            exact-active-class="bg-white text-[#2a2185]"
          >
            <svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            <span class="ml-4">Dashboard</span>
          </router-link>
        </li>
        <li class="relative px-6 py-3">
          <router-link
            to="/dashboard/users"
            class="flex h-12 items-center truncate rounded-t-3xl rounded-b-3xl px-6 py-4 text-white outline-none transition duration-300 ease-linear hover:bg-white hover:text-[#2a2185]"
            active-class="bg-white text-[#2a2185]"
            exact-active-class="bg-white text-[#2a2185]"
          >
            <svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 5v14m7-7H5"></path>
            </svg>
            <span class="ml-4">User List</span>
          </router-link>
        </li>
        <!-- Ajoutez ici d'autres éléments de menu -->
      </ul>
    </div>
  </aside>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AsideApp',
  data() {
    return {
      isAdmin: false,
      isSidebarOpen: false
    };
  },
  created() {
    this.checkIfAdmin();
  },
  methods: {
    async checkIfAdmin() {
      try {
        const response = await axios.get('/api/users');
        this.isAdmin = response.data.role.id === 1;
      } catch (error) {
        console.error('Erreur lors de la vérification du rôle:', error);
      }
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }
};
</script>

<style scoped>
/* Ajoutez des styles supplémentaires si nécessaire */
</style>
