<template>
  <div class="product" style="margin-top: 8%; margin-left: 4%; margin-bottom: 6%">
    <v-card
      class="mx-auto"
      max-width="344"
    >
      <v-img
        v-if="product.imageUrl"
        :src="product.imageUrl"
        height="344px"
        width="344px"
      ></v-img>

      <v-card-title>
        {{ product.name }}
      </v-card-title>

      <v-card-subtitle>
        <div
          v-if="product.inStock" 
          class="text-center"
        >
          <div class="my-2">
            <v-btn
                rounded
                x-small
                style="background-color: green;color: white;font-weight: 400;"
            >Disponible</v-btn>
          </div>
        </div>
        <div
          v-else 
          class="text-center"
        >
          <div class="my-2">
            <v-btn
              rounded
              x-small
              style="background-color: red;color: white;font-weight: 400;"
            >Pas de stock</v-btn>
          </div>
        </div>
        <div>Prix : {{ product.price }} € </div>
        <div>{{ product.description }}</div>
      </v-card-subtitle>

      <v-spacer></v-spacer>
        <div class="text-center" style="margin-bottom:20px;">
          <v-btn
            rounded
            color="success"
            dark
          >
            Ajouter au panier
          </v-btn>
        </div>
    </v-card>
  </div>
</template>

<script>

export default {
  name: 'ProductView',
  props: {
    id: String,
    product: Object
  },
  data: () => ({
      show: false,
  }),
}
</script>