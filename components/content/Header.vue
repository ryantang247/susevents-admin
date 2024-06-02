<template>
  <v-toolbar :color="'deep-purple accent-4'" dark>
    <v-toolbar-title class="custom-title-font">SUSEvents Administrator Website</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>
        <NuxtLink to="/">
        Login
        </NuxtLink>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<style scoped>
.custom-title-font {
  font-family: 'Impact', sans-serif; /* Replace 'Your Font Name' with your desired font */
  /* Add any other font styling as needed */
}
</style>
<script setup lang="ts">
</script>