<template>
  <div class="flex flex-col h-screen">
    <Header @toggle-sidebar="toggleSidebar" />
    <div class="flex flex-1 flex-col">
      <Aside :class="{ 'block': isSidebarOpen, 'hidden': !isSidebarOpen }" />
      <nav class="h-14 md:ml-80 mt-20 border-t border-gray-100 bg-gray-100 flex items-center gap-10 px-4 md:px-11 shadow-sm">
      <select name="mes-projets" class="bg-white border border-gray-300 rounded-lg px-12 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3a319f] focus:border-[#3a319f] sm:text-sm">
     <option value="" disabled selected>Mes projets</option>

     <option v-for="projet in projets" :key="projet.id" :value="projet.id">
      {{ projet.name }}
     </option>
     </select>

        <router-link to="/dashboard/ProjetCreate" class="bg-gradient-to-r from-[#6d68a4] to-[#3a319f] text-white items-center px-4 py-1 md:py-2 rounded-md hover:bg-gray-600">
          <i class="fas fa-plus mr-2"></i>
          <span class="hidden md:inline">Créer un projet</span>
        </router-link>
      </nav>
      <main class="flex-1 md:ml-80 mt-4 md:mt-10 bg-white border border-gray-200 py-6 px-4 md:px-8">
        <router-view />
      </main>
    </div>
    <!-- <Footer /> -->
  </div>
</template>

<script>
import axios from '@/api/axios'; // Assurez-vous que le chemin est correct pour votre projet
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
      isSidebarOpen: false,
      projets: [] // Initialisez une variable pour stocker les projets
    };
  },
methods: {
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  },
  async fetchUserProjets() {
    try {
      // Utilisez l'URL correcte pour obtenir les projets de l'utilisateur connecté
      const response = await axios.get('http://localhost:8000/api/user/projets');
      this.projets = response.data; // Stockez les projets dans l'état du composant
    } catch (error) {
      console.error('Erreur lors de la récupération des projets:', error);
    }
  }
},
mounted() {
  this.fetchUserProjets(); // Récupérez les projets de l'utilisateur connecté lorsque le composant est monté
}

};
</script>
