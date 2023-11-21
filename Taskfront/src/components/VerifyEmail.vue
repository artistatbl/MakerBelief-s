<template>
  <div class="flex flex-col items-center text-center justify-center h-screen">
	  <div class= "bg-white border border-gray-300 shadow-lg rounded p-10">
    <h1 class="text-xl font-bold mb-4">Verify Your Email</h1>
    <p class="text-gray-600 mb-6">Click the button below to verify your email:</p>
    <button class="btn-verify" @click="verifyEmail">Verify Email</button>
    <p v-if="verificationStatus">{{ verificationStatus }}</p>
  </div>
  </div>
</template>

<script>
import { emailService } from "../service/email.service";

export default {
  data() {
    return {
      verificationStatus: "", // Initialize the verification status message
    };
  },
  methods: {
    verifyEmail() {
      const verificationToken = this.$route.params.verificationToken;
      emailService.verifyEmail(verificationToken)
        .then(() => {
          this.verificationStatus = "Email verification successful";
        })
        .catch((error) => {
          this.verificationStatus = "" + error.message;
        });
    },
  },
};
</script>

<style scoped>
</style>
