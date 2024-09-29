<template>
  <div class="fixed inset-0  bg-opacity-90 flex items-center justify-center z-20">
    <div class="bg-white border border-gray-300 rounded-lg p-6 shadow-2xl max-w-md w-full">
      <h2 class="text-lg text-[#2a2185] font-bold mb-4">Assigner Tâche</h2>
      <div>
        <label class="block mb-2 text-gray-700">Assigné à :</label>
        <select v-model="selectedUser" class="w-full p-2 border border-gray-300 rounded-lg">
          <option disabled value="">Sélectionnez un utilisateur</option>
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
        <div v-if="users.length === 0" class="mt-2 text-red-600">Aucun utilisateur trouvé pour ce projet.</div>
      </div>
      <div class="flex justify-end mt-4">
        <button @click="assignTâche" class="bg-[#2a2185] text-white px-4 py-2 rounded-lg">Assigner</button>
        <button @click="$emit('close')" class="ml-2 px-4 py-2 border border-gray-300 rounded-lg">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/api/axios'; // Assurez-vous d'importer axios

export default {
  props: {
    tâcheId: {
      type: Number,
      required: true,
    },
    projetId: { // Ajouter cette prop pour recevoir le projet ID
      type: Number,
      required: true,
    },
    assignedUser: { // Nouvelle prop pour recevoir l'utilisateur déjà assigné
      type: Number,
      default: null,
    }
  },
  data() {
    return {
      selectedUser: this.assignedUser, // Initialise avec l'utilisateur déjà assigné
      users: []  // Liste des utilisateurs associés au projet de la tâche
    };
  },
  methods: {
    async fetchUsersByProjet() {
      if (!this.projetId) return;
      try {
        const response = await axios.get(`/projets/${this.projetId}/utilisateurs`);
        this.users = response.data.utilisateurs || []; // Utilisez un tableau vide par défaut
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    },

   async assignTâche() {
  try {
    const response = await axios.post(`/taches/${this.tâcheId}/assigner`, {
      user_id: this.selectedUser
    });

    // Alerte de succès
    alert('Tâche assignée avec succès!');

    // Émettre un événement pour informer le parent de l'assignation réussie
    this.$emit('assigned', response.data.tâche); // Passer les détails de la tâche mise à jour
    this.$emit('close'); // Fermer le formulaire après l'assignation
  } catch (error) {
    console.error('Erreur lors de l\'assignation de la tâche :', error);
  }
}


  },
  mounted() {
    this.fetchUsersByProjet(); // Récupérer les utilisateurs au montage
  }
};
</script>

<style scoped>
/* Ajoutez ici des styles si nécessaire */
</style>
