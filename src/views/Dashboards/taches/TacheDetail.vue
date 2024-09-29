<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-90 flex items-center justify-center z-20">
    <div class="bg-white border border-gray-300 rounded-lg p-6 shadow-2xl h-5/6 w-full max-w-4xl overflow-hidden">
      <!-- Header Section -->
      <div class="flex items-center mb-6 justify-between">
        <div class="flex items-center px-5">
          <span class="text-2xl mr-2 text-[#2a2185]"><i class="fas fa-tasks"></i></span>
          <h1 class="text-xl md:text-2xl font-bold text-[#2a2185]">{{ localTâche.titre }}</h1>
        </div>
        <button @click="$emit('close')" class="text-[#2a2185] hover:text-gray-600">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>

      <!-- Content Section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 px-5 h-full overflow-auto">
        <!-- Description Section -->
        <div class="flex flex-col md:col-span-2 order-2 md:order-1">
          <label for="description" class="block text-gray-700 mb-2">Description :</label>
          <div class="flex mb-4 items-center gap-2">
            <select
              v-model="selectedFont"
              class="p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="sans-serif">Sans Serif</option>
              <option value="serif">Serif</option>
              <option value="monospace">Monospace</option>
              <option value="cursive">Cursive</option>
            </select>
            <div class="flex gap-2">
              <button 
                v-for="emoji in emojis" 
                :key="emoji.icon" 
                @click="insertEmoji(emoji.icon)" 
                class="bg-gray-200 p-1 rounded-md shadow hover:bg-gray-300 transition" 
                :title="emoji.label"  
              >
                {{ emoji.icon }}
              </button>
            </div>
          </div>
          <textarea
            id="description"
            v-model="localTâche.description"
            :style="{ fontFamily: selectedFont, height: '12rem' }"
            class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-auto"
            placeholder="Ajouter une description..."
          ></textarea>
          <div class="flex justify-end mt-1">
            <button @click="saveChanges" class="bg-gray-200 w-full mt-4 text-black p-3 border border-[#bcb6f7] rounded-lg shadow hover:bg-gray-300 transition mr-2">
              Enregistrer
            </button>
          </div>
        </div>

        <!-- Right Column (Priorité, Date, Statut, Assigner) -->
        <div class="flex flex-col md:mt-6 md:col-span-1 order-1 md:order-2">
          <div class="mb-4">
            <label for="priorité" class="block text-gray-700">Priorité :</label>
            <select
              id="priorité"
              v-model="localTâche.priorite"
              class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="basse">Basse</option>
              <option value="moyenne">Moyenne</option>
              <option value="elevee">Élevée</option>
            </select>
          </div>

          <div class="mb-4">
            <label for="date_limite" class="block text-gray-700">Date Limite :</label>
            <input
              type="date"
              id="date_limite"
              v-model="localTâche.date_limite"
              class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div class="mb-4">
            <label for="statut" class="block text-gray-700">⭢ Déplacer :</label>
            <select
              id="statut"
              v-model="localTâche.statut"
              class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option v-for="option in statutOptions" :key="option.value" :value="option.value">
                {{ option.text }}
              </option>
            </select>
          </div>

          <div class="mb-4 flex flex-col relative">
  <button 
    @click="showAssignDropdown" 
    class="bg-gray-100 text-left p-3 w-full z-10 rounded-lg shadow hover:bg-gray-200 transition flex items-center justify-between"
  >
    Assigner à
    <i class="fas" :class="showDropdown ? 'fa-chevron-up' : 'fa-chevron-down'"></i> <!-- Icône pour indiquer l'état du dropdown -->
  </button>
  <div v-if="showDropdown" class="absolute left-0 border border-gray-200 bg-white w-64 h-auto p-2 z-50 mt-1">
    <button 
      @click="closeDropdown" 
      class="text-red-400 hover:text-red-600 flex items-center mb-2"
    >
      <i class="fas fa-times mr-2"></i> Annuler
    </button>
    <span>Sélectionner un utilisateur</span>
    <select
      id="assignTo"
      v-model="localTâche.assigne_a"
      class="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option v-if="users.length === 0" disabled>Aucun utilisateur disponible</option>
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>
    <button 
      @click="assignerTâche" 
      class="bg-[#2a2185] mt-2 text-white p-2 rounded-lg shadow hover:bg-[#2e2683] transition"
    >
      Confirmer
    </button>
  </div>
</div>

        </div>

        <!-- Comment Section -->
        <div class="md:col-span-2 order-3 md:order-3   mt-5 md:mt-0">
          <CommentairesParTache :tacheId="localTâche.id" />
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import axios from '@/api/axios';
import CommentairesParTache from '@/views/Dashboards/Commentaires/CommentairesParTache.vue';

export default {
  name: 'TacheDetail',
  components: {
    CommentairesParTache,
  },
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
        { value: 'a faire', text: 'À faire' },
        { value: 'en cours', text: 'En cours' },
        { value: 'termine', text: 'Terminé' },
        { value: 'bloque', text: 'Bloqué' },
      ],
      users: [],
      showDropdown: false,
      emojis: [
        { icon: '🌐', label: 'Front-End' },
        { icon: '⚙️', label: 'Back-End' },
        { icon: '🖌️', label: 'Figma' },
        { icon: '🚀', label: 'Déploiement' },
        { icon: '🔧', label: 'Maintenance' },
        { icon: '🐛', label: 'Bug' },
        { icon: '⚠️', label: 'Important' },
      ],
    };
  },
  methods: {
    async fetchUsers() {
      if (!this.projetId) return;
      try {
        const response = await axios.get(`/projets/${this.projetId}/utilisateurs`);
        if (response.data.utilisateurs) {
          this.users = response.data.utilisateurs;
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
  if (!this.localTâche.assigne_a) {
    alert("Veuillez sélectionner un utilisateur.");
    return;
  }

  console.log("Sending user_id: ", this.localTâche.assigne_a);

  try {
    const response = await axios.post(`/taches/${this.localTâche.id}/assigner`, {
      user_id: this.localTâche.assigne_a,
    });
    
    if (response.status === 200) {
      alert('Tâche assignée avec succès !');
      this.showDropdown = false;
    }
  } catch (error) {
    console.error('Erreur lors de l\'assignation:', error);
    alert('Une erreur est survenue lors de l\'assignation.');
  }
},


    showAssignDropdown() {
      this.showDropdown = !this.showDropdown;
      this.fetchUsers();
    },
     closeDropdown() {
    this.showDropdown = false; // Fermer le dropdown
  },

    insertEmoji(emoji) {
      this.localTâche.description += emoji;
    },
  },
  watch: {
    tâche: {
      handler(newVal) {
        this.localTâche = { ...newVal };
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style scoped>
/* Assurez-vous d'inclure les styles pour le défilement */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-thumb {
  background-color: #2a2185;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}




@media (max-width: 768px) {
  .text-2xl {
    font-size: 1.5rem;
  }

  .text-xl {
    font-size: 1.25rem;
  }
}
</style>

