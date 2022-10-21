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
            max-width="1600"
            tile
          >
          <v-list-item two-line v-for="(product, index) in products" :key="index">
            <ProductList
              :product="product"
            />
          </v-list-item>
          </v-card>
        </v-container>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductList from "@/components/ProductList.vue";

export default {
    name: "ProductsView",
    components: { ProductList },
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
</style>