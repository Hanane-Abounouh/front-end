<template>
  <div class="bg-white rounded-lg shadow-lg border border-gray-300 p-4">
    <h2 class="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">{{ title }}</h2>
    <ul class="mt-4 max-h-[455px] overflow-y-auto">
      <li
        v-for="tâche in tasks"
        :key="tâche.id"
        class="relative bg-gray-50 border border-gray-200 rounded-lg shadow p-4 mb-4 transition duration-300 ease-in-out hover:shadow-lg"
      >
        <div class="flex justify-between items-center cursor-pointer"
             @mouseenter="showIcons(tâche)"
             @mouseleave="hideIcons(tâche)">
          <h3 v-if="!tâche.isEditing" class="text-lg font-semibold text-gray-800" @click="showTaskDetails(tâche)">
            {{ tâche.titre }}
          </h3>
          <input
            v-if="tâche.isEditing"
            v-model="tâche.titre"
            type="text"
            class="w-full p-2 border border-gray-300 rounded mt-2"
          />
          <div v-if="tâche.showIcons" class="flex space-x-2">
            <i class="fas fa-edit text-gray-500 cursor-pointer" @click.stop="editTask(tâche)"></i>
          </div>
        </div>
        <button v-if="tâche.isEditing" @click="updateTask(tâche)" class="bg-blue-500 text-white p-2 rounded mt-2">Sauvegarder</button>
      </li>
    </ul>

    <div v-if="!formVisible" @click="toggleForm" class="mt-4 flex items-center cursor-pointer hover:text-blue-600 transition">
      <i class="fas fa-plus-circle text-blue-500 text-xl mr-2"></i>
      <span class="text-blue-500 font-semibold">Ajouter une tâche</span>
    </div>

    <form v-if="formVisible" @submit.prevent="ajouterTâche" class="mt-4">
      <input
        v-model="localNouvelleTâche"
        type="text"
        placeholder="Nom de la nouvelle tâche"
        class="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <div class="flex space-x-2">
        <button type="submit" class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">Ajouter</button>
        <button type="button" @click="annulerAjout" class="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400 transition">Annuler</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    tasks: Array,
    formVisible: Boolean,
  },
  data() {
    return {
      localNouvelleTâche: '', // Local data property
    };
  },
  methods: {
    toggleForm() {
      this.$emit('toggleForm');
    },
    ajouterTâche() {
      this.$emit('ajouterTâche', this.localNouvelleTâche);
      this.localNouvelleTâche = ''; // Clear the input after adding
    },
    annulerAjout() {
      this.$emit('annulerAjout');
      this.localNouvelleTâche = ''; // Clear the input when canceled
    },
    showTaskDetails(tâche) {
      this.$emit('showTaskDetails', tâche);
    },
    showIcons(tâche) {
      tâche.showIcons = true; // Show icons on hover
    },
    hideIcons(tâche) {
      tâche.showIcons = false; // Hide icons when not hovering
    },
    editTask(tâche) {
      tâche.isEditing = true; // Start editing
    },
    async updateTask(tâche) {
      this.$emit('updateTask', { ...tâche }); // Emit the updated task
      tâche.isEditing = false; // Stop editing
    },
  },
};
</script>

<style scoped>
/* Ajoutez ici votre CSS personnalisé si nécessaire */
</style>
