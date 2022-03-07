<template>
  <div>
    <div class="d-flex align-center">
      <span>Опубликовать как объект</span>
      <v-switch
        v-model="article.isnews"
        class="mx-4"
      ></v-switch>
      <span>Опубликовать как новость</span>
    </div>
    <v-text-field class="mr-4" v-model="article.title" label="название статьи"></v-text-field>
    <v-text-field class="mr-4" v-model="article.description" label="краткое описание"></v-text-field>
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
      <div v-for="photo in article.photos" :key="photo">
        <v-btn @click="removeServerPhoto(photo)">x</v-btn>
        <img
          :src="baseImgURL + photo"
          :alt="photo"
          class="d-block"
          style="border: 1px solid black; margin: auto; max-width: 250px"/>
      </div>
    </div>
    <wysiwyg v-model="article.body" />
    <v-btn @click="submit">Сохранить</v-btn>
  </div>
</template>

<script>
import {getSingleNews, baseImgURL, editNews} from "../api";
import router from "../router";

export default {
  data() {
    return {
      article: {},
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
      this.article.photos.splice(this.article.photos.findIndex((item) => item === photo), 1)
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
        id: this.article.id,
        title: this.article.title,
        body: this.article.body,
        description: this.article.description,
        isnews: this.article.isnews,
        removedPhotos: this.removedPhotos,
      }))


      await editNews(formDataMain)
      router.push(`/articles`)
    }
  },
  computed: {
    mainPhotoUrl() {
      if (this.file) {
        return this.createUrl(this.file)
      } else {
        return baseImgURL + this.article.main_photo
      }
    }
  },
  async created() {
    const {data} = await getSingleNews(this.$route.params.id)
    this.article = data
  }
}
</script>

<style scoped>

</style>