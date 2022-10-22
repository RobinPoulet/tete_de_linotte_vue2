<template>
  <div class="products">
    <h1>This is products page</h1>
      <div v-if="loading">
        ...
      </div>
      <div v-else>
        <v-container fluid>
          <v-card
            class="mx-auto"
            max-width="450"
          >
          <v-list three-line>
            <v-list-item v-for="product in products" :key="product.title">
              <v-list-item-avatar v-show="product.imageUrl">
                <v-img :src="product.imageUrl"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ product.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ product.description }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon>
                  <router-link :to="{
                        name: 'product',
                        params: { 
                            id: product._id, 
                            product: product
                            }
                        }"
                        style="text-decoration: none; color: inherit;"
                    >
                    <v-icon color="grey lighten-1">mdi-eye</v-icon> 
                  </router-link>
                  
                </v-btn>
              </v-list-item-action>
            </v-list-item>    
           </v-list> 
          </v-card>
        </v-container>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "ProductsView",
    data() {
      return {};
    },
    computed: {
      ...mapGetters({
        products: 'getAllProducts',
        loading: 'isLoading'
      })
    },
}
</script>

<style>

  .products{
    margin-top: 10%;
    margin-left: 4%;
  }
</style>