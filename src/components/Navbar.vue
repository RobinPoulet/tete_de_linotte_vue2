<template>
  <div>
    <v-toolbar
      dark
      prominent
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon
            v-bind="attrs"
            v-on="on"
          ></v-app-bar-nav-icon>
        </template>
        <v-list>
          <v-list-item
            v-for="(routerLink, index) in routerLinks"
            :key="index"
          >
            <router-link 
            :to="routerLink.path"
            >
              <v-list-item-title> {{ routerLink.name }}</v-list-item-title>
            </router-link>
          </v-list-item>
        </v-list>
      </v-menu>
     

      <v-toolbar-title></v-toolbar-title>

      <v-spacer></v-spacer>

      <Popup :popup-mode="popupMode">
        <component :is="popupMode" slot="body"></component>
      </Popup>
    </v-toolbar>
  </div>
 
</template>
  
<script>
import { mapActions, mapGetters } from 'vuex'
import Popup from './Popup.vue';
import Login from './_Popup/Login.vue';
import Signup from './_Popup/Signup.vue';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Navbar",
    components: { Popup, Login, Signup },
    data: () => ({
        routerLinks: [
            { name: "Home", path: "/", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
            { name: "About", path: "/about", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
            { name: "Products", path: "/products", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
            { name: "Admin", path: "/admin", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." }
        ],
        dialog: false,
        notifications: false,
    }),
    methods: {
        ...mapActions({
            show: "show"
        })
    },
    computed: {
        ...mapGetters({
            popupMode: "getMode"
        }),
       
    },
}
</script>

<style>
/* Helper classes */
.basil {
  background-color: rgb(42, 12, 162) !important;
}
.basil--text {
  color: #35495e !important;
}
</style>
  