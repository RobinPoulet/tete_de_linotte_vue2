<template>
    <div class="admin">
        <v-container fluid>
            <v-row>
                <v-col cols="12" md="2">
                    <AdminLeftBar />
                </v-col>
                <v-col cols="12" md="10">
                   <router-view></router-view>
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
}
</script>

<style>
</style>