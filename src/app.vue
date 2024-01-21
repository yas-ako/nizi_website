<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>
        <NuxtLink to="/">虹予報</NuxtLink>
      </v-app-bar-title>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="isMenuOpen = !isMenuOpen"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="isMenuOpen" location="right" temporary>
      <v-container>
        <v-btn variant="flat" color="info" class="my-2" to="/about">
          このサイトについて
        </v-btn>
      </v-container>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <NuxtPage />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
const isMenuOpen = ref(false);
</script>
