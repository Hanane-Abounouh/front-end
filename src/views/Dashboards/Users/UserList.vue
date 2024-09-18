<template>
  <div class="w-full overflow-hidden rounded-lg shadow-xs p-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl text-[#2a2185] font-bold">Liste des Utilisateurs</h2>
      <button @click="showCreateForm = true" class="p-2 text-white rounded bg-gradient-to-r from-[#6d68a4] to-[#3a319f]">
        <i class="fas fa-plus mr-2"></i> Ajouter un Utilisateur
      </button>
    </div>
    <!-- Tableau -->
    <div class="w-full overflow-x-auto mt-14">
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
          <tr v-for="user in users" :key="user.id" class="text-gray-700 hover:bg-gray-100">
            <td class="px-4 py-3 text-sm">{{ user.id }}</td>
            <td class="px-4 py-3 text-sm flex items-center space-x-4">
              <img :src="user.avatar" alt="Avatar" class="w-10 h-10 rounded-full object-cover">
              <span>{{ user.name }}</span>
            </td>
            <td class="px-4 py-3 text-sm">{{ user.email }}</td>
            <td class="px-4 py-3 text-sm">{{ user.role.nom }}</td>
            <td class="px-4 py-3 text-sm">
              <div class="flex items-center space-x-4">
                <!-- Bouton Éditer -->
                <button @click="editUser(user.id)" class="p-2 rounded hover:bg-gray-200">
                  <svg class="w-5 h-5 text-green-600" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                  </svg>
                </button>
                <!-- Bouton Supprimer -->
                <button @click="deleteUser(user.id)" class="p-2 rounded hover:bg-gray-200">
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
      editUserId: null
    };
  },
  async created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:8000/api/users');
        this.users = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    },
    editUser(userId) {
      this.editUserId = userId;
    },
    async deleteUser(userId) {
      try {
        await axios.delete(`http://localhost:8000/api/users/${userId}`);
        this.fetchUsers();
      } catch (error) {
        console.error('Erreur lors de la suppression de l’utilisateur:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Ajoutez des styles spécifiques si nécessaire */
</style>
