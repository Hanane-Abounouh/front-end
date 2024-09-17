<template>
  <header class="fixed w-full flex justify-between items-center shadow-lg h-16 bg-gradient-to-r from-blue-500 to-blue-400 text-white z-40 py-4 px-6">
    <div class="flex items-center">
      <!-- Mobile hamburger menu -->
      <button
        class="p-2 mr-4 rounded-md md:hidden focus:outline-none focus:shadow-outline"
        @click="toggleSideMenu"
        aria-label="Menu"
      >
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
        </svg>
      </button>
      <!-- Logo / Brand Name -->
      <a class="text-2xl font-bold" href="#">ProjectManager</a>
    </div>

    <div class="flex-1 flex justify-center">
      <!-- Search input -->
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

    <ul class="flex items-center space-x-6">
      <!-- Notifications menu -->
      <li class="relative">
        <button
          class="relative rounded-full focus:outline-none"
          @click="toggleNotificationsMenu"
          aria-label="Notifications"
        >
          <svg class="w-5 h-5 text-gray-200" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
          </svg>
          <!-- Notification badge -->
          <span class="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full"></span>
        </button>
        <div v-if="isNotificationsMenuOpen" class="absolute right-0 w-56 p-2 mt-2 space-y-2 bg-white border border-gray-100 rounded-md shadow-md">
          <a class="block px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100" href="#">
            Notification 1
          </a>
          <!-- More notifications go here -->
        </div>
      </li>

      <!-- Profile menu -->
      <li class="relative">
        <button
          class="rounded-full focus:outline-none"
          @click="toggleProfileMenu"
          aria-label="Account"
        >
          <img
            class="object-cover w-8 h-8 rounded-full"
            src="https://i.imgur.com/4s7Ltnb.jpg"
            alt="User Avatar"
          />
        </button>
        <div v-if="isProfileMenuOpen" class="absolute right-0 w-56 p-2 mt-2 space-y-2 bg-white border border-gray-100 rounded-md shadow-md">
          <a class="block px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100" href="#">
            Dashboard
          </a>
          <a class="block px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100" href="#">
            Profile
          </a>
          <form method="POST" action="/logout">
            <button type="submit" class="block px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 w-full text-left">
              Logout
            </button>
          </form>
        </div>
      </li>
    </ul>
  </header>
</template>


<script>
export default {
  name: 'HeaderApp',
  data() {
    return {
      isNotificationsMenuOpen: false,
      isProfileMenuOpen: false,
   
      searchQuery: '',  // For search input
    };
  },
  methods: {
    toggleSideMenu() {
      // Logic to show/hide the sidebar
    },
   
    toggleNotificationsMenu() {
      this.isNotificationsMenuOpen = !this.isNotificationsMenuOpen;
    },
    toggleProfileMenu() {
      this.isProfileMenuOpen = !this.isProfileMenuOpen;
    }
  }
};
</script>

<style scoped>
/* Optionally, add styles for the notification badge */
.notification-badge {
  position: absolute;
  top: -1px;
  right: -1px;
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 50%;
}
</style>
