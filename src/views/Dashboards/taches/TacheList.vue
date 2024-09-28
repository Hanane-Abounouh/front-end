<template>
  <div class="w-full overflow-hidden rounded-lg shadow-xs p-4">
    <div class="flex flex-col md:flex-row justify-between gap-4 items-center mb-4">
      <h2 class="text-lg md:text-2xl text-[#2a2185] font-bold">Liste des Tâches</h2>
      <button @click="showCreateForm = true" 
        class="mt-4 md:mt-0 px-2 py-1 md:py-2 text-gray-700 border border-gray-50 rounded bg-[#dbdbf1] flex items-center space-x-2">
        <i class="fas fa-plus"></i>
        <span class="hidden md:inline">Ajouter une Tâche</span> <span class="md:hidden">Ajouter</span>
      </button>
    </div>
    
    <!-- Tableau -->
    <div class="w-full overflow-x-auto mt-4">
      <table class="min-w-full table-auto whitespace-no-wrap bg-white border divide-y divide-gray-200 rounded-lg shadow-sm">
        <thead>
          <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase bg-gray-50 border-b">
            <th class="px-4 py-3">ID</th>
            <th class="px-4 py-3">Titre</th>
            <th class="px-4 py-3">Description</th>
            <th class="px-4 py-3">Date Limite</th>
            <th class="px-4 py-3">Statut</th>
            <th class="px-4 py-3">Priorité</th>
            <th class="px-4 py-3">Projet ID</th>
            <th class="px-4 py-3">Assigné à</th>
            <th class="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="tâche in paginatedTâches" :key="tâche.id" class="text-gray-700 hover:bg-gray-100">
            <td class="px-4 py-3 text-sm">{{ tâche.id }}</td>
            <td class="px-4 py-3 text-sm">{{ tâche.titre }}</td>
            <td class="px-4 py-3 text-sm">{{ tâche.description }}</td>
            <td class="px-4 py-3 text-sm">{{ tâche.date_limite }}</td>
            <td class="px-4 py-3 text-sm">{{ tâche.statut }}</td>
            <td class="px-4 py-3 text-sm">{{ tâche.priorité }}</td>
            <td class="px-4 py-3 text-sm">{{ tâche.projet_id }}</td>
            <td class="px-4 py-3 text-sm">{{ tâche.assigné_a || 'pas assigné' }}</td>
            <td class="px-4 py-3 text-sm">
              <div class="flex items-center space-x-2">
                <button @click="openEditForm(tâche)" class="p-2 rounded hover:bg-gray-200">
                  <i class="fas fa-edit text-green-600"></i>
                </button>
                <button @click="confirmDeleteTâche(tâche.id)" class="p-2 rounded hover:bg-gray-200">
                  <i class="fas fa-trash text-red-600"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-center mt-6 space-x-4">
      <button 
        @click="prevPage" 
        :disabled="currentPage === 1" 
        class="px-2 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50">
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
        class="px-2 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>

    <!-- Formulaire de création -->
    <TacheCreate 
      v-if="showCreateForm" 
      @close="showCreateForm = false" 
      @created="fetchTâches" 
    />

    <!-- Formulaire d'édition -->
    <TacheEdit 
      v-if="showEditForm" 
      :tâche-id="editTâcheId" 
      :initial-tâche="tâcheToEdit" 
      @close="showEditForm = false" 
      @updated="fetchTâches" 
    />
  </div>
</template>

<script>
import axios from '@/api/axios';
import TacheCreate from './TacheCreate.vue';
import TacheEdit from './TacheEdit.vue';

export default {
  name: 'TacheList',
  components: {
    TacheCreate,
    TacheEdit
  },
  data() {
    return {
      tâches: [],
      currentPage: 1,
      itemsPerPage: 5,
      showCreateForm: false,
      showEditForm: false,
      editTâcheId: null,
      tâcheToEdit: {}
    };
  },
  computed: {
    paginatedTâches() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.tâches.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.tâches.length / this.itemsPerPage);
    }
  },
  methods: {
    async fetchTâches() {
      try {
        const response = await axios.get('/taches');
        this.tâches = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches:', error);
      }
    },
    confirmDeleteTâche(id) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
        this.deleteTâche(id);
      }
    },
    async deleteTâche(id) {
      try {
        await axios.delete(`/taches/${id}`);
        this.fetchTâches();
      } catch (error) {
        console.error('Erreur lors de la suppression de la tâche:', error);
      }
    },
    openEditForm(tâche) {
      this.tâcheToEdit = tâche;
      this.editTâcheId = tâche.id;
      this.showEditForm = true;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
  },
  mounted() {
    this.fetchTâches();
  }
};
</script>

<style scoped>
/* Ajoutez ici des styles si nécessaire */
</style>
