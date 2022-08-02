import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import VueToastr from "vue-toastr";
import VueSwal from 'vue-swal'

Vue.use(VueToastr, {
  defaultProgressBar: false,
  defaultTimeout: 4000,
  defaultCloseOnHover: false,
  defaultPosition: "toast-top-left",
  defaultClassNames: ["animated", "zoomInUp"]
});

Vue.use(VueSwal);

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
