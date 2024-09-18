<template>
  <div class="auth-container mt-60">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <div>
        <label for="password_confirmation">Confirm Password:</label>
        <input type="password" v-model="passwordConfirmation" required />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import api from '@/api/axios';


export default {
   name: 'UserRegister',
  data() {
     
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    };
  },
  methods: {
    async register() {
      try {
        const response = await api.post('/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirmation,
        });
        localStorage.setItem('token', response.data.token);
        this.$router.push('/login');
      } catch (error) {
        console.error('Error during registration:', error.response.data.errors);
      }
    },
  },
};
</script>

<style scoped>
/* Ajoutez des styles selon vos besoins */
</style>
