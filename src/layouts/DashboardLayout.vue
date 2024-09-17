<template>
  <div class="dashboard-layout">
    <Header />
    <div class="dashboard-body">
      <Aside />
      <main class="pl-64 mt-24">
        <router-view />
      </main>
    </div>
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Aside from '../components/Aside.vue';
// import Footer from '../components/Footer.vue';

export default {
  components: {
    Header,
    Aside,
    // Footer
  }
};
</script>

<style scoped>
.dashboard-body {
  display: flex;
}
main {
  flex-grow: 1;
}
</style>
