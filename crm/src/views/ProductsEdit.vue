<template>
  <div>
    <div class="d-flex align-center">
      <span>нет наскладе</span>
      <v-switch
        v-model="product.in_stock"
        class="mx-4"
      ></v-switch>
      <span>в наличии</span>
    </div>
    <v-text-field class="mr-4" v-model="product.name" label="название статьи"></v-text-field>
    <v-file-input
      chips
      v-model="file"
      accept="image/*"
      truncate-length="15"
      label="главное фото"
    ></v-file-input>
    <img :src="mainPhotoUrl" alt="alt" width="250"  class="d-block" style="border: 1px solid black; margin: auto"/>
    <v-select class="mr-4" :items="subCategory" v-model="product.sub_category_id" label="Подкатегория" item-text="name" item-value="id"></v-select>
    <v-select class="mr-4" :items="brands" v-model="product.brand_id" label="Бренд" item-text="name" item-value="id"></v-select>
    <v-select class="mr-4" :items="styles" v-model="product.style_id" label="Стиль" item-text="name" item-value="id"></v-select>
    <v-text-field class="mr-4" v-model="product.price" label="Цена" type="number"></v-text-field>
    <v-text-field class="mr-4" v-model="product.last_price" label="Предыдущая цена" type="number"></v-text-field>
    <v-text-field class="mr-4" v-model="product.size" label="Размер"></v-text-field>
    <v-file-input
      chips
      v-model="files"
      multiple
      accept="image/*"
      truncate-length="15"
      label="фотки под статьёй"
    ></v-file-input>
    <div class="d-flex" style="overflow: scroll">
      <div v-for="oneFile in files" :key="oneFile.name">
        <v-btn @click="removeLocalPhoto(oneFile)">x</v-btn>
        <img
          :src="createUrl(oneFile)"
          alt="alt"
          class="d-block"
          style="border: 1px solid black; margin: auto; max-width: 250px"
        />
      </div>
      <div v-for="photo in product.photos" :key="photo">
        <v-btn @click="removeServerPhoto(photo)">x</v-btn>
        <img
          :src="baseImgURL + photo"
          :alt="photo"
          class="d-block"
          style="border: 1px solid black; margin: auto; max-width: 250px"/>
      </div>
    </div>
    <wysiwyg v-model="product.description" />
    <v-btn @click="submit">Сохранить</v-btn>
  </div>
</template>

<script>
import {getProduct, baseImgURL, getSubCategory, getBrands, getStyles, editProducts} from "../api";
import router from "../router";

export default {
  data() {
    return {
      product: {},
      file: null,
      files: [],
      removedPhotos: [],
      subCategory: [],
      brands: [],
      styles: [],
      baseImgURL
    }
  },
  methods: {
    createUrl(blob) {
      return URL.createObjectURL(blob);
    },
    removeServerPhoto(photo) {
      this.removedPhotos.push(photo)
      this.product.photos.splice(this.product.photos.findIndex((item) => item === photo), 1)
    },
    removeLocalPhoto(photo) {
      this.files.splice(this.files.findIndex((item) => item === photo), 1)
    },
    async submit() {
      const formDataMain = new FormData();
      if (this.files.length !== 0) {
        this.files.forEach((item) => {
          formDataMain.append('files', item)
        })
      } else {
        formDataMain.append('files', null)
      }


      if (this.file) {
        formDataMain.append('file', this.file)
      } else {
        formDataMain.append('file', null)
      }


      formDataMain.append('data', JSON.stringify({
        id: this.product.id,
        name: this.product.name,
        description: this.product.description,
        in_stock: this.product.in_stock,
        removedPhotos: this.removedPhotos,
        sub_category_id: this.product.sub_category_id,
        brand_id: this.product.brand_id,
        style_id: this.product.style_id,
        price: this.product.price,
        last_price: this.product.last_price,
        size: this.product.size,
      }))


      await editProducts(formDataMain)
      await router.push(`/products`)
    }
  },
  computed: {
    mainPhotoUrl() {
      if (this.file) {
        return this.createUrl(this.file)
      } else {
        return baseImgURL + this.product.main_photo
      }
    }
  },
  async created() {
    const {data: subCategory} = await getSubCategory()
    const {data} = await getProduct(this.$route.params.id)
    const {data: brands} = await getBrands()
    const {data: styles} = await getStyles()
    this.product = data
    this.styles = styles
    this.subCategory = subCategory.map(({name, id, category_name}) => ({id: id, name: `${id} ${category_name} > ${name}`}))
    this.brands = brands
  }
}
</script>
