<template>
  <div class="container px-4">
    <h1 class="text-2xl md:text-3xl font-bold text-gray-700 mb-6">Tableau des Tâches</h1>

    <div class="flex space-x-4">
      <div
        v-for="(taches, statut) in sectionsTaches"
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
            v-for="tache in taches"
            :key="tache.id"
            :class="[ 'bg-white border border-gray-200 rounded-lg shadow p-2 mb-4 relative group hover:bg-gray-100', { 'border-red-400': tache.priorite === 'elevee' } ]"
          >
            <div v-if="!tache.editing" class="flex justify-between items-center">
              <div class="w-full">
                <p
                  @click="openDetail(tache)"
                  class="text-[14px] font-semibold flex text-gray-800 cursor-pointer"
                >
                  {{ tache.titre }}
                </p>
                <p v-if="tache.date_limite" class="text-xs text-gray-500 mt-1">
                  {{ tache.date_limite }}
                </p>
              </div>

              <i
                @click.stop="startEditing(tache)"
                class="fas fa-pencil-alt text-gray-400 cursor-pointer hover:text-gray-600 hidden group-hover:block"
              ></i>
            </div>

            <div v-if="tache.editing" class="mt-2">
              <input
                v-model="tache.editedTitre"
                type="text"
                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <div class="flex space-x-2 mt-2">
                <button
                  @click="saveTache(tache)"
                  class="bg-blue-700 text-white p-2 rounded hover:bg-blue-600 transition"
                >
                  Enregistrer
                </button>
                <button
                  @click="cancelEditing(tache)"
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
          @submit.prevent="ajouterTache(statut)"
          class="mt-4"
        >
          <input
            v-model="nouvelleTache"
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

    <TacheDetail
      v-if="selectedTache"
      :tache="selectedTache"
      @close="closeDetail"
      @tacheUpdated="fetchTasks"
    />
  </div>
</template>

<script>
import axios from "@/api/axios"; // Ajustez le chemin si nécessaire
import TacheDetail from "./TacheDetail.vue"; // Ajustez le chemin si nécessaire

export default {
  name: "TacheBoard",
  components: {
    TacheDetail,
  },
  data() {
    return {
      projetId: null,
      toutesLesTaches: [],
      nouvelleTache: "",
      formVisible: false,
      formVisibleSection: null,
      selectedTache: null,
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
    sectionsTaches() {
      return {
        Backlog: this.toutesLesTaches.filter(
          (tache) => tache.statut === "backlog"
        ),
        "À faire": this.toutesLesTaches.filter(
          (tache) => tache.statut === "a faire"
        ),
        "En cours": this.toutesLesTaches.filter(
          (tache) => tache.statut === "en cours"
        ),
        Terminé: this.toutesLesTaches.filter(
          (tache) => tache.statut === "termine"
        ),
        Bloqué: this.toutesLesTaches.filter(
          (tache) => tache.statut === "bloque"
        ),
      };
    },
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await axios.get(`/projets/${this.projetId}/taches`);
        this.toutesLesTaches = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des tâches:", error);
      }
    },

    openDetail(tache) {
      this.selectedTache = tache;
    },

    closeDetail() {
      this.selectedTache = null;
    },

    toggleForm(statut) {
      this.formVisible = true;
      this.formVisibleSection = statut;
    },

    async ajouterTache(statut) {
      if (!this.nouvelleTache) return;

      try {
        const response = await axios.post(`/projets/${this.projetId}/taches`, {
          titre: this.nouvelleTache,
          statut: statut.toLowerCase(),
          projet_id: this.projetId,
        });

        const nouvelleTache = {
          id: response.data.id,
          titre: this.nouvelleTache,
          statut: statut.toLowerCase(),
          date_limite: "",
          editing: false,
        };

        this.toutesLesTaches.push(nouvelleTache);
        this.nouvelleTache = "";
        this.formVisible = false;
        this.formVisibleSection = null;
      } catch (error) {
        console.error("Erreur lors de l'ajout de la tâche:", error);
      }
    },
  },
  mounted() {
    this.projetId = this.$route.params.projectId; // Récupération de l'ID du projet
    this.fetchTasks(); // Appel pour récupérer les tâches
  },
};
</script>
