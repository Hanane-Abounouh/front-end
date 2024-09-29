<template>
  <header class="fixed md:pl-80 md:px-12 w-full flex justify-between items-center shadow-md h-16 bg-white text-gray-800 z-40 py-4 px-6">
    <!-- Sidebar Toggle Button -->
    <button @click="toggleSidebar" class="md:hidden p-2 text-gray-600">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>

    <!-- Search Input -->
    <div class="flex-1 md:pl-12 flex justify-center md:justify-start">
      <div class="bg-white rounded flex items-center w-full max-w-md p-2 shadow-md border border-gray-200">
        <button class="outline-none focus:outline-none">
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
        <input
          type="search"
          v-model="searchQuery"
          placeholder="Search"
          class="w-full pl-3 text-sm text-gray-900 outline-none bg-transparent focus:outline-none"
        />
      </div>
    </div>

    <!-- Notifications and Profile Menus -->
    <ul class="flex items-center space-x-4 md:space-x-6">
      <!-- Notifications Menu -->
      <li class="relative">
        <button
          class="relative rounded-full focus:outline-none"
          @click="toggleNotificationsMenu"
          aria-label="Notifications"
        >
          <svg class="w-5 h-5 text-gray-600" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
          </svg>
          <span class="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full"></span>
        </button>
        <div v-if="isNotificationsMenuOpen" class="absolute right-0 w-56 p-2 mt-2 space-y-2 bg-white border border-gray-100 rounded-md shadow-md">
          <a class="block px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100" href="#">
            Notification 1
          </a>
          <!-- More notifications go here -->
        </div>
      </li>

      <!-- Profile Menu -->
      <li class="relative">
        <button
          class="rounded-full focus:outline-none"
          @click="toggleProfileMenu"
          aria-label="Account"
        >
          <img
            :src="user.avatar"
            alt="User Avatar"
            class="object-cover w-8 h-8 rounded-full"
          />
         
        </button>
        <div v-if="isProfileMenuOpen" class="absolute right-0 w-56 p-2 mt-2 space-y-2 bg-white border border-gray-100 rounded-md shadow-md">
          <a class="block px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100" href="#">
            Profile
          </a>
          <button @click="confirmLogout" class="block px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 w-full text-left">
            Logout
          </button>
        </div>
      </li>
    </ul>
  </header>
</template>

<script>
import axios from '@/api/axios';

export default {
  name: 'HeaderApp',
  data() {
    return {
      searchQuery: '',
      isNotificationsMenuOpen: false,
      isProfileMenuOpen: false,
      user: {
        name: '',
        avatar: ''
      }
    };
  },
  methods: {
    async fetchUser() {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        this.user = response.data; // Assurez-vous que la réponse contient le nom et l'avatar
      } catch (error) {
        console.error('Erreur lors de la récupération des informations utilisateur:', error);
      }
    },

    async confirmLogout() {
      const confirmLogout = confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
      if (confirmLogout) {
        this.logout(); // Proceed to logout if confirmed
      }
    },

    async logout() {
      const token = localStorage.getItem('token');
      try {
        await axios.post('/logout', {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        localStorage.removeItem('token');
        this.$router.push('/login');
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
      }
    },

    toggleNotificationsMenu() {
      this.isNotificationsMenuOpen = !this.isNotificationsMenuOpen;
      this.isProfileMenuOpen = false;
    },
    toggleProfileMenu() {
      this.isProfileMenuOpen = !this.isProfileMenuOpen;
      this.isNotificationsMenuOpen = false;
    },
    toggleSidebar() {
      this.$emit('toggle-sidebar');
    }
  },
  created() {
    this.fetchUser(); // Récupère les informations de l'utilisateur à la création du composant
  }
};
</script>
