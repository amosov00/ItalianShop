<template>
  <div>
    <h1 class="text-center">Товары</h1>
    <v-text-field :value="text" @input="find"/>
    <v-pagination
      @input="changePage"
      :value="page"
      :length="pageCount"
      :total-visible="7"
    ></v-pagination>
        <v-card class="card-style" v-for="product in products" :key="product.id" style="max-width: 1000px" @click="() => edit(product.id)">
          <div class="mr-4">{{product.id}}</div>
          <img :src="baseImgURL + product.main_photo" width="70" alt="alt">
          <v-text-field class="mr-4" :value="product.name" :disabled="true"></v-text-field>
          <v-text-field class="mr-4" :value="product.brand_name" :disabled="true"></v-text-field>
          <v-btn class="mr-4" @click.stop="() => remove(product.id)">удалить</v-btn>
        </v-card>
    <v-pagination
      @input="changePage"
      :value="page"
      :length="pageCount"
      :total-visible="7"
    ></v-pagination>
    <v-btn class="ma-auto d-block" @click="add">Новый товар</v-btn>
  </div>
</template>

<script>
import {getProducts, removeProduct} from "../api";
import {baseImgURL} from '../api';
import router from "../router";

export default {
  data() {
    return {
      products: [],
      page: 1,
      text: '',
      pageCount: 0,
      baseImgURL
    }
  },
  methods: {
    async remove(id) {
      await removeProduct(id)
      const {data: {data, pageCount}} = await getProducts({page: this.page, text: this.text})
      this.products = data
      this.pageCount = pageCount
    },
    edit(id) {
      router.push(`/products/${id}`)
    },
    add() {
      router.push(`/add-products`)
    },
    async find(payload) {
      this.text = payload
      this.page = 1
      const {data: {data, pageCount}} = await getProducts({page: 1, text: this.text})
      this.products = data
      this.pageCount = pageCount
    },
    async changePage(payload) {
      this.page = payload
      const {data: {data}} = await getProducts({page: payload, text: this.text})
      this.products =  data
    }
  },
  async created() {
    const {data: {data, pageCount}} = await getProducts({page: 1})
    this.products =  data
    this.pageCount = pageCount
  }
}
</script>
