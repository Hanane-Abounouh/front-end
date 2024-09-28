<template>
  <div class="bg-gray-100 mt-10 min-h-screen mb-16">
    <!-- Hero Section -->
    <section class="bg-[#2a2185] text-white py-20">
      <div class="container mx-auto text-center ">
        <h1 class="text-4xl font-bold mb-4 transition-transform duration-500 hover:scale-105 mt-6">À Propos de Proxime</h1>
        <p class="text-xl mb-8 transition-opacity duration-500 hover:opacity-80">Optimisez la gestion collaborative de vos projets.</p>

             <img 
          src="https://www.conversion-boosters.com/wp-content/uploads/2023/12/gestion-de-projet-web-1024x512.png" 
          alt="Gestion de projet" 
          class="rounded-lg shadow-lg object-cover  w-3/4 md:w-1/2 mx-auto h-80 transition-transform duration-500 hover:scale-105">
      </div>
    </section>

    <!-- Introduction Section -->
    <section class="container mx-auto p-6 md:p-12">
      <h2 class="text-3xl font-bold text-gray-800 mb-4">About ?</h2>
      <p class="text-gray-600 mb-8 leading-relaxed">
        Proxime est une application de gestion collaborative innovante, conçue pour améliorer la coordination et la communication au sein des équipes. 
        En réponse aux défis d’un environnement de travail en constante évolution, nous offrons une solution centralisée pour gérer les projets, assigner des tâches, 
        partager des fichiers et faciliter les échanges, le tout dans un environnement sécurisé.
      </p>
    </section>

    <!-- Valeurs Section -->
    <section class="bg-gray-200 py-10 px-3 md:px-1">
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">Nos Valeurs</h2>
        <p class="text-gray-600 mb-6 leading-relaxed">
          Chez Proxime, nous croyons en l'innovation, la collaboration et l'intégrité. 
          Notre équipe est dédiée à fournir des solutions qui répondent aux besoins de nos utilisateurs et à promouvoir un environnement de travail positif.
        </p>
        <ul class="list-disc list-inside text-gray-600 mb-8">
          <li class="mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#2a2185] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9h8M8 12h8m-4 4h4M8 15h4m-4 4h4m-4 4h4" />
            </svg>
            Innovation constante pour améliorer votre expérience utilisateur.
          </li>
          <li class="mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#2a2185] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12h-3v3h-2v-3H9v-2h3V9h2v3h3v2z" />
            </svg>
            Collaboration renforcée pour des projets plus efficaces.
          </li>
          <li class="mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#2a2185] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Intégrité et transparence dans toutes nos interactions.
          </li>
        </ul>
      </div>
    </section>

    <!-- Pourquoi Choisir Section -->
    <section class="container mx-auto p-6 md:p-12">
      <h2 class="text-3xl font-bold text-gray-800 mb-4">Pourquoi Choisir Proxime ?</h2>
      <p class="text-gray-600 mb-6 leading-relaxed">
        Proxime est la solution idéale pour les équipes modernes. Nous vous offrons des outils flexibles et intégrés qui favorisent une gestion efficace des projets.
        Grâce à notre plateforme, vous bénéficiez d'une interface intuitive, de fonctionnalités robustes et d'une sécurité des données renforcée.
      </p>
      <ul class="list-disc list-inside text-gray-600 mb-8">
        <li class="mb-2 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#2a2185] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9h8M8 12h8m-4 4h4M8 15h4m-4 4h4m-4 4h4" />
          </svg>
          Interface utilisateur intuitive et réactive.
        </li>
        <li class="mb-2 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#2a2185] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12h-3v3h-2v-3H9v-2h3V9h2v3h3v2z" />
          </svg>
          Gestion de projets simplifiée avec des outils adaptés.
        </li>
      </ul>
    </section>

 
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<style scoped>
/* Ajoutez des styles supplémentaires ici si nécessaire */
.container {
  max-width: 1200px;
}
</style>
