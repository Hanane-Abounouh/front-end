<template>
  <div class="flex h-screen mt-10 w-screen items-center overflow-hidden px-2">
    <!-- Register -->
    <div class="relative flex w-96 flex-col space-y-5 rounded-lg border bg-white px-5 py-10 shadow-xl sm:mx-auto">
      <div class="-z-10 absolute top-4 left-1/2 h-full w-5/6 -translate-x-1/2 rounded-lg bg-[#3a3387] sm:-right-10 sm:top-auto sm:left-auto sm:w-full sm:translate-x-0"></div>
      <div class="mx-auto mb-2 space-y-3">
        <h1 class="text-center text-3xl font-bold text-gray-700">Register</h1>
        <p class="text-gray-500">Create an account to get started</p>
      </div>

      <form @submit.prevent="register" class="space-y-4">
        <div>
          <div class="relative mt-2 w-full">
            <input
              type="text"
              id="name"
              v-model="name"
              required
              class="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-[#3a3387] focus:outline-none focus:ring-0"
              placeholder=" "
            />
            <label
              for="name"
              class="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#3a3387] absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
            >
              Enter Your Name
            </label>
          </div>
        </div>

        <div>
          <div class="relative mt-2 w-full">
            <input
              type="email"
              id="email"
              v-model="email"
              required
              class="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-[#3a3387] focus:outline-none focus:ring-0"
              placeholder=" "
            />
            <label
              for="email"
              class="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#3a3387] absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
            >
              Enter Your Email
            </label>
          </div>
        </div>

        <div>
          <div class="relative mt-2 w-full">
            <input
              type="password"
              id="password"
              v-model="password"
              required
              class="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-[#3a3387] focus:outline-none focus:ring-0"
              placeholder=" "
            />
            <label
              for="password"
              class="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#3a3387] absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
            >
              Enter Your Password
            </label>
          </div>
        </div>

        <div>
          <div class="relative mt-2 w-full">
            <input
              type="password"
              id="password_confirmation"
              v-model="passwordConfirmation"
              required
              class="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-[#3a3387] focus:outline-none focus:ring-0"
              placeholder=" "
            />
            <label
              for="password_confirmation"
              class="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#3a3387] absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
            >
              Confirm Your Password
            </label>
          </div>
        </div>

        <div class="flex w-full items-center">
          <button class="shrink-0 inline-block w-36 rounded-lg bg-[#3a3387] py-3 font-bold text-white">Register</button>
        </div>
      </form>

      <p class="text-center text-gray-600">
        Already have an account?
        <a href="#" class="whitespace-nowrap font-semibold text-gray-900 hover:underline">Sign in</a>
      </p>
    </div>
    <!-- /Register -->
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
