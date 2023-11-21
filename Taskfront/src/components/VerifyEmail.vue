<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="bg-white rounded p-10 flex flex-col items-center">
      <div class="flex items-center justify-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 text-green-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 0a10 10 0 110 20 10 10 0 010-20zm4.95 7.293l-7 7-4.5-4.5a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l8-8a1 1 0 10-1.414-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
        Verify Your Email
      </h1>

      <p class="text-gray-600 mb-6 text-center md:text-left">
       Please verify this email address by clicking button below
      </p>
      <button
        class="inline-block px-4 py-2 text-white bg-blue-900 rounded hover:bg-blue-700 mx-auto"
        @click="verifyEmail"
      >
        Verify Email
      </button>
      <br />
      <br />
      <!-- <p v-if="verificationStatus">{{ verificationStatus }}</p> -->
    </div>

    <!-- Toast Notification -->
    <div v-if="showToast" :class="['toast', toastType]">
      {{ toastMessage }}
    </div>
  </div>
</template>


<script>
import { emailService } from "../service/email.service";

export default {
  data() {
    return {
      showToast: false,
      toastMessage: "",
      toastType: "",
    };
  },
  methods: {
    verifyEmail() {
      const verificationToken = this.$route.params.verificationToken;
      emailService
        .verifyEmail(verificationToken)
        .then(() => {
          this.toastMessage = "Email verification successful";
          this.toastType = "success";
        })
        .catch((error) => {
          this.toastMessage = "Email verification failed";
          this.toastType = "error";
        })
        .finally(() => {
          this.showToast = true;
          setTimeout(() => {
            this.showToast = false;
          }, 3000);
        });
    },
  },
};
</script>

<style scoped>
<<<<<<< HEAD
=======
.toast {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
}
.toast.success {
  background-color: #2ecc71; /* Green background for success */
}

.toast.error {
  background-color: #e74c3c; /* Red background for error */
}
>>>>>>> dec6c16caf9a7f7fdeb9da9eeeaee93cca0878bf
</style>
