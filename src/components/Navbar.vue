<template>
  <nav class="bg-gray-100 text-gray-700 py-6 px-48 fixed top-0 left-0 right-0 shadow-lg z-50 flex justify-between items-center">
    <!-- Logo -->
    <div class="text-2xl font-bold flex items-center gap-2">
      <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3v18h18V3H3z"></path>
      </svg>
      <router-link to="/" class="text-blue-600 hover:text-blue-500 transition">Dev_Hub</router-link>
    </div>

    <!-- Navigation Menu -->
    <ul class="flex gap-8 items-center">
      <li><router-link to="/" class="nav-item">Home</router-link></li>
      <li><router-link to="/about" class="nav-item">About</router-link></li>
      <li><router-link to="/services" class="nav-item">Services</router-link></li>
    </ul>

    <!-- Auth Links -->
    <div class="flex gap-4 items-center">
      <!-- Links affichés lorsque l'utilisateur n'est pas authentifié -->
      <router-link v-if="!isAuthenticated" to="/login" class="bg-white text-gray-800 px-4 py-2 rounded-full shadow-md hover:bg-gray-100 transition duration-300 ease-in-out flex items-center">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQueskTtl7dvVM0Th3uQvvhJXehOQrrY2p0HQ&s" alt="Login" class="w-5 h-5 mr-2"/>
        Login
      </router-link>
      <router-link v-if="!isAuthenticated" to="/register" class="bg-yellow-500 text-gray-900 px-4 py-2 rounded-full shadow-md hover:bg-yellow-400 transition duration-300 ease-in-out flex items-center">
        <img src="https://icon-library.com/images/new-user-icon/new-user-icon-10.jpg" alt="Register" class="w-5 h-5 mr-2"/>
        Register
      </router-link>

      <!-- Liens affichés lorsque l'utilisateur est authentifié -->
      <router-link v-if="isAuthenticated" @click.prevent="logout" class="bg-gray-300 text-gray-800 px-4 py-2 rounded-full shadow-md hover:bg-gray-400 transition duration-300 ease-in-out flex items-center">
        <img src="https://www.svgviewer.dev/static-svgs/33599/logout.svg" alt="Logout" class="w-5 h-5 mr-2"/>
        Logout
      </router-link>
      <router-link v-if="isAuthenticated" to="/dashboard" class="bg-gray-300 text-gray-800 px-4 py-2 rounded-full shadow-md hover:bg-gray-400 transition duration-300 ease-in-out flex items-center">
        <img src="https://www.svgrepo.com/show/314838/dashboard.svg" alt="Dashboard" class="w-5 h-5 mr-2"/>
        Dashboard
      </router-link>
    </div>
  </nav>
</template>

<script>
import api from '../api/axios';  // Assurez-vous que ce chemin est correct

export default {
  name: 'AppNavbar',
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token');
    },
  },
  methods: {
    async logout() {
      try {
        await api.post('/logout');
        localStorage.removeItem('token');
        this.$router.push({ name: 'Login' });
      } catch (error) {
        console.error('Error during logout:', error);
      }
    },
  },
};
</script>

<style scoped>
.nav-item {
  text-decoration: none;
  color: #3a4354;
  padding: 0.5em 1em;
  border-radius: 9999px;
  position: relative;
  transition: color 0.3s, background-color 0.3s, transform 0.3s;
}

.nav-item:hover {
  color: #fbbf24;
  background-color: #fff;
  transform: translateY(-2px);
}

.nav-item::after {
  content: "";
  display: block;
  background-color: #fbbf24;
  height: 2px;
  width: 0;
  position: absolute;
  bottom: -0.5em;
  left: 0;
  transition: width 0.3s ease;
}

.nav-item:hover::after {
  width: 100%;
}

nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}
</style>
