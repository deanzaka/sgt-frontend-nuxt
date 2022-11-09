<template>
  <DevicesTable />
</template>

<script>
import DevicesTable from '~/components/DevicesTable.vue'
import { mapActions } from 'vuex'
import { TOGGLE_DASHBOARD } from '~/utils/constants'

export default {
  components: {
    DevicesTable
  },
  methods: {
    ...mapActions('authentications', [TOGGLE_DASHBOARD])
  },
  async mounted() {
    await this[TOGGLE_DASHBOARD](false)
  },
}

</script>

<style>

</style>