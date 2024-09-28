<template>
  <section class="bg-white dark:bg-gray-900 lg:py-16 antialiased">
    <div class="max-w-2xl mx-auto ">
      <div class="flex justify-between items-center mb-4">
        <h6 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion ({{ commentaires.length }})</h6>
      </div>

      <!-- Comment Form -->
      <form @submit.prevent="submitComment" class="mb-6">
        <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <label for="comment" class="sr-only">Votre commentaire</label>
          <textarea v-model="newComment" id="comment" rows="6" required
            class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Écrire un commentaire..."></textarea>
        </div>
        <button type="submit"
          class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
          Poster le commentaire
        </button>
      </form>

      <!-- Comments List -->
      <ul>
        <li v-for="commentaire in commentaires" :key="commentaire.id" class="mb-6">
          <article class="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
            <footer class="flex justify-between items-center mb-2">
              <div class="flex items-center">
                <p v-if="commentaire.utilisateur && commentaire.utilisateur.name" 
                   class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                  <img class="mr-2 w-6 h-6 rounded-full" :src="commentaire.utilisateur.avatar || defaultAvatar" alt="User Image">
                  {{ commentaire.utilisateur.name }}
                </p>
                <p v-else class="text-sm text-gray-600 dark:text-gray-400">
                  <em>Utilisateur inconnu</em>
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  <time :datetime="commentaire.created_at">{{ formatDate(commentaire.created_at) }}</time>
                </p>
              </div>
              <button class="inline-flex items-center p-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-700">
                <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 3">
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"></path>
                </svg>
              </button>
            </footer>
            <p class="text-gray-500 dark:text-gray-400">{{ commentaire.contenu }}</p>
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import axios from '@/api/axios';

export default {
  name: 'CommentairesParTache',
  props: {
    tacheId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      commentaires: [],
      newComment: '',
      defaultAvatar: 'https://example.com/default-avatar.png', // Remplacez avec l'URL de l'avatar par défaut
    };
  },
  created() {
    this.fetchComments();
  },
  methods: {
    async fetchComments() {
      try {
        const response = await axios.get(`/taches/${this.tacheId}/commentaires`);
        console.log(response.data); // Vérifiez les données reçues
        this.commentaires = response.data.commentaires;
      } catch (error) {
        console.error('Erreur lors de la récupération des commentaires:', error);
      }
    },

    async submitComment() {
      try {
        const response = await axios.post('/commentaires', {
          contenu: this.newComment,
          tache_id: this.tacheId,
        });
        console.log(response.data); // Log pour vérifier la réponse
        this.commentaires.push(response.data.commentaire);
        this.newComment = ''; // Effacer le champ après soumission
      } catch (error) {
        console.error("Erreur lors de l'ajout du commentaire:", error);
      }
    },

    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },
};
</script>

<style scoped>
textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}

button {
  background-color: #d82a4e;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #c72a4e;
}
</style>
