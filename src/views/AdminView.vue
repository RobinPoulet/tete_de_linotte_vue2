<template>
    <div class="admin">
    
        <v-btn
            depressed
            color="primary"
        >
            <router-link
                :to="{
                    name: 'productEdit',
                    params: {
                        product: null
                    }
                }"
            >
                Ajouter un produit
            </router-link>
        </v-btn>
        
        <v-simple-table
            fixed-header
            height="700px"
        >
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">
                            Name
                        </th>
                        <th class="text-left">
                            Description
                        </th>
                         <th class="text-left">
                            Price
                        </th>
                         <th class="text-left">
                            In Stock
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="product in products"
                        :key="product._id"
                    >
                        <td> 
                            <router-link 
                                :to="{
                                  name: 'product', 
                                  params: {
                                    id: product._id,
                                    product: product
                                  }
                                }"
                            > 
                                {{ product.name }} 
                            </router-link>
                        </td>
                        <td> {{ product.description }} </td>
                        <td> {{ product.price }} € </td>
                        <td> {{ product.inStock ? 'Disponible' : 'Out of Stock' }} </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: "AdminView",
    data() {
        return {
            dialog: false,
            dialogDelete: false,
            headers: [
                {
                    text: 'Name',
                    align: 'start',
                    sortable: true,
                    value: 'name',
                },
                { 
                    text: 'Price', 
                    sortable: true,
                    value: 'price' 
                },
                { 
                    text: 'Description', 
                    value: 'description' 
                },
            ],
        }
    },
    computed: {
      ...mapState([
        'products',
        'loading'
      ]),
    },
    methods: {
     getColor (price) {
        return price > 400 ? 'red' : price > 200 ? 'orange' : 'green'
      },
    },
}
</script>

<style>

.admin {
    margin: 10px;
    padding: 20px;
}

</style>