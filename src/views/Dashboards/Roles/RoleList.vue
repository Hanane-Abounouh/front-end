<template>
  <div class="w-full overflow-hidden rounded-lg shadow-xs p-4">
       <div class="flex justify-between gap-4 items-center mb-4">
      <h2 class="text-lg md:text-2xl  text-[#2a2185] font-bold">Liste des Rôles</h2>
       <button @click="showCreateForm = true" 
      class="mt-4 md:mt-0 px-2 py-1 md:py-2 text-gray-700 border border-gray-50 rounded bg-[#dbdbf1] flex items-center space-x-2">
      <i class="fas fa-plus"></i>
     <span class="hidden md:inline">Ajouter un Rôle</span> <span class="md:hidden">Ajouter</span>
    </button>
    </div>
    <!-- Tableau -->
    <div class="w-full overflow-x-auto mt-14">
      <table class="w-full table-auto whitespace-no-wrap bg-white border divide-y divide-gray-200 rounded-lg shadow-sm">
        <thead>
          <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase bg-gray-50 border-b">
            <th class="px-4 py-3">ID</th>
            <th class="px-4 py-3">Nom</th>
            <th class="px-4 py-3">Description</th>
            <th class="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="role in roles" :key="role.id" class="text-gray-700 hover:bg-gray-100">
            <td class="px-4 py-3 text-sm">{{ role.id }}</td>
            <td class="px-4 py-3 text-sm">{{ role.nom }}</td>
            <td class="px-4 py-3 text-sm">{{ role.description }}</td>
            <td class="px-4 py-3 text-sm">
              <div class="flex items-center space-x-4">
                <!-- Bouton Éditer -->
                <button @click="editRole(role.id)" class="p-2 rounded hover:bg-gray-200">
                  <svg class="w-5 h-5 text-green-600" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                  </svg>
                </button>
                <!-- Bouton Supprimer -->
                <button @click="deleteRole(role.id)" class="p-2 rounded hover:bg-gray-200">
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
    <RoleCreate 
      v-if="showCreateForm" 
      @close="showCreateForm = false" 
      @created="fetchRoles" 
    />
    <RoleEdit 
      v-if="editRoleId" 
      :roleId="editRoleId" 
      @close="editRoleId = null" 
      @roleUpdated="fetchRoles" 
    />
  </div>
</template>

<script>
import api from '@/api/axios';
import RoleCreate from './RoleCreate.vue';
import RoleEdit from './RoleEdit.vue';

export default {
  name: 'RoleList',
  components: {
    RoleCreate,
    RoleEdit
  },
  data() {
    return {
      roles: [],
      showCreateForm: false,
      editRoleId: null
    };
  },
  async created() {
    this.fetchRoles();
  },
  methods: {
    async fetchRoles() {
      try {
        const response = await api.get('/roles');
        this.roles = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des rôles:', error);
      }
    },
    editRole(roleId) {
      this.editRoleId = roleId;
    },
    async deleteRole(roleId) {
      try {
        await api.delete(`/roles/${roleId}`);
        this.fetchRoles();
      } catch (error) {
        console.error('Erreur lors de la suppression du rôle:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Ajoutez des styles spécifiques si nécessaire */
</style>
