<template>
    <div class="admin">
        <v-container fluid>
            <v-row>
                <v-col cols="12" md="2">
                    <AdminLeftBar />
                </v-col>
                <v-col cols="12" md="10">
                    <v-container v-if="isRootAdminView">
                        <p>Bienvenue sur votre interface administrateur</p>
                    </v-container>
                    <v-container v-else>
                        <h2 style="text-align:center;">{{ viewName }}</h2>
                        <router-view></router-view>
                    </v-container>   
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import AdminLeftBar from './../../components/AdminLeftBar.vue'
export default {
    name: "AdminView",
    components: {
        AdminLeftBar,
    },
    data: () => ({
        items: [
            { text: 'Product', icon: 'mdi-clock', routerLinkName: 'productList'},
            { text: 'Category', icon: 'mdi-account', routerLinkName: 'categoryList'},
        ],
    }),
    computed: {
        viewName() {
            return this.$route.name
        },
        isRootAdminView() {
            return this.$route.name === 'admin'
        }
    }
}
</script>

<style>
</style>