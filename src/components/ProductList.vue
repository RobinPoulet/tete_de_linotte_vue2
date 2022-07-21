<template>
    <div class="playlistmovie">
        <v-card
            class="mx-auto"
            max-width="1600"
            tile
        >
            <v-list-item
                class="mx-auto"
                max-width="1600"
                tile
            >
                <v-list-item-content>
                    <v-list-item-title>
                        <h3> {{ product.name }} </h3>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        <v-btn>
                            <router-link :to="{
                                name: 'product',
                                params: { id: product._id, product: product}
                                }"
                            >
                                Go to {{ product.name}} page 
                            </router-link>
                        </v-btn>
                    </v-list-item-subtitle>
                </v-list-item-content>
             </v-list-item>

    </v-card>


      
    </div>
</template>

<script>
export default {
  name: "PlaylistMovie",
  props: {
    product: Object
  }
}
</script>