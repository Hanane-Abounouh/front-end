<template>
  <div class="flex h-screen w-full items-center overflow-hidden px-2">
    <!-- Connexion -->
    <div class="relative flex w-full max-w-md flex-col space-y-5 rounded-lg border bg-white px-6 py-14 shadow-xl mx-auto">
      <div class="-z-10 absolute top-4 left-1/2 h-full w-5/6 -translate-x-1/2 rounded-lg bg-[#2a2185] sm:-right-10 sm:top-auto sm:left-auto sm:w-full sm:translate-x-0"></div>
      <div class="mx-auto mb-2 space-y-3">
        <h1 class="text-center text-3xl font-bold text-gray-700">Se connecter</h1>
        <p class="text-gray-500">Connectez-vous pour accéder à votre compte</p>
      </div>

      <form @submit.prevent="login" class="space-y-4">
        <div>
          <div class="relative mt-2 w-full">
            <input
              type="email"
              id="email"
              v-model="email"
              required
              class="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-[#2a2185] focus:outline-none focus:ring-0"
              placeholder=" "
            />
            <label
              for="email"
              class="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#2a2185] absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
            > 
              Entrez votre e-mail 
            </label>
          </div>
        </div>

        <div>
          <div class="relative mt-2 w-full">
            <input
              type="password"
              id="password"
              v-model="password"
              required
              class="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-[#2a2185] focus:outline-none focus:ring-0"
              placeholder=" "
            />
            <label
              for="password"
              class="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#2a2185] absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
            >
              Entrez votre mot de passe
            </label>
          </div>
        </div>

        <div class="flex w-full items-center justify-between">
          <button class="shrink-0 inline-block w-36 rounded-lg bg-[#2a2185] py-3 font-bold text-white">Connexion</button>
        
        </div>
      </form>

      <p class="text-center text-gray-600">
        Vous n'avez pas de compte ?
        <router-link to="/register" class="whitespace-nowrap font-semibold text-gray-900 hover:underline">Inscrivez-vous</router-link>
      </p>
    </div>
    <!-- /Connexion -->
  </div>
</template>

<script>
import api from '@/api/axios';

export default {
  name: 'AuthLogin',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await api.post('/login', {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem('token', response.data.token);
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Erreur lors de la connexion :', error.response.data.message);
      }
    },
  },
};
</script>

<style scoped>
/* Ajoutez des styles selon vos besoins */
</style>
