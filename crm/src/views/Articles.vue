<template>
  <div>
    <h1 class="text-center">Новости/Объекты</h1>
    <v-card class="cursor-pointer card-style" v-for="article in articles" :key="article.id" @click="() => edit(article.id)">
      <div class="mr-4">{{article.id}}</div>
      <div class="mr-4" style="width: 100%">{{article.name}}</div>
      <v-btn @click.stop="() => remove(article.id)">удалить</v-btn>
    </v-card>
    <v-btn class="ma-auto d-block" @click="add">Новая статья</v-btn>
  </div>
</template>

<script>
import {getNews, removeArticle} from "../api";
import router from '../router/index.js'
export default {
  data() {
    return {
      articles: [],
      newName: ''
    }
  },
  methods: {
    async edit(id) {
      router.push(`/articles/${id}`)
    },
    add() {
      router.push(`/add-articles`)
    },
    async remove(id) {
      try {
        await removeArticle(id)
        const {data} = await getNews()
        this.articles = data
      } catch (e) {
        this.$toast(e.response.data);
      }
    }
  },
  async created() {
    const {data} = await getNews()
    this.articles = data
  }
}
</script>
