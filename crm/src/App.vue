<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <router-link :to="'/styles'">
            <v-list-item>
              <v-list-item-title>Стили</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link :to="'/brands'">
            <v-list-item>
              <v-list-item-title>Бренды</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link :to="'/category'">
            <v-list-item>
              <v-list-item-title>Категории</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link :to="'/emails'">
            <v-list-item>
              <v-list-item-title>Почты</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link :to="'/sub-category'">
            <v-list-item>
              <v-list-item-title>Подкатегории</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link :to="'/articles'">
            <v-list-item>
              <v-list-item-title>Новости/Объекты</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link :to="'/products'">
            <v-list-item>
              <v-list-item-title>Товары</v-list-item-title>
            </v-list-item>
          </router-link>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>


    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>


<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),

  watch: {
    group () {
      console.log(process.env)
      this.drawer = false
    },
  },
}
</script>