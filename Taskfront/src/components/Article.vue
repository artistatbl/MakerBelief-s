<template>
 <div>
  <Header></Header>

  <h1 class="text-center mt-4 mb-5 text-gray-900 font-bold text-3xl">
    Today's Articles
  </h1>

  <em v-if="loading" class="text-red-500">Loading articles...</em>

 
     <div class="bg-white border border-gray-300 mt-5 rounded-xl shadow-m py-5 px-5 max-w-1xl m-auto">
      <div class="scrollable-grid">
        <div class="flex flex-wrap grid grid-cols-1 gap-4">
          <router-link
            v-for="article in articles"
            :key="article.article_id"
            :to="'/articleView/' + article.article_id"
            class="flex items-center rounded-md hover:bg-gray-100 shadow-md p-4 m-1"
          >
            <span class="text-red-500 font-bold mr-3">by {{ article.author }}</span>
            <span class="text-gray-900">{{ article.title }}</span>
          </router-link>
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