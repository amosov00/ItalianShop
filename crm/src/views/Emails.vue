<template>
  <div>
    <h1 class="text-center">Почты для подписки</h1>
    <v-card class="card-style" v-for="email in emails" :key="email.id" style="max-width: 1000px">
      <div class="mr-4">{{email.id}}</div>
      <v-text-field class="mr-4" :value="email.email" :disabled="true"></v-text-field>
      <v-text-field class="mr-4" :value="parseDate(email.date)" :disabled="true"></v-text-field>
      <v-btn class="mr-4" @click="() => copy(email.email)">скопировать</v-btn>
      <v-btn class="mr-4" @click="() => remove(email.id)">удалить</v-btn>
    </v-card>
  </div>
</template>

<script>
import {getEmails, removeEmail} from "../api";
import moment from 'moment'
export default {
  data() {
    return {
      emails: [],
    }
  },
  methods: {
    async remove(id) {
      await removeEmail(id)
      const {data} = await getEmails()
      this.emails =  data
    },
    parseDate(date) {
      return moment(date).format('DD MMMM YYYY')
    },
    copy(text) {
      navigator.clipboard.writeText(text)
      this.$toast('Текст скопирован')
    }
  },
  async created() {
    const {data} = await getEmails()
    this.emails =  data
  }
}
</script>
