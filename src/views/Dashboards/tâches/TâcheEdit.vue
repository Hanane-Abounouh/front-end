<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
      <h2 class="text-lg font-bold mb-4">Modifier la Tâche</h2>
      <form @submit.prevent="updateTâche">
        <div class="mb-4">
          <label for="titre" class="block text-sm font-medium text-gray-700">Titre</label>
          <input v-model="tâche.titre" id="titre" type="text" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
        </div>
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea v-model="tâche.description" id="description" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
        </div>
        <div class="mb-4">
          <label for="date_limite" class="block text-sm font-medium text-gray-700">Date Limite</label>
          <input v-model="tâche.date_limite" id="date_limite" type="date" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
        </div>
        <div class="mb-4">
          <label for="statut" class="block text-sm font-medium text-gray-700">Statut</label>
          <select v-model="tâche.statut" id="statut" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
            <option value="à faire">À faire</option>
            <option value="en cours">En cours</option>
            <option value="terminé">Terminé</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="priorité" class="block text-sm font-medium text-gray-700">Priorité</label>
          <select v-model="tâche.priorité" id="priorité" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
            <option value="faible">Faible</option>
            <option value="moyenne">Moyenne</option>
            <option value="élevée">Élevée</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="assigné_a" class="block text-sm font-medium text-gray-700">Assigné à</label>
          <input v-model="tâche.assigné_a" id="assigné_a" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
        </div>
        <div class="flex justify-end space-x-4">
          <button @click="$emit('close')" type="button" class="px-4 py-2 bg-gray-200 border border-gray-300 rounded">Annuler</button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Sauvegarder</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '@/api/axios';

export default {
  name: 'TâcheEdit',
  props: {
    tâcheId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      tâche: {
        titre: '',
        description: '',
        date_limite: '',
        statut: '',
        priorité: '',
        assigné_a: ''
      }
    };
  },
  async created() {
    await this.fetchTâche();
  },
  methods: {
    async fetchTâche() {
      try {
        const response = await axios.get(`/api/tâches/${this.tâcheId}`);
        this.tâche = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération de la tâche:', error);
      }
    },
    async updateTâche() {
      try {
        await axios.put(`/api/tâches/${this.tâcheId}`, this.tâche);
        this.$emit('tâcheUpdated');
        this.$emit('close');
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la tâche:', error);
      }
    }
  }
};
</script>
