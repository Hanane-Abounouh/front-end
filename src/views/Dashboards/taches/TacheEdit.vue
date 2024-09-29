<template>
  <div class="inset-0 flex mt-10">
    <div class="bg-white px-6 py-4 border border-gray-100 rounded-lg shadow-md w-full max-w-2xl">
      <h3 class="text-xl font-bold text-[#2a2185] mb-6">Modifier la Tâche</h3>
      <form @submit.prevent="updateTache">
        <!-- Titre -->
        <div class="mb-4">
          <label for="titre" class="block text-sm font-semibold text-gray-700 mb-2">Titre</label>
          <input 
            v-model="tâche.titre" 
            type="text" 
            id="titre" 
            class="mt-1 block w-full bg-gray-200 rounded-md shadow-sm"
            required
          />
        </div>
        
        <!-- Description -->
        <div class="mb-4">
          <label for="description" class="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <textarea 
            v-model="tâche.description" 
            id="description" 
            class="mt-1 block w-full bg-gray-200 rounded-md shadow-sm"
            
          ></textarea>
        </div>
        
        <!-- Date Limite -->
        <div class="mb-4">
          <label for="date_limite" class="block text-sm font-semibold text-gray-700 mb-2">Date Limite</label>
          <input 
            v-model="tâche.date_limite" 
            type="date" 
            id="date_limite" 
            class="mt-1 block w-full bg-gray-200 rounded-md shadow-sm"
            
          />
        </div>

        <!-- Statut -->
        <div class="mb-4">
          <label for="statut" class="block text-sm font-semibold text-gray-700 mb-2">Statut</label>
          <select 
            v-model="tâche.statut" 
            id="statut" 
            class="mt-1 block w-full bg-gray-200 rounded-md shadow-sm"
            required
          >
            <option value="backlog">Backlog</option>
            <option value="a faire">À faire</option>
            <option value="en cours">En cours</option>
            <option value="termine">Terminé</option>
            <option value="bloque">Bloqué</option>
          </select>
        </div>

        <!-- Priorité -->
        <div class="mb-4">
          <label for="priorite" class="block text-sm font-semibold text-gray-700 mb-2">Priorité</label>
          <select 
            v-model="tâche.priorite" 
            id="priorite" 
            class="mt-1 block w-full bg-gray-200 rounded-md shadow-sm"
            required
          >
            <option value="basse">Faible</option>
            <option value="moyenne">Moyenne</option>
            <option value="elevee">Élevée</option>
          </select>
        </div>

        <!-- Projet ID -->
        <div class="mb-4">
          <label for="projet_id" class="block text-sm font-semibold text-gray-700 mb-2">Projet ID</label>
          <input 
            v-model="tâche.projet_id" 
            type="number" 
            id="projet_id" 
            class="mt-1 block w-full bg-gray-200 rounded-md shadow-sm"
            required
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
    tâcheId: {
      type: Number,
      required: true,
    },
    initialTâche: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tâche: {
        titre: this.initialTâche.titre || '',
        description: this.initialTâche.description || '',
        date_limite: this.initialTâche.date_limite || '',
        statut: this.initialTâche.statut || 'backlog', // Default to 'backlog'
        priorite: this.initialTâche.priorite || 'moyenne', // Default to 'moyenne'
        projet_id: this.initialTâche.projet_id || null,
      },
    };
  },
  methods: {
    async updateTache() {
      try {
        await api.put(`/taches/${this.tâcheId}`, this.tâche);
        this.$emit('updated'); // Emitting updated event to the parent
        this.$emit('close');   // Closing the modal or form after updating
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la tâche:', error);
        if (error.response) {
          console.error('Détails de l\'erreur:', error.response.data);
        }
        alert('Une erreur est survenue lors de la mise à jour de la tâche.');
      }
    },
  },
};
</script>

<style scoped>
/* Styles personnalisés pour un formulaire avec couleur de fond constante */
input,
select,
textarea {
  background-color: #f4f4f5; /* Couleur de fond des champs */
  border: none; /* Enlever les bordures */
  border-radius: 0.375rem; /* Rayon des coins */
  padding: 0.5rem; /* Espacement interne */
}

input:focus,
select:focus,
textarea:focus {
  background-color: #f4f4f5; /* Garder la même couleur au focus */
  outline: none; /* Enlever le contour au focus */
}

button {
  transition: background-color 0.3s ease;
}
</style>
