<template>
  <v-container>
    <Joke v-for="joke in jokes" :key="joke.id" :id="joke.id" :joke="joke.joke"/>
  </v-container>
</template>

<script>
import Joke from '~/components/Joke';

export default {
  components: {
    Joke
  },
  data() {
    return {
      jokes : []
    }
  },
  async created() {
    const config = {
      headers: {
        'Accept': 'application/json'
      }
    }

    try {
      const res = await $axios.$get('https://icanhazdadjoke.com/search', config);
      this.jokes = res.data.results;
    } catch (error) {
      console.log(error)
    }
  },
  head() {
    return {
      title: 'Jokes',
      meta: [
        {
          hid: 'jokes',
          name: 'jokes',
          content: 'Jokes page'
        }
      ]
    }
  }
}
</script>

<style>

</style>