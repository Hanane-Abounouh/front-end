<template>
  <div class="inset-0 flex mt-10  ">
    <div class="bg-white px-6 py-4 border border-gray-100 rounded-lg shadow-md w-full max-w-2xl">
      <h3 class="text-xl font-bold text-[#2a2185] mb-6">Créer un Utilisateur</h3>
      <form @submit.prevent="createUser">
        <!-- Nom -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
          <input 
            v-model="user.name" 
            type="text" 
            id="name" 
            class="mt-1 block w-full bg-gray-200 rounded-md shadow-sm"
            required
          />
        </div>
        
        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
          <input 
            v-model="user.email" 
            type="email" 
            id="email" 
            class="mt-1 block w-full bg-gray-200 rounded-md shadow-sm"
            required
          />
        </div>
        
        <!-- Mot de Passe -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">Mot de Passe</label>
          <input 
            v-model="user.password" 
            type="password" 
            id="password" 
            class="mt-1 block w-full bg-gray-200 rounded-md shadow-sm"
            required
          />
        </div>

        <!-- Rôle -->
        <div class="mb-4">
          <label for="role" class="block text-sm font-semibold text-gray-700 mb-2">Rôle</label>
          <select 
            v-model="user.role_id" 
            id="role" 
            class="mt-1 block w-full bg-gray-200 rounded-md shadow-sm"
            required
          >
            <option v-for="role in roles" :key="role.id" :value="role.id">
              {{ role.nom }}
            </option>
          </select>
        </div>

        <!-- Boutons -->
        <div class="flex justify-end space-x-3">
          <button 
            type="button" 
            class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            @click="$emit('close')"
          >
            Annuler
          </button>
          <button 
            type="submit" 
            class="px-4 py-2 bg-[#8c94cc] text-white rounded-md hover:bg-[#6e74a7]"
          >
            Créer
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/api/axios';

export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        role_id: null,
      },
      roles: [],
    };
  },
  async created() {
    this.fetchRoles();
  },
  methods: {
    async fetchRoles() {
      try {
        const response = await api.get('/roles');
        this.roles = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des rôles:', error);
      }
    },
   async createUser() {
  try {
    console.log("Creating user:", this.user); // Vérifie les données
    await api.post('/users', this.user);
    this.$emit('created');
    this.$emit('close');
    this.user = { name: '', email: '', password: '', role_id: null }; // Réinitialiser le formulaire
  } catch (error) {
    console.error('Erreur lors de la création de l’utilisateur:', error);
    alert('Une erreur est survenue lors de la création de l’utilisateur.'); // Message d'erreur
  }
},

  },
};
</script>

<style scoped>
/* Styles personnalisés pour un formulaire avec couleur de fond constante */
input,
select {
  background-color: #f4f4f5; /* Couleur de fond des champs */
  border: none; /* Enlever les bordures */
  border-radius: 0.375rem; /* Rayon des coins */
  padding: 0.5rem; /* Espacement interne */
}

input:focus,
select:focus {
  background-color: #f4f4f5; /* Garder la même couleur au focus */
  outline: none; /* Enlever le contour au focus */
}

button {
  transition: background-color 0.3s ease;
}
</style>
