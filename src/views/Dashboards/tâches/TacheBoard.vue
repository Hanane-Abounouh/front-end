<template>
  <div class="container px-4">
    <h1 class="text-2xl md:text-3xl font-bold text-gray-700 mb-6">
      Tableau des Tâches
    </h1>

    <div class="flex space-x-4">
      <div
        v-for="(tâches, statut) in sectionsTâches"
        :key="statut"
        class="w-1/5 flex flex-col rounded-lg shadow-lg border border-gray-200 p-2 max-h-[70vh]"
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
              'bg-white border border-gray-200 rounded-lg shadow p-2 mb-4 relative group hover:bg-gray-100',
              { 'border-red-400': tâche.priorité === 'élevée' }, // Ajout de la classe conditionnelle
            ]"
          >
            <div
              v-if="!tâche.editing"
              class="flex justify-between items-center"
            >
              <div class="w-full">
                <p
                  @click="openDetail(tâche)"
                  class="text-[14px] font-semibold flex text-gray-800 cursor-pointer hover:text-blue-600"
                >
                  {{ tâche.titre }}
                </p>
                <p v-if="tâche.date_limite" class="text-xs text-gray-500 mt-1">
                  {{ tâche.date_limite }}
                </p>
              </div>

              <i
                @click.stop="startEditing(tâche)"
                class="fas fa-pencil-alt text-gray-400 cursor-pointer hover:text-gray-600 hidden group-hover:block"
              ></i>
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
          class="mt-4 flex items-center cursor-pointer hover:text-gray-600 transition"
        >
          <i class="fas fa-plus-circle text-gray-500 text-xl mr-2"></i>
          <span class="text-gray-500 font-semibold">Ajouter une tâche</span>
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

   <TacheDetail v-if="selectedTâche" :tâche="selectedTâche" :projetId="projetId" @close="closeDetail" @tâcheUpdated="fetchTâches" />
  </div>
</template>

<script>
import axios from "@/api/axios";
import TacheDetail from "./TacheDetail.vue";

export default {
  name: "TacheBoard",
  components: {
    TacheDetail,
  },
  data() {
    return {
      projetId: null,
      toutesLesTâches: [],
      nouvelleTâche: "",
      formVisible: false,
      formVisibleSection: null,
      selectedTâche: null,
      sectionClasses: {
        Backlog: "border-b-2 border-gray-500 bg-gray-200 rounded p-2",
        "À faire": "border-b-2 border-blue-500 bg-blue-200 rounded p-2",
        "En cours": "border-b-2 border-yellow-500 bg-yellow-200 rounded p-2",
        Terminé: "border-b-2 border-green-500 bg-green-200 rounded p-2",
        Bloqué: "border-b-2 border-red-500 bg-red-200 rounded p-2",
      },
    };
  },
  computed: {
    sectionsTâches() {
      return {
        Backlog: this.toutesLesTâches.filter(
          (tâche) => tâche.statut === "backlog"
        ),
        "À faire": this.toutesLesTâches.filter(
          (tâche) => tâche.statut === "à faire"
        ),
        "En cours": this.toutesLesTâches.filter(
          (tâche) => tâche.statut === "en cours"
        ),
        Terminé: this.toutesLesTâches.filter(
          (tâche) => tâche.statut === "terminé"
        ),
        Bloqué: this.toutesLesTâches.filter(
          (tâche) => tâche.statut === "bloqué"
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

    async ajouterTâche(statut) {
      if (!this.nouvelleTâche) return;

      try {
        const response = await axios.post(`/taches`, {
          titre: this.nouvelleTâche,
          statut: statut.toLowerCase(),
          projet_id: this.projetId,
        });

        const nouvelleTâche = {
          id: response.data.id,
          titre: this.nouvelleTâche,
          statut: statut.toLowerCase(),
          date_limite: "",
          editing: false,
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
  },
};
</script>

<style scoped>
.group-hover .fa-pencil-alt {
  display: block !important;
}
</style>
