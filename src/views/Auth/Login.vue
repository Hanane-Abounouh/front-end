<template>
  <div class="mt-80">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import api from '../../api/axios';  // Assurez-vous que ce chemin est correct

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
        console.log('Login successful', response.data);
        // Stockez le token et redirigez l'utilisateur
        localStorage.setItem('token', response.data.token);
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Login failed', error.response.data);
      }
    },
  },
};
</script>
