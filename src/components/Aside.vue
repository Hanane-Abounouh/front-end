<template>
   <aside :class="{'block': isSidebarOpen, 'hidden': !isSidebarOpen, 'lg:block': true}" class="fixed z-50  w-80 h-full bg-[#2a2185] shadow-lg border border-gray-50">
    <!-- Bouton de fermeture (visible uniquement en mobile) -->
    <button @click="toggleSidebar" class="absolute top-4 right-4 lg:hidden p-2 text-white">
      <i class="fas fa-times"></i> <!-- Icône pour fermer la sidebar -->
    </button>
    <h1 class="px-6 py-8 text-2xl font-bold text-white text-center border-b border-[#4f47a6] mb-6">Gestion de Projet</h1>
    
    <div class="text-white">
      <ul class="mt-6 space-y-2">
        <li class="relative px-6 py-3">
          <router-link
            to="/dashboard"
            class="flex h-12 items-center truncate rounded-t-3xl rounded-b-3xl px-6 py-4 outline-none transition duration-300 ease-linear hover:bg-white hover:text-[#2a2185]"
            :class="{ 'text-white': $route.path !== '/dashboard', 'bg-white text-[#2a2185] font-semibold': $route.path === '/dashboard' }"
          >
            <i class="fas fa-home"></i>
            <span class="ml-4">Dashboard</span>
          </router-link>
        </li>
        <li class="relative px-6 py-3">
          <router-link
            to="/dashboard/projets"
            class="flex h-12 items-center truncate rounded-t-3xl rounded-b-3xl px-6 py-4 outline-none transition duration-300 ease-linear hover:bg-white hover:text-[#2a2185]"
            :class="{ 'text-white': $route.path !== '/dashboard/projets', 'bg-white text-[#2a2185] font-semibold': $route.path === '/dashboard/projets' }"
          >
            <i class="fas fa-box"></i>
            <span class="ml-4">G-Projets</span>
          </router-link>
        </li>
        <li class="relative px-6 py-3">
          <router-link
            to="/dashboard/MesProjet"
            class="flex h-12 items-center truncate rounded-t-3xl rounded-b-3xl px-6 py-4 outline-none transition duration-300 ease-linear hover:bg-white hover:text-[#2a2185]"
            :class="{ 'text-white': $route.path !== '/dashboard/MesProjet', 'bg-white text-[#2a2185] font-semibold': $route.path === '/dashboard/MesProjet' }"
          >
            <i class="fas fa-tasks"></i>
            <span class="ml-4">Mes Projets</span>
          </router-link>
        </li>
        <li class="relative px-6 py-3">
          <router-link
            to="/dashboard/Taches"
            class="flex h-12 items-center truncate rounded-t-3xl rounded-b-3xl px-6 py-4 outline-none transition duration-300 ease-linear hover:bg-white hover:text-[#2a2185]"
            :class="{ 'text-white': $route.path !== '/dashboard/Taches', 'bg-white text-[#2a2185] font-semibold': $route.path === '/dashboard/Taches' }"
          >
            <i class="fas fa-tasks"></i>
            <span class="ml-4">G-Tâches</span>
          </router-link>
        </li>
        <!-- v-if="isAdmin" -->
        <li  class="relative px-6 py-3">
          <router-link
            to="/dashboard/users"
            class="flex h-12 items-center truncate rounded-t-3xl rounded-b-3xl px-6 py-4 outline-none transition duration-300 ease-linear hover:bg-white hover:text-[#2a2185]"
            :class="{ 'text-white': $route.path !== '/dashboard/users', 'bg-white text-[#2a2185] font-semibold': $route.path === '/dashboard/users' }"
          >
            <i class="fas fa-users"></i>
            <span class="ml-4">G-Users</span>
          </router-link>
        </li>
         <li  class="relative px-6 py-3">
          <router-link
            to="/dashboard/Commentaires"
            class="flex h-12 items-center truncate rounded-t-3xl rounded-b-3xl px-6 py-4 outline-none transition duration-300 ease-linear hover:bg-white hover:text-[#2a2185]"
            :class="{ 'text-white': $route.path !== '/dashboard/Commentaires', 'bg-white text-[#2a2185] font-semibold': $route.path === '/dashboard/Commentaires' }"
          >
            <i class="fas fa-users"></i>
            <span class="ml-4">G-Commentaires</span>
          </router-link>
        </li>
        <!-- v-if="isAdmin" -->
        <li  class="relative px-6 py-3">
          <router-link
            to="/dashboard/roles"
            class="flex h-12 items-center truncate rounded-t-3xl rounded-b-3xl px-6 py-4 outline-none transition duration-300 ease-linear hover:bg-white hover:text-[#2a2185]"
            :class="{ 'text-white': $route.path !== '/dashboard/roles', 'bg-white text-[#2a2185] font-semibold': $route.path === '/dashboard/roles' }"
          >
            <i class="fas fa-user-shield"></i>
            <span class="ml-4">G-Roles</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import axios from '@/api/axios';

export default {
  name: 'AsideApp',
   props: {
    isSidebarOpen: Boolean, 
  },
  data() {
    return {
      isAdmin: false,
   
    };
  },
  created() {
    this.checkIfAdmin();
  },
  methods: {
    async checkIfAdmin() {
      try {
        const response = await axios.get('/users');
        this.isAdmin = response.data.role.id === 1; // Vérifie si l'utilisateur est un admin
      } catch (error) {
        console.error('Erreur lors de la vérification du rôle:', error);
      }
    },
    toggleSidebar() {
      this.$emit('toggle-sidebar'); 
    },
  }
};
</script>

<style scoped>
/* Ajoutez des styles supplémentaires si nécessaire */
</style>
