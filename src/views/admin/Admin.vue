<template>
    <div class="admin">

        <v-card
            class="mx-auto"
            max-width="300"
            tile
        >
            <v-list dense>
                <v-subheader>ADMIN</v-subheader>
                <v-list-item-group
                    color="primary"
                >
                    <v-list-item
                        v-for="(item, i) in items"
                        :key="i"
                    >
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <router-link
                                :to="{
                                    name: item.routerLinkName,
                                }"
                                style="text-decoration: none; color: inherit;"
                            > 
                                {{ item.text }}   
                            </router-link>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card>
        
    </div>
</template>

<script>
export default {
    name: "AdminView",
    data: () => ({
        items: [
            { text: 'Product', icon: 'mdi-clock', routerLinkName: 'productList'},
            { text: 'Category', icon: 'mdi-account', routerLinkName: 'categoryList'},
        ],
    }),
}
</script>

<style>
    .admin {
        margin-top: 8%;
        margin-bottom: 8%;
        margin-left: 4%;
    }
</style>