<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4">Ajouter un Utilisateur</h2>
      <form @submit.prevent="createUser">
        <div class="mb-4">
          <label for="name" class="block text-gray-700">Nom</label>
          <input v-model="user.name" type="text" id="name" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email</label>
          <input v-model="user.email" type="email" id="email" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        <div class="mb-4">
          <label for="role_id" class="block text-gray-700">Rôle</label>
          <input v-model="user.role_id" type="text" id="role_id" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        <div class="mb-4">
          <label for="avatar" class="block text-gray-700">Avatar</label>
          <input @change="handleFileUpload" type="file" id="avatar" class="mt-1 block w-full" />
        </div>
        <div class="flex justify-between">
          <button type="submit" class="p-2 text-white bg-green-500 hover:bg-green-700 rounded">Créer</button>
          <button @click="$emit('close')" type="button" class="p-2 text-white bg-gray-500 hover:bg-gray-700 rounded">Annuler</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '@/api/axios';

export default {
  name: 'UserCreate',
  data() {
    return {
      user: {
        name: '',
        email: '',
        role_id: '',
        avatar: null
      }
    };
  },
  methods: {
    async createUser() {
      const formData = new FormData();
      formData.append('name', this.user.name);
      formData.append('email', this.user.email);
      formData.append('role_id', this.user.role_id);
      if (this.user.avatar) {
        formData.append('avatar', this.user.avatar);
      }

      try {
        await axios.post('http://localhost:8000/api/users', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        this.$emit('userCreated');
        this.$emit('close');
      } catch (error) {
        console.error('Erreur lors de la création de l’utilisateur:', error);
      }
    },
    handleFileUpload(event) {
      this.user.avatar = event.target.files[0];
    }
  }
};
</script>
