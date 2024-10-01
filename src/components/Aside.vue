<template>
   <aside :class="{'block': isSidebarOpen, 'hidden': !isSidebarOpen, 'lg:block': true}" class="fixed z-50  w-80 h-full bg-[#2a2185] shadow-lg border border-gray-50 overflow-auto">
    <!-- Bouton de fermeture (visible uniquement en mobile) -->
    <button @click="toggleSidebar" class="absolute top-4 right-4 lg:hidden p-2 text-white">
      <i class="fas fa-times"></i> <!-- Icône pour fermer la sidebar -->
    </button>
    <h1 class="px-6 py-8 text-2xl font-bold text-white text-center border-b border-[#4f47a6] mb-6">Proxime</h1>
    
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
        <li class="relative px-6 py-3" v-if="isAdmin" >
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
        <li class="relative px-6 py-3" v-if="isAdmin" >
          <router-link 
            to="/dashboard/Taches"
            class="flex h-12 items-center truncate rounded-t-3xl rounded-b-3xl px-6 py-4 outline-none transition duration-300 ease-linear hover:bg-white hover:text-[#2a2185]"
            :class="{ 'text-white': $route.path !== '/dashboard/Taches', 'bg-white text-[#2a2185] font-semibold': $route.path === '/dashboard/Taches' }"
          >
            <i class="fas fa-tasks"></i>
            <span class="ml-4">G-Tâches</span>
          </router-link>
        </li>
       
        <li  class="relative px-6 py-3" v-if="isAdmin" >
          <router-link 
            to="/dashboard/users"
            class="flex h-12 items-center truncate rounded-t-3xl rounded-b-3xl px-6 py-4 outline-none transition duration-300 ease-linear hover:bg-white hover:text-[#2a2185]"
            :class="{ 'text-white': $route.path !== '/dashboard/users', 'bg-white text-[#2a2185] font-semibold': $route.path === '/dashboard/users' }"
          >
            <i class="fas fa-users"></i>
            <span class="ml-4">G-Users</span>
          </router-link>
        </li>
         <li  class="relative px-6 py-3" v-if="isAdmin" >
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
        <li  class="relative px-6 py-3"  v-if="isAdmin" >
          <router-link
            to="/dashboard/roles"
            class="flex h-12 items-center truncate rounded-t-3xl rounded-b-3xl px-6 py-4 outline-none transition duration-300 ease-linear hover:bg-white hover:text-[#2a2185]"
            :class="{ 'text-white': $route.path !== '/dashboard/roles', 'bg-white text-[#2a2185] font-semibold': $route.path === '/dashboard/roles' }"
          >
            <i class="fas fa-user-shield"></i>
            <span class="ml-4">G-Roles</span>
          </router-link>
        </li>

          <li  class="relative px-6 py-3"  v-if="isUser" >
          <router-link
            to="/dashboard/ProfileUser"
            class="flex h-12 items-center truncate rounded-t-3xl rounded-b-3xl px-6 py-4 outline-none transition duration-300 ease-linear hover:bg-white hover:text-[#2a2185]"
            :class="{ 'text-white': $route.path !== '/dashboard/ProfileUser', 'bg-white text-[#2a2185] font-semibold': $route.path === '/dashboard/ProfileUser' }"
          >
            <i class="fas fa-user-shield"></i>
            <span class="ml-4">Profil</span>
          </router-link>
        </li>


        <li class="relative px-6 py-3" v-if="isUser">
  <span class="flex h-12 items-center truncate rounded-t-3xl rounded-b-3xl px-6 py-4 outline-none transition duration-300 ease-linear bg-[#39309b] text-white">
    <!-- SVG d'image de projet -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 mr-2 transition duration-300 ease-in-out"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h18v18H3z" />
    </svg>
    Vos Projets
  </span>
  <ul class="mt-4">
  <li v-for="project in allProjects.slice(0, 6)" :key="project.id" class="px-6 flex gap-2 py-2 mt-1 items-center hover:underline rounded">
  <img class="h-4 w-4" src="https://e7.pngegg.com/pngimages/641/837/png-clipart-computer-icons-project-management-icon-design-program-management-automation-blue-text.png" alt="Projet Image">
  
  <router-link
    :to="`/projets/${project.id}/taches`"
    class="text-white hover:underline"
  >
    {{ project.name }}
  </router-link>
</li>


    <!-- Afficher le bouton "Voir plus" si plus de 2 projets sont disponibles -->
  <li v-if="allProjects.length &gt; 6" class="px-6 py-2 mt-1">
      <router-link to="/dashboard/MesProjet" class="text-red-500 hover:underline">
        Voir plus 
      </router-link>
    </li>

  </ul>
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
      isUser: false,
      userId: null,
      allProjects: [], // Pour stocker tous les projets
    };
  },
  created() {
    this.checkUserRole();
    this.fetchProjects(); // Appelle la méthode pour récupérer les projets
  },
  methods: {
    async checkUserRole() {
      try {
        const response = await axios.get('/user');
        const roleId = response.data.role_id;

        this.isAdmin = roleId === 1; // Admin
        this.isUser = roleId === 2; // Utilisateur
      } catch (error) {
        console.error('Erreur lors de la vérification du rôle:', error);
      }
    },
   async fetchProjects() {
  try {
    const userResponse = await axios.get('/user');
    this.userId = userResponse.data.id;

    const projectsResponse = await axios.get('/user/projets');
    this.allProjects = projectsResponse.data; // Récupération de tous les projets

    console.log(this.allProjects); // Log la structure des projets
  } catch (error) {
    console.error('Erreur lors de la récupération des projets ou de l\'ID utilisateur:', error);
  }
},

    toggleSidebar() {
      this.$emit('toggle-sidebar');
    },
    goToTaskBoard(projectId) {
  if (projectId) {
    this.$router.push({ name: 'TacheBoard', params: { projectId } }).then(() => {
     
    });
  
  }
},

  },
};
</script>

<style scoped>
/* Ajoutez des styles supplémentaires si nécessaire */
::-webkit-scrollbar {
  width: 2.5px;
}

::-webkit-scrollbar-thumb {
  background-color: #9a9aa2;
  border-radius: 10px;
  
}
</style>
