<template>
  <div
    class="min-h-screen antialiased px-4 py-6 flex flex-col items-center justify-center bg-gray-900"
  >

    <div class="w-full max-w-lg px-6 py-8 bg-white rounded-lg shadow-md mb-6">
      <p class="text-center px-2 py-2">
        Get set up in minutes. Let's start with your name, email address and
        password
      </p>
      <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">
        Create account
      </h2>
      <form class="flex flex-col space-y-4" @submit.prevent="addUser">
        <label class=""> First Name </label>
        <div class="relative">
          <input
            id="first_name"
            type="text"
            v-model="first_name"
            placeholder="First Name"
            class="w-full px-4 py-2 rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500 outline outline-offset-2 outline-3"
            required
          />
        </div>
        <label class=""> Last Name </label>
        <div class="relative">
          <input
            id="last_name"
            type="text"
            v-model="last_name"
            placeholder="Last Name"
            class="w-full px-4 py-2 rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500 outline outline-offset-2 outline-2"
            required
          />
        </div>
        <label class=""> Email </label>
        <div class="relative">
          <input
            id="email"
            type="email"
            v-model="email"
            placeholder="Email"
            class="w-full px-4 py-2 rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500 outline outline-offset-2 outline-2"
            required
          />
        </div>
        <label class=""> Password </label>
        <p
          class="text-xs px-4 py-2 text-center bg-gray-300 rounded border-gray-300"
        >
          Your password must be at least 7 characters long and should contain at
          least one letter, one number and a special character.
        </p>

        <div class="relative">
          <input
            id="password"
            type="password"
            v-model="password"
            placeholder="Password"
            class="w-full px-4 py-2 rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500 outline outline-offset-2 outline-2"
            required
          />
        </div>
        <button
          type="submit"
          class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-4 focus:shadow-outline"
        >
          Sign Up
        </button>
        <p class="text-red-500 text-center text-sm">{{ error }}</p>
        <div
          v-if="showSuccessMessage"
          class="bg-green-200 text-green-700 text-center py-2 rounded"
        >
          Success Please check your email and verify your account!
        </div>
        <div class="flex justify-center">
          <router-link
            to="/login"
            class="mt-4 text-blue-500 hover:text-blue-700 font-semibold text-sm"
          >
            Already have an account? Login
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { AddUserService } from "../service/user.service";

export default {
  components: {},
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      error: "",
      showSuccessMessage: "",
    };
  },
  methods: {
    addUser() {
      AddUserService.addUser(
        this.first_name,
        this.last_name,
        this.email,
        this.password
      )
        .then((response) => {
          this.showSuccessMessage = "User successfully added!";
          setTimeout(() => {
            location.reload();
          }, 1200);
        })
        .catch((error) => {
          this.error = error;
          this.refreshError();
        });
    },
    refreshError() {
      setTimeout(() => {
        this.error = "";
      }, 1000);
    },
  },
};
</script>

