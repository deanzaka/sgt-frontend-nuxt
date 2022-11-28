<template>
  <v-container fluid :class="['font-display']">
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

<style>

.font-display {
  font-family: 'Inter', sans-serif;
}

</style>
