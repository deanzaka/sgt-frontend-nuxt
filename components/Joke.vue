<template>
  <v-container class="joke">
    <p>{{ joke }}</p>
  </v-container>
</template>

<script>
export default {
  name: 'Joke',
  props: ['joke', 'id']
}
</script>

<style>
</style>