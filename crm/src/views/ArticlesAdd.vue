<template>
  <div>
    <div class="d-flex align-center">
      <span>Опубликовать как объект</span>
      <v-switch
        v-model="isnews"
        class="mx-4"
      ></v-switch>
      <span>Опубликовать как новость</span>
    </div>
    <v-text-field class="mr-4" v-model="title" label="название статьи"></v-text-field>
    <v-text-field class="mr-4" v-model="description" label="краткое описание"></v-text-field>
    <v-file-input
      chips
      v-model="file"
      accept="image/*"
      truncate-length="15"
      label="главное фото"
    ></v-file-input>
    <v-file-input
      chips
      v-model="files"
      multiple
      accept="image/*"
      truncate-length="15"
      label="фотки под статьёй"
    ></v-file-input>
    <wysiwyg v-model="body" />
    <v-btn @click="submit">Сохранить</v-btn>
  </div>
</template>

<script>
import {addNews} from "../api";
import router from "../router";

export default {
  data() {
    return {
      file: null,
      files: [],
      title: '',
      body: '',
      isnews: true,
      description: '',
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
        title: this.title,
        body: this.body,
        isnews: this.isnews,
        description: this.description
      }))

      await addNews(formDataMain)
      await router.push(`/articles`)
    }
  },
}
</script>
