<template>
  <div class=" inset-0 flex  bg-opacity-50">
    <div class="bg-white px-6 py-6 border border-gray-100 rounded-lg shadow-md w-full max-w-xl">
      <h3 class="text-xl font-bold text-[#2a2185] mb-6">Modifier le Projet</h3>
      <form @submit.prevent="updateProjet">
        <!-- Nom -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
          <input 
            v-model="projet.name" 
            type="text" 
            id="name" 
            class="mt-1 block w-full bg-gray-200 rounded-md px-2 shadow-sm py-2 text-lg"
            required
          />
        </div>
        
        <!-- Description -->
        <div class="mb-4">
          <label for="description" class="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <input 
            v-model="projet.description" 
            type="text" 
            id="description" 
            class="mt-1 block w-full bg-gray-200 rounded-md px-2 shadow-sm py-2 text-lg"
          />
        </div>
        
        <!-- Date de début -->
        <div class="mb-4">
          <label for="date_debut" class="block text-sm font-semibold text-gray-700 mb-2">Date de début</label>
          <input 
            v-model="projet.date_debut" 
            type="date" 
            id="date_debut" 
            class="mt-1 block w-full bg-gray-200 rounded-md shadow-sm px-2 py-2 text-lg"
            required
          />
        </div>

        <!-- Date de fin -->
        <div class="mb-4">
          <label for="date_fin" class="block text-sm font-semibold text-gray-700 mb-2">Date de fin</label>
          <input 
            v-model="projet.date_fin" 
            type="date" 
            id="date_fin" 
            class="mt-1 block w-full bg-gray-200 rounded-md shadow-sm px-2 py-2 text-lg"
            required
          />
        </div>

        <!-- Boutons -->
        <div class="flex justify-end space-x-3">
          <button 
            type="button" 
            class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            @click="handleCancel"
          >
            Annuler
          </button>
          <button 
            type="submit" 
            class="px-4 py-2 bg-[#8a92d1] text-white rounded-md hover:bg-[#686ea3]"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '@/api/axios';

export default {
  name: 'ProjetEdit',
  props: {
    projectId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      projet: {
        name: '',
        description: '',
        date_debut: '',
        date_fin: ''
      }
    };
  },
  async created() {
    await this.fetchProject();
  },
  methods: {
    async fetchProject() {
      try {
        const response = await axios.get(`/projets/${this.projectId}`);
        this.projet = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération du projet:', error);
      }
    },
    async updateProjet() {
      try {
        await axios.put(`/projets/${this.projectId}`, this.projet);
        this.$emit('projectUpdated'); // Émet un événement pour signaler que le projet a été mis à jour
        this.handleCancel(); // Ferme le modal en redirigeant
      } catch (error) {
        console.error('Erreur lors de la mise à jour du projet:', error);
      }
    },
    handleCancel() {
      this.$emit('close'); // Émet un événement pour fermer le modal
    }
  }
};
</script>

<style scoped>
/* Ajoutez des styles supplémentaires si nécessaire */
</style>
