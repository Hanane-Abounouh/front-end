<template>
  <div class="container p-4">
    <!-- Titre -->
    <h1 class="text-2xl md:text-3xl font-bold text-gray-700 mb-6">Mes Projets</h1>

    <div class="flex justify-between">
      <!-- Filtre des projets -->
      <div class="mb-6">
        <label for="filter" class="block text-gray-700 font-medium">Filtrer par :</label>
        <select 
          id="filter"
          class="mt-2 block py-2 px-6 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:gray-blue-400"
          v-model="selectedFilter" 
          @change="filterProjects"
        >
          <option value="all">Tous les projets</option>
          <option value="created">Projets créés par moi</option>
          <option value="invited">Projets où je suis invité</option>
        </select>
      </div>

      <!-- Champ de recherche -->
      <div class="mb-6">
        <label for="search" class="block text-gray-700 font-medium">Rechercher un projet :</label>
        <input 
          type="text"
          id="search"
          class="mt-2 block py-2 px-8 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:gray-blue-400"
          v-model="searchTerm"
          @input="filterProjects"
          placeholder="Entrez le nom du projet"
        />
      </div>
    </div>

    <!-- Liste des projets en grille -->
    <ul class="grid grid-cols-1 mt-10 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <li v-for="projet in filteredProjects" :key="projet.id" class="bg-gray-50 border border-gray-200 rounded-lg shadow p-4">
        <div class="flex flex-col justify-between h-full">
          <div>
            <h3 class="text-lg font-semibold text-gray-800">{{ projet.name }}</h3>
            <p class="text-sm mt-3 text-gray-600">Créé le : <span class="font-medium">{{ projet.date_debut }}</span></p>
          </div>

          <!-- Boutons "Éditer" et "Supprimer" -->
          <div v-if="projet.créé_par === userId" class="mt-6 flex space-x-2">
            <button 
              @click="editProject(projet.id)" 
              class="flex items-center space-x-1 px-3 py-1 bg-green-500 text-white font-medium text-sm rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536M16 3a2.5 2.5 0 00-3.536 0l-8.5 8.5A1.5 1.5 0 004 13.5V16h2.5a1.5 1.5 0 001.06-.44l8.5-8.5A2.5 2.5 0 0016 3z"/>
              </svg>
            </button>
            <button 
              @click="confirmDeleteProject(projet.id)" 
              class="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white font-medium text-sm rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
      </li>
    </ul>

    <!-- Modal pour éditer un projet -->
    <div v-if="editProjetId !== null" class="modal">
      <ProjetEdit 
        :projetId="editProjetId" 
        @projetUpdated="fetchProjects"
        @close="editProjetId = null"
      />
    </div>
  </div>
</template>

<script>
import ProjetEdit from './ProjetEdit.vue';
import axios from '@/api/axios';

export default {
  name: 'MesProjet',
  components: {
    ProjetEdit
  },
  data() {
    return {
      userId: null,
      allProjects: [],
      filteredProjects: [],
      selectedFilter: 'all',
      searchTerm: '',
      editProjetId: null
    };
  },
  methods: {
    async fetchProjects() {
      try {
        const projectsResponse = await axios.get('/user/projets');
        this.allProjects = projectsResponse.data;
        this.filteredProjects = this.allProjects;

        const userResponse = await axios.get('/user');
        this.userId = userResponse.data.id;
      } catch (error) {
        console.error('Erreur lors de la récupération des projets ou de l\'ID utilisateur:', error);
      }
    },
    filterProjects() {
      let filtered = this.allProjects;

      // Appliquer le filtre sélectionné
      if (this.selectedFilter === 'created') {
        filtered = filtered.filter(projet => projet.créé_par === this.userId);
      } else if (this.selectedFilter === 'invited') {
        filtered = filtered.filter(projet => projet.role_id === 3 && projet.utilisateur_id === this.userId);
      }

      // Appliquer la recherche par nom
      if (this.searchTerm) {
        filtered = filtered.filter(projet =>
          projet.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }

      this.filteredProjects = filtered;
    },
    editProject(projetId) {
      this.editProjetId = projetId;
    },
    confirmDeleteProject(projetId) {
      // Utilisation de la fonction confirm pour afficher une alerte de confirmation
      if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
        this.deleteProject(projetId);
      }
    },
    async deleteProject(projetId) {
      try {
        const response = await axios.delete(`/projets/${projetId}`);
        alert(response.data.message);
        this.fetchProjects();
      } catch (error) {
        console.error('Erreur lors de la suppression du projet:', error);
      }
    }
  },
  mounted() {
    this.fetchProjects();
  }
};
</script>

<style scoped>
/* Styles pour le modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;

  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.container {
  max-width: 1200px;
}
</style>
