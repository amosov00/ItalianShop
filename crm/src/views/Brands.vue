<template>
  <div>
    <h1 class="text-center">Бренды</h1>
    <v-card class="cursor-pointer card-style" v-for="brand in brands" :key="brand.id" @click="() => edit(brand.id)">
      <div class="mr-4">{{brand.id}}</div>
      <div class="mr-4" style="width: 100%">{{brand.name}}</div>
      <v-btn @click.stop="() => remove(brand.id)">удалить</v-btn>
    </v-card>
    <v-btn class="ma-auto d-block" @click="add">Новая статья</v-btn>
  </div>
</template>

<script>
import {getBrands, removeBrand} from "../api";
import router from '../router/index.js'
export default {
  data() {
    return {
      brands: [],
      newName: ''
    }
  },
  methods: {
    async edit(id) {
      router.push(`/brands/${id}`)
    },
    add() {
      router.push(`/add-brands`)
    },
    async remove(id) {
      try {
        await removeBrand(id)
        const {data} = await getBrands()
        this.brands = data
      } catch (e) {
        this.$toast(e.response.data);
      }
    }
  },
  async created() {
    const {data} = await getBrands()
    this.brands = data
  }
}
</script>
