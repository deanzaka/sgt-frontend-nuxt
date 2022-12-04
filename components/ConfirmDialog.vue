<template>
  <v-dialog
    v-model="dialog"
    :max-width="options.width"
    :style="{ zIndex: options.zIndex }"
    @keydown.esc="cancel"
  >
    <v-card class="pa-2">
      <v-card-title class="text-h5" :color="options.color">
        <v-avatar size="36" :color="options.color">
          <v-icon dark>{{ options.icon }}</v-icon>
        </v-avatar>
        <v-spacer></v-spacer>
        <v-icon small @click="dialog = false"> mdi-close-thick </v-icon>

        <p style="width: 100%" class="subtitle-1 mt-2 mb-0 plain-txt">
          {{ options.title }}
        </p>
      </v-card-title>
      <v-card-text v-if="options.message" :html="options.message">
        {{ options.message }}

        <v-combobox
          v-if="options.rejection"
          :items="offerBatchRejectionRemarks"
          class="custom-select mt-2"
          placeholder="Select Rejection Reason (Mandatory)"
          prepend-inner-icon="mdi-note-edit-outline"
          required
          solo
        ></v-combobox>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-if="options.actionText1"
          class="plain-btn rounded-lg text-capitalize"
          text
          @click.native="cancel"
        >
          {{ options.actionText1 }}
        </v-btn>
        <v-btn
          v-if="options.actionText2"
          class="purple darken-1 text-capitalize"
          text
          dark
          @click.native="agree"
        >
          {{ options.actionText2 }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  data() {
    return {
      dialog: false,
      resolve: null,
      reject: null,
      options: {
        message: null,
        title: null,
        icon: 'mdi-alert',
        color: 'grey lighten-3',
        width: 420,
        zIndex: 200,
        noconfirm: false,
        rejection: false,
        actionText1: '',
        actionText2: '',
      },
    }
  },

  created() {},
  mounted() {},

  methods: {
    open(options) {
      this.dialog = true
      this.options = Object.assign(this.options, options)
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    agree() {
      this.resolve(true)
      this.dialog = false
    },
    cancel() {
      this.resolve(false)
      this.dialog = false
    },
  },
}
</script>
