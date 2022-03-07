<template>
  <div>
    <v-text-field class="mr-4" v-model="brand.title" label="название статьи"></v-text-field>
    <v-file-input
      chips
      v-model="file"
      accept="image/*"
      truncate-length="15"
      label="главное фото"
    ></v-file-input>
    <img :src="mainPhotoUrl" alt="alt" width="250"  class="d-block" style="border: 1px solid black; margin: auto"/>
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
      <div v-for="photo in brand.photos" :key="photo">
        <v-btn @click="removeServerPhoto(photo)">x</v-btn>
        <img
          :src="baseImgURL + photo"
          :alt="photo"
          class="d-block"
          style="border: 1px solid black; margin: auto; max-width: 250px"/>
      </div>
    </div>
    <wysiwyg v-model="brand.body" />
    <v-btn @click="submit">Сохранитьб</v-btn>
  </div>
</template>

<script>
import {getBrand, baseImgURL, editBrand} from "../api";
import router from "../router";

export default {
  data() {
    return {
      brand: {},
      file: null,
      files: [],
      removedPhotos: [],
      baseImgURL
    }
  },
  methods: {
    createUrl(blob) {
      return URL.createObjectURL(blob);
    },
    removeServerPhoto(photo) {
      this.removedPhotos.push(photo)
      this.brand.photos.splice(this.brand.photos.findIndex((item) => item === photo), 1)
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
        id: this.brand.id,
        title: this.brand.title,
        body: this.brand.body,
        removedPhotos: this.removedPhotos,
      }))


      await editBrand(formDataMain)
      router.push(`/brands`)
    }
  },
  computed: {
    mainPhotoUrl() {
      if (this.file) {
        return this.createUrl(this.file)
      } else {
        return baseImgURL + this.brand.main_photo
      }
    }
  },
  async created() {
    const {data} = await getBrand(this.$route.params.id)
    this.brand = data
  }
}
</script>

<style scoped>

</style>