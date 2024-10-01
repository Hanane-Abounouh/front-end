<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div class="bg-white border border-gray-300 rounded-lg p-6 shadow-lg w-80 relative">
      <!-- Icône de fermeture -->
      <button @click="cancelInvite" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
        <i class="fas fa-times"></i>
      </button>
      <h2 class="text-lg font-semibold mb-4 text-center">Inviter un utilisateur</h2>
      <form @submit.prevent="inviteUser">
        <input
          v-model="email"
          type="email"
          placeholder="Entrez l'adresse e-mail"
          class="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <div class="flex justify-between">
          <button
            type="submit"
            class="bg-blue-700 text-white p-2 rounded hover:bg-blue-600 transition w-full mr-2"
          >
            Inviter
          </button>
        </div>
      </form>

      <h1 class="text-lg font-semibold mt-4 mb-2">Utilisateurs du projet</h1>
      <ul class="max-h-40 overflow-y-auto">
        <li v-for="user in users" :key="user.id" class="flex justify-between items-center border-b border-gray-200 py-2">
          <span>{{ user.email }}</span>
          <!-- <button @click="deleteUser(user.id)" class="text-red-500 hover:text-red-700">
            <i class="fas fa-trash"></i>
          </button> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "@/api/axios";

export default {
  data() {
    return {
      email: "",
      users: [], // Liste des utilisateurs
    };
  },
  mounted() {
    this.fetchUsers(); // Récupérer les utilisateurs lors du montage
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get(`/projets/${this.$route.params.projectId}/utilisateurs`);
        this.users = response.data.utilisateurs; // Assurez-vous d'utiliser 'utilisateurs' depuis la réponse JSON
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
        alert("Erreur lors de la récupération des utilisateurs.");
      }
    },
    async inviteUser() {
      try {
        await axios.post(`/projets/${this.$route.params.projectId}/invite`, {
          email: this.email,
        });
        alert("Invitation envoyée !");
        this.email = ""; // Réinitialiser le champ email après l'envoi
        this.fetchUsers(); // Mettre à jour la liste des utilisateurs après l'invitation
      } catch (error) {
        console.error("Erreur lors de l'invitation:", error);
        alert("Erreur lors de l'envoi de l'invitation.");
      }
    },
    // async deleteUser(userId) {
    //   try {
    //     await axios.delete(`/projets/${this.$route.params.projectId}/utilisateurs/${userId}`);
    //     alert("Utilisateur supprimé !");
    //     this.fetchUsers(); // Mettre à jour la liste des utilisateurs après la suppression
    //   } catch (error) {
    //     console.error("Erreur lors de la suppression de l'utilisateur:", error);
    //     alert("Erreur lors de la suppression de l'utilisateur.");
    //   }
    // },
    cancelInvite() {
      this.email = ""; // Réinitialiser le champ email
      this.$emit('close'); // Fermer le modal
    },
  },
};
</script>

<style scoped>
/* Ajoutez vos styles ici si nécessaire */
</style>
