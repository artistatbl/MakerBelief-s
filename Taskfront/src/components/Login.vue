<template>
  <label class="block">
    <form @submit.prevent="handleSubmit">
      
      <div
        class="min-h-screen bg-gray-900 text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:py-12 text-center bg-gray-900"
        style="
          background-image: url('bg.jpeg');
          background-size: cover;
          background-position: center;
        "
      >
        <div
          class="relative py-5 sm:max-w-xl mx-auto text-center w-full max-w-sm"
        >
          <div class="relative mt-5 py-5 bg-white shadow-md sm:rounded-lg text-left">
            <div class="bg-blue-900 rounded-l"></div>

            <!-- Logo -->
            <!-- Logo with margin -->

            <img
              src="logo.png"
              alt="Logo"
              class="mx-auto my-4 mt-2 mb-4 w-20 h-20"
            />
            

            <div class="py-6 px-8">
              <h2 class="text-gray-900 text-center text-3xl font-mono mb-6">
                Hello
              </h2>
              <h3 class="text-gray-900 text-l text-center font-mono">
                Welcome to Makers Belief's
              </h3>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="bi bi-person-fill"></i>
                  </span>
                </div>
                <input
                  type="email"
                  name="email"
                  v-model="email"
                  placeholder="Enter Email"
                  class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-blue-600 rounded-md"
                  required
                />
              </div>
              <div
                class="text-red-600 grid grid-cols-1 place-items-center"
                v-show="submitted && !password"
              >
                Password is required
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="bi bi-lock-fill"></i>
                  </span>
                </div>
                <input
                  type="password"
                  name="password"
                  v-model="password"
                  placeholder="Enter Password"
                  class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-blue-600 rounded-md"
                />
              </div>
              <button
                class="mt-4 bg-blue-900 text-white py-2 px-10 rounded-lg w-full max-w-sm relative py-3 sm:max-w-xl mx-auto font-mono"
              >
                Login
              </button>
              <div class="flex justify-between mt-4">
                <button
                  class="text-white hover:text-blue-700 font-semibold font-mono mt-2 bg-blue-900 rounded-l py-2 px-5 text-sm mr-2"
                  @click="$router.push('/signup')"
                >
                  Sign Up
                </button>
                <router-link
                  to="/forgot-password"
                  class="text-gray-900 hover:text-blue-700 font-semibold font-mono mt-5 text-sm"
                  style="margin-left: auto"
                >
                  Forgot password?
                </router-link>
              </div>
              <div
                class="text-red-600 grid grid-cols-1 place-items-center"
                v-if="error"
              >
                {{ error }}
             
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </label>
</template>



 <script>
import EmailValidator from "email-validator";
import Button from "./Button.vue";

import { usersService } from "../service/login.service";

export default {
  components: { 
   Button,
  },
  data() {
    return {
      
      email: "",
      password: "",
      submitted: false,
      loading: true,
      error: "",
    };
  },
  methods: {
    handleSubmit(e) {
      this.submitted = true;
      this.error = "";
      const { email, password } = this;

      if (!(email && password)) {
        return;
      }

      if (!EmailValidator.validate(email)) {
        this.error = "Email must be a valid email.";
        return;
      }
      const password_pattern = /^(?=(.*[a-z]))(?=(.*[A-Z]))/;
      if (!password_pattern.test(password)) {
        this.error = "Invalid Password.";
        return;
      }

      usersService
        .login(email, password)
        .then((result) => {
          console.log(result, "Auth - go to dash");
          this.$router.push("/Dashboard");
        })
        .catch((error) => {
          this.error = error;
          this.loading = false;
          this.refreshError();
        });
    },
    refreshError(){
      setTimeout(()=>{
        this.error = "";
      }, 1000);
    }
  },
};
</script>




 