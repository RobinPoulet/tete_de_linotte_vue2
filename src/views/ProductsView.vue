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
import { mapState } from 'vuex'
import ProductList from "@/components/ProductList.vue";

export default {
    name: "ProductsView",
    components: { ProductList },
    data() {
      return {};
    },
    computed: {
      ...mapState([
        'products',
        'loading'
      ])
    },
}
</script>

<style lang="scss">
$primary-color: #4169E1;
$secondary-color: darken($primary-color, 30%);
h1 {
  transition: 1s;
  color: $secondary-color;
  font-size: 100px;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  color: deepskyblue;
}
h1:hover {
  color: $primary-color;
}

</style>