<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
}

@media (max-width: 500px) {
  .user-list {
    font-size: 0.7rem;
  }
}
</style>
