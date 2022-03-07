<template>
  <div>
    <h1 class="text-center">Категории</h1>
    <v-card class="card-style" v-for="category in categories" :key="category.id">
      <div class="mr-4">{{category.id}}</div>
      <v-text-field class="mr-4" v-model="category.name"></v-text-field>
      <v-btn class="mr-4" @click="() => edit(category.id, category.name)">сохранить</v-btn>
      <v-btn @click="() => remove(category.id)">удалить</v-btn>
    </v-card>
    <v-card class="card-style">
      <div class="mr-4"></div>
      <v-text-field class="mr-4" v-model="newName"></v-text-field>
      <v-btn @click="() => add(newName)">добавить</v-btn>
    </v-card>
  </div>
</template>

<script>
import {getCategory, editCategory, removeCategory, addCategory} from "../api";
export default {
  data() {
    return {
      categories: [],
      newName: ''
    }
  },
  methods: {
    async add(name) {
      await addCategory(name)
      const {data} = await getCategory()
      this.categories =  data
      this.newName = ''
    },
    async edit(id, name) {
      await editCategory(id, name)
    },
    async remove(id) {
      try {
        await removeCategory(id)
        const {data} = await getCategory()
        this.categories =  data
      } catch (e) {
        this.$toast(e.response.data);
      }
    }
  },
  async created() {
    const {data} = await getCategory()
    this.categories =  data
  }
}
</script>
