<template>
  <footer class="text-white py-10 relative overflow-hidden">
    <div class="container mx-auto px-4 py-6">
      <div class="grid md:grid-cols-4 sm:grid-cols-1 gap-6">
        <div class="relative flex flex-col">
          <span class="absolute top-0 left-0 w-4 h-4 bg-yellow-400 rounded-full transform -translate-y-2 animate-pulse"></span>
          <h2 class="text-3xl font-bold mb-2">Proxime</h2>
          <p class="text-lg">Votre partenaire pour une gestion efficace de vos projets et tâches.</p>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-2">Services</h3>
          <ul>
            <li class="my-1"><a href="#" class="hover:text-yellow-400 transition duration-200">Gestion de Projets</a></li>
            <li class="my-1"><a href="#" class="hover:text-yellow-400 transition duration-200">Gestion des Tâches</a></li>
            <li class="my-1"><a href="#" class="hover:text-yellow-400 transition duration-200">Partage de Fichiers</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-2">Contact</h3>
          <p class="my-2">Email: contact@proxime.com</p>
          <p class="my-2">Téléphone: +212 *********</p>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-2">Suivez-nous</h3>
          <div class="flex space-x-4">
            <a href="#" class="hover:text-yellow-400 transition duration-200"><i class="fab fa-github"></i></a>
            <a href="#" class="hover:text-yellow-400 transition duration-200"><i class="fab fa-linkedin"></i></a>
            <a href="#" class="hover:text-yellow-400 transition duration-200"><i class="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-10 text-center">
      <p class="text-sm">&copy; {{ currentYear }} Proxime. Tous droits réservés.</p>
    </div>

    <div class="absolute bottom-0 left-0 right-0 border-t-4 border-yellow-400"></div>

    <div class="absolute -left-16 -bottom-16 w-24 h-24 rounded-full bg-yellow-400 animate-bounce"></div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter', // Nom changé pour respecter la règle multi-word
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
footer {
  background-color: #2a2185;
}
</style>
