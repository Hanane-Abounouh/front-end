<template>
  <div class="bg-white overflow-hidden shadow rounded-lg border">
    <div class="flex items-center justify-between px-4 py-5 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">Profil de l'utilisateur</h3>
      <img v-if="user.avatar" :src="user.avatar" alt="Avatar" class="w-12 h-12 rounded-full" />
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
      <dl class="sm:divide-y sm:divide-gray-200">
        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Nom complet</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ user.name }}</dd>
        </div>
        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Adresse e-mail</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ user.email }}</dd>
        </div>
      </dl>
    </div>
    <div class="flex justify-end p-4">
      <button @click="showEdit = true" class="bg-[#2a2185] text-white py-2 px-4 rounded">Modifier</button>
    </div>

    <EditProfile v-if="showEdit" @userUpdated="fetchUser" @close="showEdit = false" />
  </div>
</template>

<script>
import axios from '@/api/axios';
import EditProfile from './EditProfile.vue';

export default {
  name: 'ProfileUser',
  components: {
    EditProfile,
  },
  data() {
    return {
      user: {},
      showEdit: false, // État pour afficher le formulaire d'édition
    };
  },
  mounted() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        const response = await axios.get('/user'); // Changez cette route pour récupérer l'utilisateur connecté
        this.user = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    },
  },
};
</script>

<style scoped>
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
</style>
