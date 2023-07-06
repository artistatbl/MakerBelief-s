<template>
  <div>
    <Header></Header>

    <h1 class="text-center mt-4 mb-5 text-gray-900 font-bold text-3xl">
      Today's Articles
    </h1>

    <em v-if="loading">Loading articles...</em>

      <div class="">
      <router-link
        v-for="article in articles"
        :key="article.article_id"
        :to="'/articleView/' + article.article_id"
        class=""
      >
          <span class="text-red-500 font-bold pl-1 pr-3"
              >by {{ article.author }}</span
            >
            <span class="">{{ article.title }}</span>
          </router-link>
    </div>
    

    <div v-if="error" class="text-red-500 mt-4">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { articleService } from "../service/article.service";
import Header from "./Header.vue";

export default {
  components: {
    Header,
  },
  data() {
    return {
      articles: [],
      error: "",
      loading: true,
    };
  },
  mounted() {
    articleService
      .getAll()
      .then((articles) => {
        this.articles = articles;
        this.loading = false;
      })
      .catch((error) => (this.error = error));
    {
      let session_token = localStorage.getItem("session_token");
      if (!session_token) {
        this.$router.push("/Login");
      }
    }
  },
};
</script>

<style>
.display {
  display: block !important;
}
.none {
  display: none !important;
}

.transform {
  transform-style: preserve-3d;
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:rotate-2:hover {
  transform: rotate(2deg);
}

.bg-white {
  background-color: #ffffff;
  /* Add your desired background color here */
}

.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  /* Add your desired shadow styles here */
}
</style>
