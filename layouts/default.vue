<template>
  <v-container>
    <AppHeader />
    <nuxt />
  </v-container>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue'
export default {
  components: {
    AppHeader
  }
}
</script>
