<template>
  <div class="flex mt-10">
    <div class="bg-white px-6 py-8 shadow rounded-lg w-full max-w-xl">
      <h2 class="text-2xl font-bold text-[#2a2185] mb-8">Modifier le Commentaire</h2>

      <!-- Formulaire pour modifier le commentaire -->
      <form @submit.prevent="handleUpdate">
        <!-- Champ pour afficher l'ID de la tâche (non modifiable) -->
        <div class="mb-8">
          <label for="tacheId" class="block text-sm font-semibold text-gray-700 mb-2">ID de la Tâche</label>
          <input
            v-model="selectedTache"
            id="tacheId"
            type="number"
            required
            readonly
            class="mt-1 px-4 py-2 block w-full bg-gray-200 rounded-md shadow-sm border-gray-300 cursor-not-allowed"
          />
        </div>

        <!-- Champ pour saisir le commentaire -->
        <div class="mb-8">
          <label for="contenu" class="block text-sm font-semibold text-gray-700 mb-2">Commentaire</label>
          <textarea
            v-model="contenu"
            id="contenu"
            rows="4"
            required
            class="mt-1 block w-full px-4 py-2 bg-gray-200 rounded-md shadow-sm focus:ring-[#2a2185] focus:border-[#2a2185] border-gray-300"
            placeholder="Entrez votre commentaire"
          ></textarea>
        </div>

        <!-- Boutons de validation et d'annulation -->
        <div class="flex justify-end space-x-3">
          <button type="button" @click="$emit('close')" class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
            Annuler
          </button>
          <button type="submit" class="px-4 py-2 bg-[#8c94cc] text-white rounded-md hover:bg-[#6e74a7]">
            Mettre à jour le Commentaire
          </button>
        </div>
      </form>

   
      <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>

      <p v-if="successMessage" class="text-green-500 mt-4">{{ successMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from '@/api/axios'; // Assurez-vous que le chemin est correct

export default {
  name: 'CommentaireEdit',
  props: {
    commentaireId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      selectedTache: null, // ID de la tâche
      contenu: '',         // Contenu du commentaire
      errorMessage: '',    // Message d'erreur en cas de problème
      successMessage: ''   // Message de succès après la mise à jour du commentaire
    };
  },
  async created() {
    await this.fetchCommentaire();
  },
  methods: {
    // Méthode pour récupérer le commentaire à modifier
    async fetchCommentaire() {
      try {
        const response = await axios.get(`/commentaires/${this.commentaireId}`); // Utilisez l'ID ici
        this.selectedTache = response.data.commentaire.tache_id; // Récupération de l'ID de la tâche
        this.contenu = response.data.commentaire.contenu; // Récupération du contenu du commentaire
      } catch (error) {
        console.error('Erreur lors de la récupération du commentaire:', error);
        this.errorMessage = error.response ? error.response.data.message : 'Erreur de connexion au serveur.';
      }
    },

    // Méthode pour gérer la mise à jour du commentaire
    async handleUpdate() {
      this.errorMessage = '';
      this.successMessage = '';

      try {
        // Requête PUT vers l'API pour mettre à jour le commentaire
        await axios.put(`/commentaires/${this.commentaireId}`, {
          'tache_id': this.selectedTache, // Envoi de l'ID de la tâche
          'contenu': this.contenu          // Envoi du contenu du commentaire
        });

        // Si la requête réussit, afficher un message de succès
        this.successMessage = 'Commentaire mis à jour avec succès.';

        // Émettre un événement ou faire d'autres actions après la mise à jour
        this.$emit('updated', this.commentaireId);

      } catch (error) {
        // En cas d'erreur, afficher un message d'erreur
        this.errorMessage = error.response ? error.response.data.message : 'Une erreur est survenue lors de la mise à jour du commentaire.';
      }
    }
  }
};
</script>

<style scoped>
/* Ajoutez ici vos styles CSS supplémentaires si nécessaire */
</style>
