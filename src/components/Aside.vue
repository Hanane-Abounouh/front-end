<template>
  <aside class="z-20 fixed hidden w-64 overflow-y-auto h-full bg-white shadow-lg border border-blue-100 md:block flex-shrink-0">
    <div class="py-20 text-black">
      <!-- Navigation Menu -->
      <ul class="mt-6 space-y-2">
        <li class="relative px-6 py-3">
          <router-link
            to="/dashboard"
            class="flex h-12 cursor-pointer items-center truncate rounded-md px-6 py-4 text-black outline-none transition duration-300 ease-linear hover:bg-blue-600 hover:text-white"
            active-class="bg-blue-600 text-white"
            exact-active-class="bg-blue-600 text-white"
          >
            <svg class="w-5 h-5" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            <span class="ml-4">Dashboard</span>
          </router-link>
        </li>
        <!-- Ajoutez d'autres éléments de menu ici avec la même structure -->
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'AsideApp',
};
</script>

<style scoped>
/* Ajoutez des styles supplémentaires si nécessaire */
</style>
