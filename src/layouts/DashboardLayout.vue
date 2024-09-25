<template>
  <div class="flex flex-col h-screen">
    <Header  @toggleSidebar="toggleSidebar" />
    <div class="flex flex-1 flex-col">
      <Aside :class="{ 'block': isSidebarOpen, 'hidden': !isSidebarOpen }" />
      
      <!-- Barre de navigation -->
      <nav class="h-14 fixed z-20 w-full  md:ml-80 mt-16 border-t border-gray-100 bg-gray-100 flex items-center gap-10 px-10 py-10  md:px-12 shadow-sm">
        
        <!-- Menu déroulant pour les projets -->
        <!-- <select 
          name="mes-projets" 
          class="bg-white border border-gray-300 rounded-lg px-12 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3a319f] focus:border-[#3a319f] sm:text-sm"
          @change="goToTasks($event.target.value)"  
        >
          <option value="" disabled selected>Mes projets</option>
          <option v-for="projet in projets" :key="projet.id" :value="projet.id">
            {{ projet.name }}
          </option>
        </select> -->

        <!-- Lien pour créer un projet -->
        <router-link to="/dashboard/ProjetCreate" class="bg-gradient-to-r from-[#6d68a4] to-[#3a319f] text-white items-center px-4 py-1 md:py-2 rounded-md hover:bg-gray-600">
          <i class="fas fa-plus mr-2"></i>
          <span class="hidden md:inline">Créer un projet</span>
        </router-link>
      </nav>
      
      <main class="flex-1  md:ml-80 mt-36 bg-white border border-gray-200 py-6 px-4 md:px-8">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import axios from '@/api/axios'; // Assurez-vous que le chemin est correct pour votre projet
import Header from '../components/Header.vue';
import Aside from '../components/Aside.vue';

export default {
  components: {
    Header,
    Aside,
  },
  data() {
    return {
      isSidebarOpen: false,
      projets: [] // Initialisation de la liste des projets
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    
    // Fonction pour récupérer les projets de l'utilisateur connecté
    async fetchUserProjets() {
      try {
        const response = await axios.get('http://localhost:8000/api/user/projets');
        this.projets = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des projets:', error);
      }
    },

    // Redirection vers le tableau des tâches d'un projet sélectionné
    goToTasks(projetId) {
      if (projetId) {
        this.$router.push({ name: 'TacheBoard', params: { projectId: projetId } });  // Utilisation de Vue Router pour rediriger
      }
    }
  },

  mounted() {
    this.fetchUserProjets(); // Charger les projets une fois le composant monté
  }
};
</script>
