<template>
  <section class="bg-white dark:bg-gray-900 py-8 lg:py-6 antialiased">
    <div class="max-w-2xl mx-auto py-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">Discussion ({{ commentaires.length }})</h2>
      </div>

      <!-- Comment form -->
      <form @submit.prevent="submitComment" class="mb-6">
        <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <textarea v-model="newComment" id="comment" rows="6" required
            class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Écrire un commentaire..."></textarea>
        </div>
        <button type="submit"
          class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
          Poster
        </button>
      </form>

      <!-- Comments list -->
      <div class="space-y-4 py-2 max-h-96 overflow-y-auto">
       <article v-for="commentaire in commentaires" :key="commentaire.id" class="p-6 bg-white rounded-lg dark:bg-gray-900">
  <footer class="flex justify-between items-center mb-2">
    <div class="flex items-center">
      <img class="mr-3 w-9 h-9 rounded-full" :src="commentaire.utilisateur.avatar || defaultAvatar" alt="User Image">
      <div class="flex gap-3">
        <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ commentaire.utilisateur.name || 'Utilisateur inconnu' }}</p>
        <p class="text-sm text-gray-600 dark:text-gray-400"><time :datetime="commentaire.created_at">{{ formatDate(commentaire.created_at) }}</time></p>
      </div>
    </div>
    <!-- Afficher le menu seulement si le commentaire appartient à l'utilisateur connecté -->
    <div v-if="commentaire.utilisateur.id === currentUserId" class="relative">
      <svg @click="toggleMenu(commentaire.id)" class="w-4 h-4 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
      </svg>
      <!-- Dropdown menu for edit and delete actions -->
      <div v-if="isMenuOpen(commentaire.id)" class="absolute right-0 mt-2 bg-white rounded-md shadow-lg z-10">
        <a @click="startEdit(commentaire)" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Éditer</a>
        <a @click="deleteComment(commentaire.id)" class="block px-4 py-2 text-sm text-red-500 hover:bg-red-100">Supprimer</a>
      </div>
    </div>
  </footer>

  <div v-if="isEditing(commentaire)">
    <textarea v-model="editCommentContent" class="w-full border border-gray-300 rounded p-2"></textarea>
    <div class="flex justify-end mt-2">
      <a @click="updateComment(commentaire.id)" class="text-sm text-blue-500 hover:underline">Enregistrer</a>
      <a @click="cancelEdit" class="text-sm text-gray-500 hover:underline ml-2">Annuler</a>
    </div>
  </div>

  <p v-else class="text-gray-500 px-2 dark:text-gray-400">{{ commentaire.contenu }}</p>
</article>

      </div>
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
      defaultAvatar: 'https://example.com/default-avatar.png',
      currentUserId: null,
      editingCommentId: null,
      editCommentContent: '',
      openMenuId: null,  // Variable to track which menu is open
    };
  },
  created() {
    this.fetchCurrentUserId();
    this.fetchComments();
  },
  methods: {
    async fetchCurrentUserId() {
      try {
        const response = await axios.get('/user');
        this.currentUserId = response.data.id;
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'ID de l\'utilisateur:', error);
      }
    },
    
    async fetchComments() {
      try {
        const response = await axios.get(`/taches/${this.tacheId}/commentaires`);
        this.commentaires = response.data.commentaires;
      } catch (error) {
        console.error('Erreur lors de la récupération des commentaires:', error);
      }
    },
    
    async submitComment() {
      try {
        await axios.post('/commentaires', {
          contenu: this.newComment,
          tache_id: this.tacheId,
          utilisateur_id: this.currentUserId,
        });
        this.newComment = '';
        this.fetchComments();
      } catch (error) {
        console.error("Erreur lors de l'ajout du commentaire:", error);
      }
    },
    
   async deleteComment(commentId) {
  const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?");
  if (!confirmation) {
    return; 
  }
  try {
    await axios.delete(`/commentaires/${commentId}`);
    this.fetchComments();
  } catch (error) {
    console.error("Erreur lors de la suppression du commentaire:", error);
  }
},


    startEdit(commentaire) {
      this.editingCommentId = commentaire.id;
      this.editCommentContent = commentaire.contenu;
    },

    async updateComment(commentId) {
      try {
        await axios.put(`/commentaires/${commentId}`, {
          contenu: this.editCommentContent,
        });
        this.editingCommentId = null;
        this.editCommentContent = '';
        this.fetchComments();
      } catch (error) {
        console.error("Erreur lors de la mise à jour du commentaire:", error);
      }
    },

    cancelEdit() {
      this.editingCommentId = null;
      this.editCommentContent = '';
    },

    toggleMenu(commentId) {
      this.openMenuId = this.openMenuId === commentId ? null : commentId;
    },

    isMenuOpen(commentId) {
      return this.openMenuId === commentId;
    },

    isEditing(commentaire) {
      return this.editingCommentId === commentaire.id;
    },

    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },
};
</script>

<style scoped>
button {
  background-color: #4f47a6;
  color: white;
}

button:hover {
  background-color: #5147bb;
}


::-webkit-scrollbar {
  width: 1px;
}

::-webkit-scrollbar-thumb {
  background-color: #9a9aa2;
  border-radius: 10px;
}
</style>
