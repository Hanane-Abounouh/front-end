<template>
  <aside :class="{'block': isSidebarOpen, 'hidden': !isSidebarOpen, 'md:block': true}" class="fixed z-50 w-80 h-full bg-[#2a2185] shadow-lg border border-gray-50">
    <button @click="toggleSidebar" class="absolute top-4 right-4 md:hidden p-2 text-white">
      <i class="fas fa-times"></i>
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
            <i class="fas fa-home"></i> <!-- Changer ici pour l'icône Dashboard -->
            <span class="ml-4">Dashboard</span>
          </router-link>
        </li>
        <li class="relative px-6 py-3">
          <router-link
            to="/dashboard/projets"
            class="flex h-12 items-center truncate rounded-t-3xl rounded-b-3xl px-6 py-4 text-white outline-none transition duration-300 ease-linear hover:bg-white hover:text-[#2a2185]"
            active-class="bg-white text-[#2a2185]"
            exact-active-class="bg-white text-[#2a2185]"
          >
            <i class="fas fa-box"></i> <!-- Changer ici pour l'icône G-Projets -->
            <span class="ml-4">G-Projets</span>
          </router-link>
        </li>
        <li class="relative px-6 py-3">
          <router-link
            to="/dashboard/MesProjet"
            class="flex h-12 items-center truncate rounded-t-3xl rounded-b-3xl px-6 py-4 text-white outline-none transition duration-300 ease-linear hover:bg-white hover:text-[#2a2185]"
            active-class="bg-white text-[#2a2185]"
            exact-active-class="bg-white text-[#2a2185]"
          >
            <i class="fas fa-tasks"></i> <!-- Changer ici pour l'icône Mes Projets -->
            <span class="ml-4">Mes Projets</span>
          </router-link>
        </li>
        <li class="relative px-6 py-3">
          <router-link
            to="/dashboard/users"
            class="flex h-12 items-center truncate rounded-t-3xl rounded-b-3xl px-6 py-4 text-white outline-none transition duration-300 ease-linear hover:bg-white hover:text-[#2a2185]"
            active-class="bg-white text-[#2a2185]"
            exact-active-class="bg-white text-[#2a2185]"
          >
            <i class="fas fa-users"></i>
            <span class="ml-4">G-Users</span>
          </router-link>
        </li>
        <li class="relative px-6 py-3">
          <router-link
            to="/dashboard/roles"
            class="flex h-12 items-center truncate rounded-t-3xl rounded-b-3xl px-6 py-4 text-white outline-none transition duration-300 ease-linear hover:bg-white hover:text-[#2a2185]"
            active-class="bg-white text-[#2a2185]"
            exact-active-class="bg-white text-[#2a2185]"
          >
            <i class="fas fa-user-shield"></i>
            <span class="ml-4">G-Roles</span>
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
