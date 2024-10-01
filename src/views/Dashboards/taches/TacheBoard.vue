<template>
  <div class="container px-4">
   <div class="flex flex-col md:flex-row justify-between gap-4 items-center mb-4  ">
     <h1 class="text-2xl md:text-3xl font-bold text-gray-700 mb-6">
      Tableau des Tâches
    </h1>
    <button class="mt-4 md:mt-0 px-2 py-1 md:py-2 text-gray-700 border border-gray-50 rounded bg-[#dbdbf1] flex items-center space-x-2" @click="showShare = true">Partager </button>
   </div>

    <div class="flex space-x-4  ">
      <div
        v-for="(tâches, statut) in sectionsTâches"
        :key="statut"
        class="w-[400px] flex flex-col bg-gray-100 rounded-xl shadow-xl border border-gray-200 px-2 py-3 max-h-[70vh]"
      >
        <h2
          :class="sectionClasses[statut]"
          class="text-xl font-semibold text-gray-800 mb-4 pb-2"
        >
          {{ statut }}
        </h2>

       <ul class="flex-grow mt-4 overflow-y-auto">
  <li
    v-for="tâche in tâches"
    :key="tâche.id"
    :class="[ 
      'bg-white border  border-gray-200 rounded-lg shadow p-2 mb-4 relative group hover:bg-gray-100',
      { 'border-red-400': tâche.priorite === 'elevee' },
    ]">
    <div
      v-if="!tâche.editing"
      class="flex justify-between  items-center">
      <div class="w-52 ">
         <p
        @click="openDetail(tâche)"
        class="text-[14px]  font-semibold text-gray-600 cursor-pointer hover:text-blue-600"
        style="white-space: normal; overflow-wrap: break-word;">
        {{ tâche.titre }}
      </p>
      <div  class="text-xs text-gray-500 mt-1 flex items-center gap-2">
      <p v-if="tâche.date_limite"> {{ tâche.date_limite }}   </p>
       <i v-if="tâche.description" class="fas fa-bars text-gray-600" title="Description disponible"></i>
       
      </div>

      </div>

      <i @click.stop="startEditing(tâche)"
        class="fas fa-pencil-alt text-gray-400 cursor-pointer hover:text-gray-600 hidden group-hover:block"></i>
      <i v-if="tâche.cree_par === currentUserId"
      @click.stop="deleteTâche(tâche.id)"
      class="fas fa-trash-alt text-red-400 cursor-pointer hover:text-red-500 ml-2 hidden group-hover:block"
      title="Supprimer la tâche"></i>




    </div>

    <div v-if="tâche.editing" class="mt-2">
      <input
        v-model="tâche.editedTitre"
        type="text"
        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        required
      />
      <div class="flex space-x-2 mt-2">
        <button
          @click="saveTâche(tâche)"
          class="bg-blue-700 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Enregistrer
        </button>
        <button
          @click="cancelEditing(tâche)"
          class="bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-300 transition"
        >
          Annuler
        </button>
      </div>
    </div>
  </li>
</ul>


        <div
          v-if="!formVisible || formVisibleSection !== statut"
          @click="toggleForm(statut)"
          class="mt-4 flex items-center cursor-pointer hover:text-gray-700 transition"
        >
          <i class="fas fa-plus-circle text-gray-600 text-xl mr-2"></i>
          <span class="text-gray-600 font-semibold">Ajouter une tâche</span>
        </div>

        <form
          v-if="formVisible && formVisibleSection === statut"
          @submit.prevent="ajouterTâche(statut)"
          class="mt-4"
        >
          <input
            v-model="nouvelleTâche"
            type="text"
            placeholder="Nom de la nouvelle tâche"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
            required
          />
          <div class="flex space-x-2">
            <button
              type="submit"
              class="bg-blue-700 text-white p-2 rounded hover:bg-blue-600 transition"
            >
              Ajouter
            </button>
            <button
              type="button"
              @click="annulerAjout"
              class="bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-300 transition"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
    <div v-if="confirmDeleteId" class="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
  <div class="bg-white p-6 rounded-lg shadow-lg">
    <h3 class="text-lg font-bold mb-4">Confirmation</h3>
    <p>Êtes-vous sûr de vouloir supprimer cette tâche ?</p>
    <div class="flex justify-end mt-4">
      <button @click="confirmDeleteTâche" class="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700">Confirmer</button>
      <button @click="confirmDeleteId = null" class="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300">Annuler</button>
    </div>
  </div>
</div>


    <TacheDetail v-if="selectedTâche" :tâche="selectedTâche" :projetId="projetId" @close="closeDetail" @tâcheUpdated="fetchTasks" />
        <PartagerProjete v-if="showShare" @close="closeShareModal" />
  </div>
</template>

<script>
import axios from "@/api/axios";
import TacheDetail from "./TacheDetail.vue";
import PartagerProjete from "@/views/Dashboards/Projets/PartagerProjete.vue";


export default {
  name: "TacheBoard",
  components: {
    TacheDetail,
    PartagerProjete
  },
  data() {
    return {
      projetId: null,
      toutesLesTâches: [],
      nouvelleTâche: "",
      formVisible: false,
      formVisibleSection: null,
       currentUserId: null,
      confirmDeleteId: null,
      selectedTâche: null,
        showShare: false,
      sectionClasses: {
        backlog: "border-b-2 border-gray-500 bg-gray-200 rounded p-2 w-[268px]",
        "a faire": "border-b-2 border-blue-500 bg-blue-200 rounded p-2 w-[268px]",
        "en cours": "border-b-2 border-yellow-500 bg-yellow-200 rounded p-2 w-[268px]",
        termine: "border-b-2 border-green-500 bg-green-200 rounded p-2 w-[268px]",
        bloque: "border-b-2 border-red-500 bg-red-200 rounded p-2 w-[268px]",
      },
    };
  },
  computed: {
    sectionsTâches() {
      return {
        backlog: this.toutesLesTâches.filter(
          (tâche) => tâche.statut === "backlog"
        ),
        "a faire": this.toutesLesTâches.filter(
          (tâche) => tâche.statut === "a faire"
        ),
        "en cours": this.toutesLesTâches.filter(
          (tâche) => tâche.statut === "en cours"
        ),
        termine: this.toutesLesTâches.filter(
          (tâche) => tâche.statut === "termine"
        ),
        bloque: this.toutesLesTâches.filter(
          (tâche) => tâche.statut === "bloque"
        ),
      };
    },
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await axios.get(`/projets/${this.projetId}/taches`);
        this.toutesLesTâches = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des tâches:", error);
      }
    },


 async fetchCurrentUserId() {
  try {
    const response = await axios.get('/user');
    this.currentUserId = response.data.id;
    console.log('Current User ID:', this.currentUserId); // Vérifiez la valeur ici
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'ID de l\'utilisateur:', error);
  }
},

    openDetail(tâche) {
      this.selectedTâche = tâche;
    },

    closeDetail() {
      this.selectedTâche = null;
    },

    toggleForm(statut) {
      this.formVisible = true;
      this.formVisibleSection = statut;
    },
    
  toggleShare() {
    console.log("Toggle Share button clicked");
    this.showShare = !this.showShare;
 
  },
   closeShareModal() {
      this.showShare = false; // Ferme le modal
    },

    async ajouterTâche(statut) {
      if (!this.nouvelleTâche) return;

      try {
        const response = await axios.post(`/taches`, {
          titre: this.nouvelleTâche,
          statut: statut.toLowerCase(),
          projet_id: this.projetId,
          cree_par: this.currentUserId,
        });

        const nouvelleTâche = {
          id: response.data.tache.id,
          titre: this.nouvelleTâche,
          statut: statut.toLowerCase(),
          date_limite: "",
          editing: false,
          cree_par: this.currentUserId,
        };

        this.toutesLesTâches.push(nouvelleTâche);
        this.nouvelleTâche = "";
        this.formVisible = false;
        this.formVisibleSection = null;
      } catch (error) {
        console.error("Erreur lors de l'ajout de la tâche:", error);
      }
    },

    startEditing(tâche) {
      tâche.editing = true;
      tâche.editedTitre = tâche.titre;
    },

  async saveTâche(tâche) {
  try {
    const payload = {
      titre: tâche.editedTitre,
      statut: tâche.statut,
      projet_id: this.projetId,
    };

    const response = await axios.put(`/taches/${tâche.id}`, payload);

    if (response.status === 200) {
      tâche.titre = tâche.editedTitre;
      tâche.editing = false;

      // Success alert
      alert("Tâche mise à jour avec succès !");
    } else {
      console.error("Erreur lors de la mise à jour:", response.data);
    }
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour de la tâche:",
      error.response ? error.response.data : error.message
    );
  }
},

    async deleteTâche(tâcheId) {
    this.confirmDeleteId = tâcheId; // Mettez à jour cette ligne
  },

  async confirmDeleteTâche() {
    try {
      await axios.delete(`/taches/${this.confirmDeleteId}`);
      this.toutesLesTâches = this.toutesLesTâches.filter(tâche => tâche.id !== this.confirmDeleteId);
      this.confirmDeleteId = null; // Réinitialiser après la suppression
      console.log("Tâche supprimée avec succès.");
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche:", error);
    }
  },

    cancelEditing(tâche) {
      tâche.editing = false;
    },

    annulerAjout() {
      this.nouvelleTâche = "";
      this.formVisible = false;
      this.formVisibleSection = null;
    },
  },
  mounted() {
    this.projetId = this.$route.params.projectId;
    this.fetchTasks();
    this.fetchCurrentUserId(); 
  },




 watch: {
    '$route.params.projectId': {
      immediate: true,
      handler(newProjectId) {
        this.projetId = newProjectId;
        this.fetchTasks(); // Fetch tasks whenever the projectId changes
      },
    }}

};
</script>

<style scoped>
.group-hover .fa-pencil-alt {
  display: block !important;
}

::-webkit-scrollbar {
  width: 2.5px;
}

::-webkit-scrollbar-thumb {
  background-color: #9a9aa2;
  border-radius: 10px;
  
}


</style>
