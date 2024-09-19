<template>
  <div class="inset-0 flex mt-10">
    <div class="bg-white px-6 py-4 border border-gray-100 rounded-lg shadow-md w-full max-w-2xl">
      <h3 class="text-xl font-bold text-[#2a2185] mb-6">Modifier un Rôle</h3>
      <form @submit.prevent="updateRole">
        <!-- Nom -->
        <div class="mb-4">
          <label for="nom" class="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
          <input 
            v-model="role.nom" 
            type="text" 
            id="nom" 
            class="mt-1 block w-full bg-gray-200 rounded-md shadow-sm"
            required
          />
        </div>
        
        <!-- Description -->
        <div class="mb-4">
          <label for="description" class="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <input 
            v-model="role.description" 
            type="text" 
            id="description" 
            class="mt-1 block w-full bg-gray-200 rounded-md shadow-sm"
          />
        </div>

        <!-- Boutons -->
        <div class="flex justify-end space-x-3">
          <button 
            type="button" 
            class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            @click="$emit('close')"
          >
            Annuler
          </button>
          <button 
            type="submit" 
            class="px-4 py-2 bg-[#8c94cc] text-white rounded-md hover:bg-[#6e74a7]"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/api/axios';

export default {
  props: {
    roleId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      role: {
        nom: '',
        description: ''
      }
    };
  },
  async created() {
    this.fetchRole();
  },
  methods: {
    async fetchRole() {
      try {
        const response = await api.get(`/roles/${this.roleId}`);
        this.role = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération du rôle:', error);
      }
    },
    async updateRole() {
      try {
        await api.put(`/roles/${this.roleId}`, this.role);
        this.$emit('roleUpdated');
        this.$emit('close');
      } catch (error) {
        console.error('Erreur lors de la mise à jour du rôle:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Styles personnalisés pour un formulaire avec couleur de fond constante */
input {
  background-color: #f4f4f5; /* Couleur de fond des champs */
  border: none; /* Enlever les bordures */
  border-radius: 0.375rem; /* Rayon des coins */
  padding: 0.5rem; /* Espacement interne */
}

input:focus {
  background-color: #f4f4f5; /* Garder la même couleur au focus */
  outline: none; /* Enlever le contour au focus */
}

button {
  transition: background-color 0.3s ease;
}
</style>
