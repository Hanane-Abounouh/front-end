<template>
  <div class="w-full overflow-hidden rounded-lg shadow-xs p-4">
    <div class="flex justify-between gap-4 items-center mb-4">
      <h2 class="text-lg md:text-2xl text-[#2a2185] font-bold">Liste des Projets</h2>
      <button @click="showCreateForm = true" 
        class="mt-4 md:mt-0 px-2 py-1 md:py-2 text-gray-700 border border-gray-50 rounded bg-[#dbdbf1] flex items-center space-x-2">
        <i class="fas fa-plus"></i>
        <span class="hidden md:inline">Ajouter un Projet</span>
      </button>
    </div>
    
    <div class="w-full overflow-x-auto mt-4">
      <table class="w-full table-auto whitespace-no-wrap bg-white border divide-y divide-gray-200 rounded-lg shadow-sm">
        <thead>
          <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase bg-gray-50 border-b">
            <th class="px-4 py-3">ID</th>
            <th class="px-4 py-3">Nom du Projet</th>
            <th class="px-4 py-3">Description</th>
            <th class="px-4 py-3">Date de Début</th>
            <th class="px-4 py-3">Date de Fin</th>
            <th class="px-4 py-3">Créé par</th>
            <th class="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="project in paginatedProjects" :key="project.id" class="text-gray-700 hover:bg-gray-100">
            <td class="px-4 py-3 text-sm">{{ project.id }}</td>
            <td class="px-4 py-3 text-sm">{{ project.name }}</td>
            <td class="px-4 py-3 text-sm">{{ project.description }}</td>
            <td class="px-4 py-3 text-sm">{{ project.date_debut }}</td>
            <td class="px-4 py-3 text-sm">{{ project.date_fin }}</td>
            <td class="px-4 py-3 text-sm">{{ project.utilisateur ? project.utilisateur.name : 'Inconnu' }}</td>
            <td class="px-4 py-3 text-sm">
              <div class="flex items-center space-x-4">
                <button @click="editProject(project.id)" class="p-2 rounded hover:bg-gray-200">
                  <i class="fas fa-edit text-green-600"></i>
                </button>
                <button @click="confirmDeleteProject(project.id)" class="p-2 rounded hover:bg-gray-200">
                  <i class="fas fa-trash text-red-600"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex items-center justify-center mt-4 space-x-2">
      <button 
        @click="prevPage" 
        :disabled="currentPage === 1" 
        class="px-3 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50">
        <i class="fas fa-chevron-left"></i>
      </button>

      <div class="flex space-x-1">
        <button 
          v-for="page in totalPages" 
          :key="page" 
          @click="currentPage = page" 
          :class="['px-4 py-2 rounded-lg transition-colors', currentPage === page ? 'bg-[#2a2185] text-white' : 'bg-white text-gray-700 hover:bg-gray-200']">
          {{ page }}
        </button>
      </div>

      <button 
        @click="nextPage" 
        :disabled="currentPage === totalPages" 
        class="px-3 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>

    <ProjetCreate 
      v-if="showCreateForm" 
      @close="showCreateForm = false" 
      @created="fetchAllProjects" 
    />
    <ProjetEdit 
      v-if="editProjectId" 
      :projectId="editProjectId" 
      @close="editProjectId = null" 
      @projectUpdated="fetchAllProjects" 
    />

    <div v-if="confirmDeleteId" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h3 class="text-lg font-bold mb-4">Confirmation</h3>
        <p>Êtes-vous sûr de vouloir supprimer ce projet?</p> 
        <div class="flex justify-end mt-4">
          <button @click="deleteProject(confirmDeleteId)" class="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700">Confirmer</button>
          <button @click="confirmDeleteId = null" class="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300">Annuler</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/api/axios';
import ProjetCreate from './ProjetCreate.vue';
import ProjetEdit from './ProjetEdit.vue';

export default {
  name: 'ProjectList',
  components: { ProjetCreate, ProjetEdit },
  data() {
    return {
      projects: [],
      showCreateForm: false,
      editProjectId: null,
      confirmDeleteId: null, // Ajoutez cette variable
      currentPage: 1,
      itemsPerPage: 6,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.projects.length / this.itemsPerPage);
    },
    paginatedProjects() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.projects.slice(start, start + this.itemsPerPage);
    }
  },
  async created() {
    await this.fetchAllProjects();
  },
  methods: {
    async fetchAllProjects() {
      try {
        const response = await axios.get('/projets');
        this.projects = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des projets:', error);
      }
    },
    editProject(projectId) {
      this.editProjectId = projectId;
    },
    confirmDeleteProject(projectId) {
      this.confirmDeleteId = projectId; // Afficher le modal
    },
    async deleteProject(projectId) {
      try {
        await axios.delete(`/projets/${projectId}`);
        this.fetchAllProjects();
        this.confirmDeleteId = null; // Fermer le modal après suppression
      } catch (error) {
        console.error('Erreur lors de la suppression du projet:', error);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    }
  }
};
</script>

<style scoped>
/* Ajoutez vos styles personnalisés ici si nécessaire */
@media (max-width: 768px) {
  h2 {
    font-size: 1.5rem; /* Ajuster la taille du titre sur mobile */
  }

  table {
    font-size: 0.875rem; /* Réduire la taille de la police du tableau */
  }
}
</style>
