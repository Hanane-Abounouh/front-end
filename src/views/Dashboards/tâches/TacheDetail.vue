<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-90 flex items-center justify-center z-20">
    <div class="bg-white border border-gray-300 rounded-lg p-6 shadow-lg w-full max-w-2xl">
      <div class="flex items-center mb-6">
        <span class="text-2xl mr-2"><i class="fas fa-tasks"></i></span>
        <h1 class="text-xl md:text-2xl font-bold text-gray-700">{{ localTâche.titre }}</h1>
      </div>

      <div class="mb-4">
        <label for="description" class="block text-gray-700">Description :</label>
        <div class="flex mb-2">
          <select
            v-model="selectedFont"
            class="p-2 border border-gray-300 rounded mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="sans-serif">Sans Serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
            <option value="cursive">Cursive</option>
          </select>

          <div class="flex gap-4">
            <button @click="insertEmoji('🌐')" class="bg-gray-300 p-2 rounded" title="Front-End">🌐</button>
            <button @click="insertEmoji('⚙️')" class="bg-gray-300 p-2 rounded" title="Back-End">⚙️</button>
            <button @click="insertEmoji('🎨')" class="bg-gray-300 p-2 rounded" title="Design">🎨</button>
            <button @click="insertEmoji('🖌️')" class="bg-gray-300 p-2 rounded" title="Figma">🖌️</button>
            <button @click="insertEmoji('🚀')" class="bg-gray-300 p-2 rounded" title="Déploiement">🚀</button>
            <button @click="insertEmoji('🔧')" class="bg-gray-300 p-2 rounded" title="Maintenance">🔧</button>
            <button @click="insertEmoji('🐛')" class="bg-gray-300 p-2 rounded" title="Bug">🐛</button>
            <button @click="insertEmoji('⚠️')" class="bg-gray-300 p-2 rounded" title="Important">⚠️</button>
          </div>
        </div>

        <textarea
          id="description"
          v-model="localTâche.description"
          :style="{ fontFamily: selectedFont }"
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          placeholder="Ajouter une description..."
          rows="6"
        ></textarea>
      </div>

      <div class="mb-4">
        <label for="priorité" class="block text-gray-700">Priorité :</label>
        <select
          id="priorité"
          v-model="localTâche.priorité"
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="basse">Basse</option>
          <option value="moyenne">Moyenne</option>
          <option value="élevée">Élevée</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="statut" class="block text-gray-700"> ⭢ Déplacer</label>
        <div class="relative">
          <select
            id="statut"
            v-model="localTâche.statut"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option
              v-for="option in statutOptions"
              :key="option.value"
              :value="option.value"
              :class="{ 'text-green-500': localTâche.statut === option.value }"
            >
              {{ option.text }} <span v-if="localTâche.statut === option.value" >(actuel)</span>
            </option>
          </select>
        </div>
      </div>

      <div class="mb-4">
        <label for="assignTo" class="block text-gray-700">Assigner à :</label>
        <select
          id="assignTo"
          v-model="localTâche.assignee"
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sélectionner un utilisateur</option>
          <option v-if="users.length === 0" disabled>Aucun utilisateur disponible</option>
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>

      <div class="flex justify-end">
        <button @click="assignerTâche" class="bg-[#2f2691] text-white p-2 rounded mr-2">Assigner</button>
        <button @click="saveChanges" class="bg-[#2f2691] text-white p-2 rounded mr-2">Enregistrer</button>
        <button @click="$emit('close')" class="bg-gray-300 text-gray-700 p-2 rounded">Fermer</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/api/axios';

export default {
  name: 'TacheDetail',
  props: {
    tâche: {
      type: Object,
      required: true,
    },
    projetId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      localTâche: { ...this.tâche },
      selectedFont: 'sans-serif',
      statutOptions: [
        { value: 'backlog', text: 'Backlog' },
        { value: 'à faire', text: 'À faire' },
        { value: 'en cours', text: 'En cours' },
        { value: 'terminé', text: 'Terminé' },
        { value: 'bloqué', text: 'Bloqué' },
      ],
      users: [], // Tableau pour stocker les utilisateurs
    };
  },
  methods: {
    async fetchUsers() {
      if (!this.projetId) {
        console.error('Projet ID is not defined');
        return;
      }
      try {
        const response = await axios.get(`/projets/${this.projetId}/utilisateurs`);
        console.log('Utilisateurs:', response.data); // Vérifiez la structure ici

        if (response.data.utilisateurs) {
          this.users = response.data.utilisateurs; // Ajustez ici pour accéder au bon tableau
        } else {
          console.error('Aucune clé "utilisateurs" trouvée dans la réponse');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    },

    async saveChanges() {
      try {
        const response = await axios.put(`/taches/${this.localTâche.id}`, this.localTâche);
        if (response.status === 200) {
          this.$emit('tâcheUpdated');
          alert('Modifications enregistrées avec succès !');
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la tâche:', error);
      }
    },

    async assignerTâche() {
      if (!this.localTâche.assignee) {
        alert("Veuillez sélectionner un utilisateur à assigner.");
        return;
      }
      try {
        const response = await axios.post(`/taches/${this.localTâche.id}/assigner`, {
          user_id: this.localTâche.assignee, // Assurez-vous que le nom du champ correspond à ce que votre backend attend
        });
        if (response.status === 200) {
          alert("Tâche assignée avec succès !");
          this.$emit('tâcheUpdated');
        }
      } catch (error) {
        if (error.response) {
          console.error("Erreur lors de l'assignation de la tâche:", error.response.data);
          alert(`Erreur: ${error.response.data.message || "Erreur lors de l'assignation de la tâche."}`);
        } else if (error.request) {
          console.error("Aucune réponse reçue:", error.request);
          alert("Erreur: Aucune réponse reçue du serveur.");
        } else {
          console.error("Erreur:", error.message);
          alert("Erreur: " + error.message);
        }
      }
    },

    insertEmoji(emoji) {
      this.localTâche.description += emoji;
    },
  },
  created() {
    this.fetchUsers(); // Récupérer les utilisateurs lors de la création du composant
  },
  watch: {
    tâche: {
      handler(newValue) {
        this.localTâche = { ...newValue };
        this.fetchUsers(); // Optionnel : Récupérer les utilisateurs à chaque changement de tâche
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
/* Ajoutez ici votre style CSS personnalisé */
</style>
