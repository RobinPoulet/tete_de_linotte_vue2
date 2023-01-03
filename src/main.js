import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import VueToastr from "vue-toastr";
import VueSwal from 'vue-swal'
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


Vue.use(VueToastr, {
  defaultProgressBar: false,
  defaultTimeout: 4000,
  defaultCloseOnHover: false,
  defaultPosition: "toast-top-left",
  defaultClassNames: ["animated", "zoomInUp"]
});

Vue.use(VueSwal);

Vue.config.productionTip = false

const app = initializeApp({
  apiKey: "AIzaSyB7bnuaWRXVG11cHa8ZvJ8-EiBGCzvuzB4",
  authDomain: "vue-upload-7fdac.firebaseapp.com",
  projectId: "vue-upload-7fdac",
  storageBucket: "vue-upload-7fdac.appspot.com",
  messagingSenderId: "761381133723",
  appId: "1:761381133723:web:3eb233762f961dc728953e"
});

getStorage(app);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
