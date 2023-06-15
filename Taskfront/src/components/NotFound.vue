<template>
  <div class="flex flex-col h-screen justify-center items-center">
    <h1 class="text-4xl font-bold text-center mb-8">
      <span class="gradient-text text-9xl">Oops!</span>
    </h1>
    <p class="text-xl text-gray-900 font-bold mb-4">404 - PAGE NOT FOUND</p>
    <p class="text-l text-center mb-8 max-w-md mx-auto">
      The page you are looking for might have been removed, has its name
      changed or is temporarily unavailable.
    </p>
    <router-link
      to="/article"
      class="button bg-red-500 hover:bg-gray-900 text-white py-2 px-4 rounded-xl text-l transition duration-200"
      >GO TO HOMEPAGE</router-link
    >
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(to right, #f41b1b, #f1b910);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.button {
  box-shadow: 5px 4px 4px 4px rgba(255, 0, 0, 0.3);
}
</style>
