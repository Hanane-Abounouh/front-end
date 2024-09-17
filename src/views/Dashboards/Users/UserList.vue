
<template>
  <div class="p-20">
    <h2 class="text-2xl font-bold mb-4">Liste des Utilisateurs</h2>
    <button @click="showCreateForm = true" class="mb-4 p-2 text-white rounded bg-gradient-to-r from-[#c65a1b] to-[#8d362d]">
      <i class="fas fa-plus mr-2"></i> Ajouter un Utilisateur
    </button>
    <table class="min-w-full table-auto bg-white shadow-md rounded-lg">
      <thead class="bg-gray-200">
        <tr>
          <th class="py-2 px-4 text-left">ID</th>
          <th class="py-2 px-4 text-left">Avatar</th>
          <th class="py-2 px-4 text-left">Nom</th>
          <th class="py-2 px-4 text-left">Email</th>
          <th class="py-2 px-4 text-left">Rôle</th>
          <th class="py-2 px-4 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="border-b hover:bg-gray-100">
          <td class="py-2 px-4">{{ user.id }}</td>
          <td class="py-2 px-4">
            <img :src="'http://localhost:8000/storage/' + user.avatar" alt="Avatar" class="w-12 h-12 rounded-full object-cover">
          </td>
          <td class="py-2 px-4">{{ user.name }}</td>
          <td class="py-2 px-4">{{ user.email }}</td>
          <td class="py-2 px-4">{{ user.role_id }}</td>
          <td class="py-2 px-4 flex space-x-2">
            <button @click="editUser(user.id)" class="p-2 text-white bg-green-500 hover:bg-green-700 rounded">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="deleteUser(user.id)" class="p-2 text-white bg-red-500 hover:bg-red-700 rounded">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <UserCreate v-if="showCreateForm" @close="showCreateForm = false" @userCreated="fetchUsers" />
    <UserEdit v-if="editUserId" :userId="editUserId" @close="editUserId = null" @userUpdated="fetchUsers" />
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
      selectedUserId: null,
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
    showUser(userId) {
      this.selectedUserId = userId;
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
