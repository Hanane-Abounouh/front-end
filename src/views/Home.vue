<template>
  <div>
    <!-- Section principale -->
    <div class="bg-gray-200 py-36">
      <div class="absolute mt-20 bg-[#2a2185] top-0 left-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" class="relative block fill-gray-100 h-6">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          />
        </svg>
      </div>
      <div class=" mx-auto mt-14 px-10 lg:px-2  lg:flex lg:items-center lg:gap-24 items-end justify-center ">
        <!-- Texte principal -->
        <div class="lg:w-2/6">
          <h1 class="text-4xl font-bold text-gray-800 lg:text-5xl">
            Proxime : Gérez vos projets <span class="text-[#2a2185]">efficacement</span>
          </h1>
          <p class="mt-6 text-lg text-gray-600">
            Centralisez vos tâches, collaborez avec votre équipe, et suivez vos progrès en temps réel avec la plateforme intuitive de gestion de projet Proxime.
          </p>
          <div class="mt-8">
            <router-link to="/login">
              <button class="bg-[#2a2185] text-white px-6 py-3 rounded-lg shadow-lg  transition ease-in-out duration-300 transform hover:scale-105">
                Démarrez maintenant
              </button>
            </router-link>
          </div>
        </div>

        <!-- Image principale -->
        <div class="mt-20 lg:mt-0 lg:w-2/5">
          <img 
            src="https://www.conversion-boosters.com/wp-content/uploads/2023/12/gestion-de-projet-web-1024x512.png" 
            alt="Gestion de projet" 
            class="rounded-lg shadow-lg object-cover w-full h-full transition-transform duration-500 hover:scale-105">
        </div>
      </div>
    </div>

  <!-- Section des services -->
<section class="h-full max-h-screen mx-auto pt-12 p-4 mt-20 mb-12"> <!-- Ajout de mb-12 ici -->
  <div class="w-full px-4">
    <div class="text-center mx-auto mb-12 lg:mb-20 max-w-[510px]">
      <span class="font-semibold text-lg text-primary mb-2 block">
        Nos Services
      </span>
      <h2 class="font-bold text-3xl sm:text-4xl md:text-[40px] text-dark mb-4">
        Ce que Proxime offre
      </h2>
      <p class="text-base text-body-color">
        Proxime est conçu pour améliorer la coordination et la communication entre les membres d’une équipe.
      </p>
    </div>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-auto max-w-6xl">
    <!-- Service 1 -->
    <div class="rounded-xl bg-white p-6 text-center border border-gray-200 shadow-xl transition-transform duration-300 hover:scale-105 mb-6">
      <div class="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full bg-teal-400 shadow-lg shadow-teal-500/40">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-10 w-10 text-white" viewBox="0 0 20 20">
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V7h2v2z" />
        </svg>
      </div>
      <h3 class="text-darken mb-3 text-xl font-medium lg:px-14">Gestion de Projets</h3>
      <p class="px-4 text-gray-500">Organisez vos projets de manière efficace avec des dates, des descriptions, et un suivi en temps réel.</p>
    </div>

    <!-- Service 2 -->
    <div class="rounded-xl bg-white p-6 border border-gray-200 text-center shadow-xl transition-transform duration-300 hover:scale-105 mb-6">
      <div class="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full bg-rose-500 shadow-rose-500/40">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-10 w-10 text-white" viewBox="0 0 20 20">
          <path d="M4 4h12v2H4zM4 9h12v2H4zM4 14h12v2H4z" />
        </svg>
      </div>
      <h3 class="text-darken mb-3 text-xl font-medium lg:px-14">Gestion des Tâches</h3>
      <p class="px-4 text-gray-500">Assignez des tâches, définissez des priorités et suivez le statut des tâches en temps réel.</p>
    </div>

    <!-- Service 3 -->
    <div class="rounded-xl bg-white p-6 border border-gray-200 text-center shadow-xl transition-transform duration-300 hover:scale-105 mb-6">
      <div class="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full bg-blue-500 shadow-blue-500/40">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-10 w-10 text-white" viewBox="0 0 20 20">
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V7h2v2z" />
        </svg>
      </div>
      <h3 class="text-darken mb-3 text-xl font-medium lg:px-14">Partage de Fichiers</h3>
      <p class="px-4 text-gray-500">Téléversez et partagez des fichiers facilement, tout en collaborant avec votre équipe.</p>
    </div>
  </div>
</section>

<!-- Section à propos -->
<section class="bg-gray-100 py-40 mt-44 sm:mt-8">
  <div class="container mx-auto px-6 text-center">
    <h2 class="text-3xl font-semibold text-gray-800">À propos de Proxime</h2>
    <p class="mt-4 text-gray-600">Proxime est une plateforme conçue pour vous aider à organiser vos projets de manière simple, efficace et collaborative. Notre mission est de simplifier la gestion de vos tâches et de vous permettre de vous concentrer sur ce qui compte vraiment : l'accomplissement de vos objectifs.</p>
    <router-link to="/AboutPage" class="mt-8 inline-block bg-[#2a2185] text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition ease-in-out duration-300 transform hover:scale-105">En savoir plus</router-link>
  </div>
</section>

  </div>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style scoped>
.container {
  max-width: 1140px;
}
</style>
