<template>
  <div class="w-full overflow-hidden rounded-lg shadow-xs p-4">
    <div class="flex justify-between gap-4 items-center mb-4">
      <h2 class="text-lg md:text-2xl text-[#2a2185] font-bold">Liste des Utilisateurs</h2>
      <button @click="showCreateForm = true" 
        class="mt-4 md:mt-0 px-2 py-1 md:py-2 text-gray-700 border border-gray-50 rounded bg-[#dbdbf1] flex items-center space-x-2">
        <i class="fas fa-plus"></i>
        <span class="hidden md:inline">Ajouter un Utilisateur</span> <span class="md:hidden">Ajouter</span>
      </button>
    </div>
    
    <!-- Tableau -->
    <div class="w-full overflow-x-auto mt-4">
      <table class="w-full table-auto whitespace-no-wrap bg-white border divide-y divide-gray-200 rounded-lg shadow-sm">
        <thead>
          <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase bg-gray-50 border-b">
            <th class="px-4 py-3">ID</th>
            <th class="px-4 py-3">Nom</th>
            <th class="px-4 py-3">Email</th>
            <th class="px-4 py-3">Rôle</th>
            <th class="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in paginatedUsers" :key="user.id" class="text-gray-700 hover:bg-gray-100">
            <td class="px-4 py-3 text-sm">{{ user.id }}</td>
            <td class="px-4 py-3 text-sm flex items-center space-x-4">
              <img :src="user.avatar" alt="Avatar" class="w-10 h-10 rounded-full object-cover">
              <span>{{ user.name }}</span>
            </td>
            <td class="px-4 py-3 text-sm">{{ user.email }}</td>
            <td class="px-4 py-3 text-sm">{{ user.role.nom }}</td>
            <td class="px-4 py-3 text-sm">
              <div class="flex items-center space-x-2">
                <button @click="editUser(user.id)" class="p-2 rounded hover:bg-gray-200">
                  <svg class="w-5 h-5 text-green-600" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                  </svg>
                </button>
                <button @click="confirmDeleteUser(user.id)" class="p-2 rounded hover:bg-gray-200">
                  <svg class="w-5 h-5 text-red-600" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                  </svg>
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

    <!-- Formulaires de création et d'édition -->
    <UserCreate 
      v-if="showCreateForm" 
      @close="showCreateForm = false" 
      @created="fetchUsers" 
    />
    <UserEdit 
      v-if="editUserId" 
      :userId="editUserId" 
      @close="editUserId = null" 
      @userUpdated="fetchUsers" 
    />

    <!-- Modal de confirmation de suppression -->
    <div v-if="confirmDeleteId" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h3 class="text-lg font-bold mb-4">Confirmation</h3>
        <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
        <div class="flex justify-end mt-4">
          <button @click="deleteUser(confirmDeleteId)" class="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700">Confirmer</button>
          <button @click="confirmDeleteId = null" class="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300">Annuler</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from '@/api/axios';
import UserCreate from './UserCreate.vue';
import UserEdit from './UserEdit.vue';

export default {
  name: 'UserList',
  components: {
    UserCreate,
    UserEdit
  },
  data() {
    return {
      users: [],
      showCreateForm: false,
      editUserId: null,
      confirmDeleteId: null, // État pour la confirmation de suppression
      currentPage: 1,
      itemsPerPage: 6,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.users.length / this.itemsPerPage);
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.users.slice(start, start + this.itemsPerPage);
    }
  },
  async created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('/users');
        this.users = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    },
    editUser(userId) {
      this.editUserId = userId;
    },
    confirmDeleteUser(userId) {
      this.confirmDeleteId = userId; // Définir l'ID de l'utilisateur à supprimer
    },
    async deleteUser(userId) {
      try {
        await axios.delete(`/users/${userId}`);
        this.fetchUsers();
        this.confirmDeleteId = null; // Réinitialiser après la suppression
      } catch (error) {
        console.error('Erreur lors de la suppression de l’utilisateur:', error);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }
};
</script>
