<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Tableau de bord - Créer une Tâche</h2>
    
    <!-- On passe la liste des projets au composant TâcheCreate -->
    <TâcheCreate :projets="projets" @created="fetchTâches" />
  </div>
</template>

<script>
import TâcheCreate from './TâcheCreate.vue'; // Import du composant enfant
import axios from '@/api/axios'; // Assurez-vous que le chemin de axios est correct

export default {
    name:'TâcheParent',
  components: {
    TâcheCreate
  },
  data() {
    return {
      projets: [] // Initialisation des projets
    };
  },
  async created() {
    // Charger les projets lorsque le composant est monté
    await this.fetchProjets();
  },
  methods: {
    async fetchProjets() {
      try {
        // Appel à l'API pour récupérer les projets
        const response = await axios.get('/api/projets'); 
        this.projets = response.data; // Assignez les projets à la variable data
      } catch (error) {
        console.error('Erreur lors de la récupération des projets:', error);
      }
    },
    async fetchTâches() {
      // Ici, vous pouvez rafraîchir la liste des tâches si nécessaire après la création d'une nouvelle tâche
      console.log('Nouvelle tâche créée. Rafraîchissement des tâches...');
    }
  }
};
</script>

<style scoped>
/* Ajoutez vos styles personnalisés ici */
</style>
