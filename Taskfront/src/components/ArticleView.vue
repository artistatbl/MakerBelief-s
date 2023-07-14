<template>
  <div class="">
    <Header />

    <em v-if="loading">Loading articles...</em>

    <h2 class="text-center font-black p-10 text-4xl">Article</h2>

    <div
      class="box-content min-h-screen tex-gray-800 antialiased px-20 py-1 flex flex-col justify-block sm:py-5"
    >
      <br />
      <div
        class="font-black font-mono shadow-2xl outline-double outline-1  p-5 py-6"
      >
        {{ article.title }}
      </div>

      <div
        class="shadow-2xl p-10 px-5 outline-double outline-1 p-4 py-10"
      >
        <div class="font-black font-serif">
          {{ "Written By:  " + article.author }}
        </div>
        <div class="font-light text-gray-900 font-serif">
          {{ "Published: " + article.date_published }}
        </div>
        <div class="font-light text-gray-900 font-serif">
          {{ "Edited: " + article.date_edited }}
        </div>
        <br>
        <div
          class="text-center sm:text-left font-light text-gray-900 font-mono"
        >
          {{ article.article_text }}
        </div>

        <div class="font-lighter text-sm text-right text-gray-600 font-mono m-5">
          {{ "Created By: " + article.created_by }}
        </div>
        <button
          class="inline-flex items-center justify-center w-40 h-10 mr-2 m-4 text-gray-100 bg-red-500 rounded-lg focus:shadow-outline hover:bg-red-700 text- bi bi-trash-fill"
          @click="deleteOne()"
        >
          Delete
        </button>

        <button
          class="inline-flex items-center justify-center w-40 h-10 mr-2 m-4 text-gray-100 bg-blue-500 rounded-lg focus:shadow-outline hover:bg-blue-700 bi bi-arrow-repeat float-right"
          @click="viewForm = true"
        >
          Update
        </button>

        <form
          v-if="viewForm"
          @submit.prevent="updateArticle"
          class="bg-gray-200 p-6 outline-double outline-2 outline-offset-2 rounded-lg shadow-md"
        >
          <label class="" for="article_text"> Title: </label>
          <input
            class="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500"
            v-model="article_text"
            type="article_text"
            id="article_text"
          />
          <label class="block text-gray-700 font-medium" for="author"
            >Author:</label
          >
          <input
            class="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500"
            v-model="author"
            type="text"
            id="author"
          />
          <label class="block text-gray-700 font-medium" for="title"
            >Article</label
          >
          <textarea
            class="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500"
            v-model="title"
            id="title"
          ></textarea>

          <button
            class="inline-flex items-center justify-center w-40 h-10 mr-2 m-4 text-gray-100 bg-blue-900 rounded-lg focus:shadow-outline hover:bg-blue-500 text-"
            @click="updateArticle()"
          >
            Update
          </button>

          <div class="font-light text-gray-900 font-serif">
            {{ "Publishedyyy: " + article.date_published }}
          </div>
        </form>
      </div>

      <br />

      <CommentList />

      <br />

      <router-link
        class="text-xl hover:text-gray-100 bg-gray-700 hover:bg-green-900 duration-200 font-sm text-white rounded py-1.5 px-10 text-center"
        to="/Article"
        >Back to Home</router-link
      >
      <p class="text-center m-5 bg-green-500 text-gray-900">
        {{ showDeleteMessage }}
      </p>
    </div>
  </div>
</template>
<script>
import { articleService } from "../service/article.service";

//import CommentList from "../pages/CommentList.vue";
import Header from "./Header.vue";

export default {
  components: { /*CommentList,*/ Header },

  data() {
    return {
      article: {},
      title: "",
      author: "",
      article_text: "",
      error: "",
      loading: "",
      status: "active",
      showDeleteMessage: "",
      viewForm: false,
    };
  },

  methods: {
    updateArticle() {
      articleService
        .updateOne(
          this.$route.params.id,
          this.title,
          this.article_text,
          this.author,
          location.reload()
        )
        .then((response) => {
          console.log(response);
        });
    },

    deleteOne() {
      articleService.deleteOne(this.$route.params.id);
      this.showDeleteMessage = "Article Deleted";
      setTimeout(() => {
        location.reload();
      }, 500);
    },
  },

  created() {
    this.article.loading = true;
    articleService
      .getOne(this.$route.params.id)
      .then((article) => {
        this.article = article;
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
</script> Ï