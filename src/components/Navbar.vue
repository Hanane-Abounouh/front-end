<template>
  <nav class="bg-white text-gray-800 py-6 px-4 md:px-12 fixed top-0 left-0 right-0 shadow-lg z-50 flex justify-between items-center">
    <!-- Logo -->
    <div class="text-2xl font-bold flex items-center gap-2">
       <svg class="w-8 h-8 text-[#2a2185]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3v18h18V3H3z"></path>
      </svg>
       
      
    <router-link to="/" class="text-[#2a2185] hover:text-gray-700 transition flex items-center">
      Pr
      <span class="flex items-center mt-2 justify-center w-4 h-4 bg-yellow-400 rounded-full animate-pulse mx-1"></span>
      xime
     </router-link>


           
    </div>

    <!-- Menu Toggle Button for Mobile -->
    <button @click="toggleMenu" class="md:hidden p-2 rounded focus:outline-none focus:ring focus:ring-yellow-500">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>
    </button>

    <!-- Navigation Menu -->
    <ul :class="{'hidden': !isMenuOpen, 'flex': isMenuOpen, 'justify-center': isMenuOpen, 'md:flex': true}" 
        class="flex-col md:flex-row md:flex md:justify-center gap-8 lg:gap-[500px] items-center absolute md:static bg-gray-100 md:bg-transparent left-0 w-full md:w-auto top-full md:top-auto z-40 md:z-auto transition-all duration-300 ease-in-out">
<div class="md:flex md:justify-center md:gap-10 md:items-center md:mx-auto">
        <li ><router-link to="/" class="nav-item">Home</router-link></li>
      <li ><router-link to="/about" class="nav-item">About</router-link></li>
</div>
      
      <!-- Auth Links -->
      <div class="flex flex-col md:flex-row gap-4 items-center">
       
        <router-link v-if="!isAuthenticated" to="/register" class="bg-[#2a2185] text-gray-100 px-3 py-2  rounded-md shadow-md hover:bg-[#342a9b] transition duration-300 ease-in-out flex items-center">
          <!-- <img src="https://icon-library.com/images/new-user-icon/new-user-icon-10.jpg" alt="Register" class="w-5 h-5 mr-2"/> -->
          Register
        </router-link>
         <router-link v-if="!isAuthenticated" to="/login" class="bg-white text-gray-900 px-3 py-2  shadow-md rounded-md border border-[#2f278f] hover:bg-gray-50 transition duration-300 ease-in-out flex items-center">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQueskTtl7dvVM0Th3uQvvhJXehOQrrY2p0HQ&s" alt="Login" class="w-5 h-5 mr-2"/>
          Login
        </router-link>
       
        <router-link v-if="isAuthenticated" to="/dashboard" class="bg-[#2a2185] text-white px-3 py-2 shadow-xl rounded-md hover:bg-[#2f278f] transition duration-300 ease-in-out flex items-center">
          <!-- <img src="https://www.svgrepo.com/show/314838/dashboard.svg" alt="Dashboard" class="w-5 h-5 text-white  mr-2"/> -->
          Dashboard
        </router-link>
         <router-link v-if="isAuthenticated" @click.prevent="logout" class="bg-white text-gray-800 px-3 py-2 border rounded-md border-[#2f278f] shadow-xl hover:bg-gray-50 transition duration-300 ease-in-out flex items-center">
          <img src="https://www.svgviewer.dev/static-svgs/33599/logout.svg" alt="Logout" class="w-5 h-5 mr-2"/>
          Logout
        </router-link>
      </div>
    </ul>
  </nav>
</template>



<script>
import api from '../api/axios';

export default {
  name: 'AppNavbar',
  data() {
    return {
      isMenuOpen: false,
    };
  },
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
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style scoped>
.nav-item {
  text-decoration: none;
  color: #4a5568; /* Gray 800 */
  padding: 0.5em 1em;
  border-radius: 9999px;
  position: relative;
  transition: color 0.3s, background-color 0.3s, transform 0.3s;
}

.nav-item:hover {
  color: #facc15; /* Yellow 400 */
  transform: translateY(-2px);
}

.nav-item::after {
  content: "";
  display: block;
  background-color: #fbbf24; /* Yellow 500 */
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
