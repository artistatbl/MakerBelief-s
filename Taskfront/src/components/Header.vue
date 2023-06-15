<template>
  <div class="hello">
    <div
      class="
        bg-gray-900
        text-gray-100
        py-3.5
        px-6
        shadow
        
        md:flex
        justify-between
        items-center
      "
    >
      <div class="flex  items-center cursor-pointer">
        <span class="text-gray-100 text-xl mr-1">
          <i class="bi bi-kanban-fill hover:bg-red-700"></i>
        </span>

        <h1 class="text-xl">WB</h1>
      </div>

      <span
        @click="MenuOpen()"
        class="  absolute md:hidden right-8 top-1.5 cursor-pointer text-4xl"
      >
        <i
          :class="[open ? 'bi bi-x-circle-fill' : 'bi bi-filter-circle-fill']"
        ></i>
      </span>

      <ul
        class="
          md:flex md:items-center
          text-center
          md:px-0
          px-6
          md:pb-0
          pb-10
          md:static
          absolute
          bg-gray-900
          md:w-auto
          w-full
          top-14
          duration-700
          ease-in
          fixed
        "
        :class="[open ? 'left-0' : 'left-[-100%]']"
      >
        <li class="md:mx-4 md:my-0 my-6" v-for="link in Links" :key="link.id">
          <a :href="link.link" class="text-xl hover:text-green-500">{{
            link.name
          }}</a>
        </li>
        <Button> </Button>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
//import Button from "./Button.vue";
export default {
  components: {
   //Button,
  },
  data() {
    let open = ref(false);
    let Links = [
      { name: " Article", link: "Article" },
      { name: "POST Article", link: "Addarticle" },
      { name: "Profile", link: "Dashboard"}
  
    ];
    function MenuOpen() {
      open.value = !open.value;
    }
    return { Links, open, MenuOpen };
  },
};
</script>




