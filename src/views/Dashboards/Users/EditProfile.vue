<template>
  <div class="bg-white overflow-hidden shadow rounded-lg border">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">Modifier le Profil de l'Utilisateur</h3>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
      <form @submit.prevent="updateUser">
        <div class="sm:divide-y sm:divide-gray-200">
          <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <label class="text-sm font-medium text-gray-500">Nom complet</label>
            <div class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input 
                type="text" 
                v-model="user.name" 
                required 
                class="border-gray-200 rounded-md p-3 border shadow-sm mt-1 block w-full" 
              />
            </div>
          </div>
          <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <label class="text-sm font-medium text-gray-500">Adresse e-mail</label>
            <div class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input 
                type="email" 
                v-model="user.email" 
                required 
                class="border-gray-200 rounded-md p-4 border shadow-sm mt-1 block w-full" 
              />
            </div>
          </div>
        </div>
        <div class="flex justify-end p-4 space-x-2">
          <button type="button" @click="cancelEdit" class="bg-gray-300 text-gray-700 py-2 px-4 rounded">Annuler</button>
          <button type="submit" class="bg-[#2a2185] text-white py-2 px-4 rounded">Sauvegarder</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '@/api/axios';

export default {
  name: 'EditProfile',
  data() {
    return {
      user: {},        // Données utilisateur
      originalUser: {}, // Données utilisateur d'origine pour l'annulation
    };
  },
  mounted() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        const response = await axios.get('/user'); // Récupérer l'utilisateur connecté
        this.user = response.data;
        this.originalUser = { ...this.user }; // Conservez une copie des données d'origine
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    },
    async updateUser() {
      try {
        await axios.put(`/users/${this.user.id}`, this.user); // Mettez à jour l'utilisateur avec son ID
        this.$emit('userUpdated'); // Émettre un événement pour informer le parent
      } catch (error) {
        console.error('Erreur lors de la mise à jour des données utilisateur:', error);
      }
    },
    cancelEdit() {
      this.user = { ...this.originalUser }; // Réinitialiser les données utilisateur aux valeurs d'origine
      this.$emit('close'); // Émettre un événement pour fermer le formulaire d'édition
    },
  },
};
</script>

<style scoped>
/* Ajoutez des styles supplémentaires si nécessaire */
</style>
