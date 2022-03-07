<template>
  <div>
    <h1 class="text-center">Подкатегории</h1>
    <v-card class="card-style" v-for="category in sub_categories" :key="category.id" style="max-width: 1000px">
      <div class="mr-4">{{category.id}}</div>
      <v-text-field style="width: 20%" class="mr-4" v-model="category.name"></v-text-field>
      <v-select style="width: 30%" class="mr-4" :items="categories" v-model="category.category_id" label="Категория" item-text="name" item-value="id"></v-select>
      <v-btn class="mr-4" @click="() => edit(category.id, category.name, category.category_id)">сохранить</v-btn>
      <v-btn @click="() => remove(category.id)">удалить</v-btn>
    </v-card>
    <v-card class="card-style" style="max-width: 1000px">
      <div class="mr-4"></div>
      <v-text-field class="mr-4" v-model="newName"></v-text-field>
      <v-select class="mr-4" :items="categories" v-model="subCategory" label="Категория" item-text="name" item-value="id"></v-select>
      <v-btn @click="() => add(newName, subCategory)">добавить</v-btn>
    </v-card>
  </div>
</template>

<script>
import {getSubCategory, getCategory, editSubCategory, addSubCategory, removeSubCategory} from "../api";
export default {
  data() {
    return {
      sub_categories: [],
      categories: [],
      newName: '',
      subCategory: 1
    }
  },
  methods: {
    async add(name, categoryId) {
      await addSubCategory(name, categoryId)
      const {data} = await getSubCategory()
      this.sub_categories = data
      this.newName = ''
    },
    async edit(id, name, categoryId) {
      await editSubCategory(id, name, categoryId)
    },
    async remove(id) {
      try {
        await removeSubCategory(id)
        const {data} = await getSubCategory()
        this.sub_categories = data
      } catch (e) {
        this.$toast(e.response.data);
      }
    }
  },
  async created() {
    const {data} = await getSubCategory()
    const {data: categories} = await getCategory()
    this.sub_categories =  data
    this.categories = categories
  }
}
</script>
