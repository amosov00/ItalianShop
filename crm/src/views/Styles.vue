<template>
  <div>
    <h1 class="text-center">Стили</h1>
    <v-card class="card-style" v-for="style in styles" :key="style.id">
      <div class="mr-4">{{style.id}}</div>
      <v-text-field class="mr-4" v-model="style.name"></v-text-field>
      <v-btn class="mr-4" @click="() => edit(style.id, style.name)">сохранить</v-btn>
      <v-btn @click="() => remove(style.id)">удалить</v-btn>
    </v-card>
    <v-card class="card-style">
      <div class="mr-4"></div>
      <v-text-field class="mr-4" v-model="newName"></v-text-field>
      <v-btn @click="() => add(newName)">добавить</v-btn>
    </v-card>
  </div>
</template>

<script>
import {getStyles, editStyle, removeStyle, addStyle} from "../api";
  export default {
    data() {
      return {
        styles: [],
        newName: ''
      }
    },
    methods: {
      async add(name) {
        await addStyle(name)
        const {data} = await getStyles()
        this.styles =  data
        this.newName = ''
      },
      async edit(id, name) {
        await editStyle(id, name)
      },
      async remove(id) {
        try {
          await removeStyle(id)
          const {data} = await getStyles()
          this.styles =  data
        } catch (e) {
          this.$toast(e.response.data);
        }
      }
    },
    async created() {
      const {data} = await getStyles()
      this.styles =  data
    }
  }
</script>
