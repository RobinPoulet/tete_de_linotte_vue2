<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="text-center">
    <v-dialog
          v-model="dialog"
          width="50%"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
          icon
          v-bind="attrs"
          v-on="on"
          @click="showPopup"
        >
          <v-icon>mdi-account-box</v-icon>
        </v-btn>
          <p class="mt-3">Se connecter</p>
      </template> 

      <v-btn @click="closeDialog">
        Close
      </v-btn>
      
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ popupMode }}
        </v-card-title>
        <slot name="body" />
        

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <div v-if="popupMode === 'Login'">
          <p>Pas encore inscris ? </p>
          <v-btn
            class="ma-2"
            color="success"
            @click="signup('Signup')"
          >Je m'inscris</v-btn> 
        </div>
        <div v-else>
          <p>Déjà inscrit ? </p>
          <v-btn
            class="ma-2"
            color="success"
            @click="login('Login')"
          >Je me connecte</v-btn> 
        </div>
        </v-card-actions>
      </v-card>
        </v-dialog> 
  </div>      
</template>
  
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
// eslint-disable-next-line vue/multi-word-component-names
  name: 'Popup',
  props: {
    popupMode: {
      type: String,
      required: true
    }
  }, 
  data () {
    return {
      dialog: false,
      notifications: false,
    }
  },
  computed: {
    ...mapGetters({
      isVisible: 'isVisible',
    })
  },
  methods: {
    ...mapActions({
      close: 'hide',
      signup: 'changeMode',
      login: 'changeMode',
      showPopup: 'show',
    }),
    closeDialog() {
      this.dialog = false;
    }
  },
  watch: {
    isVisible: function (val) {
      console.log(val)
      this.dialog = val;
    }
  }
}
</script>
  
