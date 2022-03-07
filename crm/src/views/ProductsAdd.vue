<template>
  <div>
    <div class="d-flex align-center">
      <span>нет наскладе</span>
      <v-switch
        v-model="in_stock"
        class="mx-4"
      ></v-switch>
      <span>в наличии</span>
    </div>
    <v-text-field class="mr-4" v-model="name" label="название статьи"></v-text-field>
    <v-file-input
      chips
      v-model="file"
      accept="image/*"
      truncate-length="15"
      label="главное фото"
    ></v-file-input>
    <v-select class="mr-4" :items="subCategory" v-model="sub_category_id" label="Подкатегория" item-text="name" item-value="id"></v-select>
    <v-select class="mr-4" :items="brands" v-model="brand_id" label="Бренд" item-text="name" item-value="id"></v-select>
    <v-select class="mr-4" :items="styles" v-model="style_id" label="Стиль" item-text="name" item-value="id"></v-select>
    <v-text-field class="mr-4" v-model="price" label="Цена" type="number"></v-text-field>
    <v-text-field class="mr-4" v-model="last_price" label="Предыдущая цена" type="number"></v-text-field>
    <v-text-field class="mr-4" v-model="size" label="Размер"></v-text-field>
    <v-file-input
      chips
      v-model="files"
      multiple
      accept="image/*"
      truncate-length="15"
      label="фотки под статьёй"
    ></v-file-input>
    <wysiwyg v-model="description" />
    <v-btn @click="submit">Сохранить</v-btn>
  </div>
</template>

<script>
import {addProduct, getBrands, getStyles, getSubCategory} from "../api";
import router from "../router";

export default {
  data() {
    return {
      file: null,
      files: [],
      name: '',
      description: '',
      in_stock: true,
      sub_category_id: null,
      price: null,
      brand_id: null,
      style_id: null,
      last_price: null,
      size: '',
      styles: [],
      subCategory: [],
      brands: []
    }
  },
  methods: {
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
        name: this.name,
        description: this.description,
        in_stock: this.in_stock,
        sub_category_id: this.sub_category_id,
        brand_id: this.brand_id,
        style_id: this.style_id,
        price: this.price,
        last_price: this.last_price,
        size: this.size,
      }))

      await addProduct(formDataMain)
      await router.push(`/products`)
    }
  },
  async created() {
    const {data: subCategory} = await getSubCategory()
    const {data: brands} = await getBrands()
    const {data: styles} = await getStyles()
    this.styles = styles
    this.subCategory = subCategory.map(({name, id, category_name}) => ({id: id, name: `${id} ${category_name} > ${name}`}))
    this.brands = brands
  }
}
</script>