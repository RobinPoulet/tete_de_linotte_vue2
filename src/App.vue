<template>
<v-app>

	
	<Navbar />
	
    
	<v-main>
		
		<v-container fluid>

			<router-view></router-view>
			<router-view name="helper"/>
		</v-container>
	
	</v-main>

	<Footer />

	<Popup v-show="popupVisible" :popup-mode="popupMode">
    <component :is="popupMode" slot="body"></component>
    </Popup>
</v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import Popup from './components/Popup.vue';
import Login from './components/_Popup/Login.vue';
import Signup from './components/_Popup/Signup.vue';
import { mapGetters } from 'vuex'
export default {
    name: "App",
    created() {
        this.$store.dispatch("getAllProducts"); // dispatch loading
		this.$store.dispatch("getAllCategories"); 
    },
    components: { Navbar, Footer, Popup, Login, Signup },
    computed: {
		...mapGetters ({
			popupVisible: 'isVisible',
			popupMode: 'getMode',
			apiStatus: 'apiStatus',
			apiErrors: 'getApiErrors'
		})
	},
	watch: {
		apiStatus: function (newStatus) {
			if (newStatus === 'error') {
				this.$toastr.e(`${this.apiErrors.name} : ${this.apiErrors.message}`, `${this.apiErrors.apiCall}`);
			}
		}
	}
}
</script>

