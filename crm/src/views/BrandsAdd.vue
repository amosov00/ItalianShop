<template>
  <div>
    <v-text-field class="mr-4" v-model="title" label="название статьи"></v-text-field>
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
import {addBrand} from "../api";
import router from "../router";

export default {
  data() {
    return {
      file: null,
      files: [],
      title: '',
      body: '',
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
      }))

      await addBrand(formDataMain)
      router.push(`/brands`)
    }
  },
}
</script>
