<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-90 flex items-center justify-center z-20">
    <div class="bg-white border border-gray-300 rounded-lg p-6 shadow-2xl h-5/6 w-full max-w-4xl overflow-hidden">
      <div class="flex items-center mb-6 justify-between">
        <div class="flex items-center px-5">
          <span class="text-2xl mr-2 text-[#2a2185]"><i class="fas fa-tasks"></i></span>
          <h1 class="text-xl md:text-2xl font-bold text-[#2a2185]">{{ localTâche.titre }}</h1>
        </div>
        <button @click="$emit('close')" class="text-[#2a2185] hover:text-gray-600">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 px-5 h-full overflow-auto">
  <!-- Description Section -->
  <div class="flex flex-col md:col-span-2">
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
          class="bg-gray-200  p-1  rounded-md shadow hover:bg-gray-300 transition" 
          :title="emoji.label"  
        >
          {{ emoji.icon }}
        </button>
      </div>
    </div>
    
    <!-- Textarea with fixed height and dynamic content -->
    <textarea
      id="description"
      v-model="localTâche.description"
      :style="{ fontFamily: selectedFont, height: '12rem' }"
      class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-auto"
      placeholder="Ajouter une description..."
    ></textarea>

    <!-- Comment Section -->
    <CommentairesParTache :tacheId="localTâche.id" />
  </div>

  <!-- Right Column (Priorité, Date, Statut, Assigner) -->
  <div class="flex flex-col md:mt-6 md:col-span-1">
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

    <div class="mb-4">

      <button @click="showAssignDropdown" class="bg-gray-100 text-left  p-3 w-full z-20 rounded-lg shadow hover:bg-gray-200 transition">Assigner à</button>
       <div  v-if="showDropdown" class="border border-gray-200 bg-white w-64 h-40 p-2 fixed z-60" >
       <span>Sélectionner un utilisateur</span>
       <select
   
        id="assignTo"
        v-model="localTâche.assigne_a"
        class="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
    
        
        <option v-if="users.length === 0" disabled>Aucun utilisateur disponible</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
      <button  @click="assignerTâche" class="bg-gray-400 mt-2 text-white p-2 rounded-lg shadow hover:bg-gray-500 transition">Confirmer</button>
     </div>
         

    </div>
    <!-- Footer Actions -->
      <div class="flex justify-end ">
        <button @click="saveChanges" class="bg-[#2a2185] w-full mt-4 text-white p-3 rounded-lg shadow hover:bg-[#453ac0] transition mr-2">Enregistrer</button>
      </div>

    
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
        { icon: '🎨', label: 'Design' },
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
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: #2a2185;
  border-radius: 10px;
  
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

textarea {
  overflow-y: auto; /* Ajoute le défilement vertical */
}
</style>
