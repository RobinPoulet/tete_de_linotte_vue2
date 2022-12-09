<template>
 
  <v-navigation-drawer permanent>
    <h3 style="text-align:center;">Admin</h3>
        <v-list
          nav
          dense
        >
          <v-list-item-group
            v-model="selectedItem"
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
      </v-navigation-drawer>
</template>

<script>
export default {
    name: "AdminNavBar",
    data: () => ({
      selectedItem: 0,
      items: [
        { text: 'Product', icon: 'mdi-clock', routerLinkName: 'productList' },
        { text: 'Category', icon: 'mdi-account', routerLinkName: 'categoryList'}
      ],
    }),
}
</script>