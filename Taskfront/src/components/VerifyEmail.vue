<template>
  <div class="flex items-center justify-center h-screen mx-auto text-center ">
    <div class="box bg-white border border-gray-300 shadow-lg rounded p-14 mx-auto">
      <h1 class="text-xl font-bold mb-4 ">Verify Your Email</h1>
      <p class="text-gray-600 mb-6 ">
        Click the button below to verify your email
      </p>
      <a
        :href="verificationLink"
        class="inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 mx-auto"
        >Verify Email</a
      >
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
      emailService
        .verifyEmail(verificationToken)
        .then(() => {
          this.verificationStatus = "Email verification successful";
        })
        .catch((error) => {
          this.verificationStatus =
            "Email verification failed: " + error.message;
        });
    },
  },
};
</script>

<style>

</style>