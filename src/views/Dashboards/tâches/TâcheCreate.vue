<template>
  <div class="inset-0 flex mt-10">
    <div class="bg-white px-6 py-4 border border-gray-100 rounded-lg shadow-md w-full max-w-2xl">
      <h2 class="text-xl font-bold text-[#2a2185] mb-4">Créer une Tâche</h2>
      
      <form @submit.prevent="createTâche">
        <div class="mb-4">
          <label for="titre" class="block text-sm font-medium text-gray-700">Titre</label>
          <input v-model="tâche.titre" type="text" id="titre" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#2a2185] focus:border-[#2a2185]" required />
        </div>

        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea v-model="tâche.description" id="description" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#2a2185] focus:border-[#2a2185]" required></textarea>
        </div>

        <div class="mb-4">
          <label for="date_limite" class="block text-sm font-medium text-gray-700">Date Limite</label>
          <input v-model="tâche.date_limite" type="date" id="date_limite" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#2a2185] focus:border-[#2a2185]" required />
        </div>

        <div class="mb-4">
          <label for="priorité" class="block text-sm font-medium text-gray-700">Priorité</label>
          <select v-model="tâche.priorité" id="priorité" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#2a2185] focus:border-[#2a2185]" required>
            <option value="" disabled selected>Sélectionnez une priorité</option>
            <option value="Basse">Basse</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Haute">Haute</option>
          </select>
        </div>

        <div class="mb-4">
          <label for="statut" class="block text-sm font-medium text-gray-700">Statut</label>
          <select v-model="tâche.statut" id="statut" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#2a2185] focus:border-[#2a2185]" required>
            <option value="" disabled selected>Sélectionnez un statut</option>
              <option value="backlog">backlog</option>
            <option value="À faire">À faire</option>
            <option value="En cours">En cours</option>
            <option value="Terminé">Terminé</option>
              <option value="bloqué">bloqué</option>
          </select>
        </div>

        <div class="mb-4">
          <label for="projet_id" class="block text-sm font-medium text-gray-700">Projet</label>
          <select v-model="tâche.projet_id" id="projet_id" @change="fetchUsers" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#2a2185] focus:border-[#2a2185]" required>
            <option value="" disabled selected>Sélectionnez un projet</option>
            <option v-for="projet in projets" :key="projet.id" :value="projet.id">{{ projet.name }}</option>
          </select>
        </div>

        <div class="mb-4">
          <label for="utilisateur_id" class="block text-sm font-medium text-gray-700">Assigné à</label>
          <select v-model="tâche.utilisateur_id" id="utilisateur_id" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#2a2185] focus:border-[#2a2185]" >
            <option value="" disabled selected>Sélectionnez un utilisateur</option>
            <option v-for="utilisateur in utilisateurs" :key="utilisateur.id" :value="utilisateur.id">{{ utilisateur.name }}</option>
          </select>
        </div>

        <button type="submit" class="mt-4 px-4 py-2 bg-[#2a2185] text-white rounded-md hover:bg-[#1b1f64]">Créer Tâche</button>
        <button type="button" @click="$emit('close')" class="mt-4 ml-2 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">Annuler</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '@/api/axios';

export default {
  name: 'TâcheCreate',
  data() {
    return {
      tâche: {
        titre: '',
        description: '',
        date_limite: '',
        priorité: '',
        statut: '',
        projet_id: null,
        utilisateur_id: null,
      },
      projets: [],
      utilisateurs: [],
    };
  },
  methods: {
    async fetchProjets() {
      try {
        const response = await axios.get('/projets');
        this.projets = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des projets:', error);
      }
    },
    async fetchUsers() {
      if (!this.tâche.projet_id) return;

      try {
        const response = await axios.get(`/projets/${this.tâche.projet_id}/utilisateurs`);
        this.utilisateurs = response.data.utilisateurs; // Vérifiez que la réponse contient la liste des utilisateurs
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    },
    async createTâche() {
      try {
        await axios.post('/taches', this.tâche);
        this.$emit('created');
        this.resetForm();
      } catch (error) {
        console.error('Erreur lors de la création de la tâche:', error);
        alert('Une erreur est survenue lors de la création de la tâche : ' + (error.response ? error.response.data.message : error.message));
      }
    },
    resetForm() {
      this.tâche = {
        titre: '',
        description: '',
        date_limite: '',
        priorité: '',
        statut: '',
        projet_id: null,
        utilisateur_id: null,
      };
      this.utilisateurs = [];
    }
  },
  created() {
    this.fetchProjets();
  }
};
</script>

<style scoped>
/* Ajoute tes styles ici si nécessaire */
</style>
