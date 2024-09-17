<template>
  <div class="mt-80">
    <h1>Register</h1>
    <form @submit.prevent="registerUser">
      <input type="text" v-model="name" placeholder="Name" required />
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <input type="password" v-model="password_confirmation" placeholder="Confirm Password" required />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import api from '../../api/axios';  // Assurez-vous que ce fichier existe

export default {
  name: 'UserRegister',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    };
  },
  methods: {
    async registerUser() {
      try {
        // Utilisez api pour effectuer l'inscription
        await api.post('/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        });
        this.$router.push('/login');
      } catch (error) {
        console.error('Registration failed', error.response.data);
      }
    }
  }
};
</script>
