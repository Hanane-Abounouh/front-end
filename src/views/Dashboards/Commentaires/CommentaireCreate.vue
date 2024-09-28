<template>
  <div class="flex  mt-10 ">
    <div class="bg-white px-6 py-8 shadow rounded-lg w-full max-w-xl">
      <h2 class="text-2xl font-bold text-[#2a2185] mb-8 ">Ajouter un Commentaire</h2>
      
      <!-- Formulaire pour ajouter un commentaire -->
      <form @submit.prevent="handleSubmit">
        <!-- Champ pour saisir l'ID de la tâche -->
        <div class="mb-8 ">
          <label for="tacheId" class="block text-sm font-semibold text-gray-700  mb-2">ID de la Tâche</label>
          <input 
            v-model="selectedTache" 
            id="tacheId" 
            type="number" 
            required 
            class="mt-1 px-4 py-2 block w-full bg-gray-200 rounded-md shadow-sm focus:ring-[#2a2185] focus:border-[#2a2185] border-gray-300"
            placeholder="Entrez l'ID de la tâche"
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
            Ajouter Commentaire
          </button>
        </div>
      </form>

      <!-- Message d'erreur si échec de l'ajout du commentaire -->
      <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>

      <!-- Message de succès si le commentaire a été ajouté -->
      <p v-if="successMessage" class="text-green-500 mt-4">{{ successMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from '@/api/axios'; // Si vous avez configuré un fichier axios global

export default {
  name: 'CommentaireCreate',
  data() {
    return {
      selectedTache: null,   // ID de la tâche
      contenu: '',           // Contenu du commentaire
      errorMessage: '',      // Message d'erreur en cas de problème
      successMessage: ''     // Message de succès après l'ajout du commentaire
    };
  },
  methods: {
    // Méthode pour gérer la soumission du formulaire
    async handleSubmit() {
      this.errorMessage = '';
      this.successMessage = '';

      try {
        // Requête POST vers l'API pour créer le commentaire
        const response = await axios.post('/commentaires', {
          'tache_id': this.selectedTache,  // Envoi de l'ID de la tâche
          'contenu': this.contenu           // Envoi du contenu du commentaire
        });

        // Si la requête réussit, afficher un message de succès
        this.successMessage = 'Commentaire ajouté avec succès.';

        // Réinitialiser les champs du formulaire
        this.selectedTache = null;
        this.contenu = '';

        // Émettre un événement ou faire d'autres actions après la création
        this.$emit('commentAdded', response.data.commentaire);
      } catch (error) {
        // En cas d'erreur, afficher un message d'erreur
        this.errorMessage = error.response ? error.response.data.message : 'Une erreur est survenue lors de l\'ajout du commentaire.';
      }
    }
  }
};
</script>
