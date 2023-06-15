<template>
  <div class="flex flex-col bg-gray-200 h-screen">
    <Header></Header>
    <div class="flex bg-white  border border-gray-300 mt-5 rounded-m shadow-m justify-center py-5 px-10 max-w-m mx-auto ">
      <h1 class="text-2xl max-sm justify-center text-center px-10 py-1.5 font-monofont-bold">
        Welcome {{ firstName }} to Dashboard
      </h1>
      <a
        v-on:click="logOut"
        class="bi bi-gear-fill text-2xl duration-200 font-sm rounded py-2 px-10 cursor-pointer"
      ></a>
    </div>
  </div>
</template>



<script>
import { logoutService } from "../service/logout.service";
import { AddUserService } from "../service/user.service";
import Header from './Header.vue';

export default {
  components: { Header },
  created() {
    let session_token = localStorage.getItem("session_token");
    if (!session_token) {
      this.$router.push("/login");
    }
  },
  computed: {
    firstName() {
      return localStorage.getItem("first_name");
    },
    lastName() {
      return localStorage.getItem("last_name");
    },
  },
  methods: {
    logOut() {
      logoutService.logOut().then(() => {
        console.log("You have been logged out");
        this.$router.push("/login");
      });
    },
    uploadProfilePicture(event) {
      const file = event.target.files[0];
      const user_id = getUserId(); // Replace with the actual user ID

      AddUserService.addProfilePicture(user_id, file)
        .then((data) => {
          console.log("Profile picture uploaded:", data);
          // Perform any additional actions or update UI
        })
        .catch((error) => {
          console.error("Error uploading profile picture:", error);
          // Handle the error or display an error message
        });
    },
  },
};
</script>


