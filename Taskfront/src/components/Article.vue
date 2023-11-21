<template>
  <div>
    <Header></Header>

    <h1
      class="text-center tracking-widest mt-4 mb-5 text-gray-900 font-black text-3xl "
    >
      Today's Articles
    </h1>

    <em v-if="loading" class="text-red-500 text-center">
      Loading articles...
    </em>

    <div
      class="bg-white border  border-gray-300 mt-5 rounded-xl shadow-m py-5 px-5 max-w-6xl m-auto"
    >
      <div class="scrollable-grid">
        <div
          class="flex flex-wrap grid grid-cols-1 gap-4 border border-gray-900"
        >
        <ul class="" v-if="articles.length">
          <li 
           v-for="article in articles"
          :key="article.article_id"
          >

          <router-link
            :to="'/articleView/' + article.article_id"
            class="flex items-center rounded-xl hover:bg-gray-100 border border-gray-900 shadow-xl p-8 m-3"
          >
            <span
              class="text-red-500 font-thiner tracking-tighter mr-3 font-mono"
              >By {{ article.author }}</span
            >
            <span class="text-gray-900 font-thin tracking-wider font-mono">
              {{ article.title }}
            </span>
          </router-link>
          </li>
        </ul>
      </div>
      </div>
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

<style scoped>
.scrollable-grid {
  max-height: 400px;
  overflow-y: auto;
}
</style>