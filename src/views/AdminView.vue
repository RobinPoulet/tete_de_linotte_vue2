<template>
    <div class="admin">

        <div style="text-align: right; margin-bottom: 10px;">
            <v-btn>
                <router-link
                    :to="{
                        name: 'productEdit',
                        params: {
                            product: null,
                            editAction: create
                        }
                    }"
                >
                    <v-icon>mdi-archive-plus</v-icon>   
                </router-link>
                Ajouter  un produit
            </v-btn>
        </div>
         
        <v-simple-table
            fixed-header
            height="700px"
        >
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">
                        </th>
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
                        <th class="text-left">
                        </th>
                        <th class="text-left">
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
                                <v-icon
                                    color="red"
                                >
                                    mdi-account-eye
                                </v-icon>  
                            </router-link>
                        </td>
                        <td> {{ product.name }} </td>
                        <td> {{ product.description }} </td>
                        <td> {{ product.price }} € </td>
                        <td> {{ product.inStock ? 'Disponible' : 'Out of Stock' }} </td>
                        <td>
                            <router-link
                                :to="{
                                    name: 'productEdit',
                                    params: {
                                        product: product,
                                        editAction: edit
                                    }
                                }"
                            >
                                <v-icon
                                    color="blue darken-2"
                                >
                                    mdi-pencil
                                </v-icon>
                            </router-link>
                        </td>
                        <td>
                            <a 
                                href="#"
                                @click="deleteProduct(product)"
                            >
                                <v-icon
                                    color="red"
                                >
                                    mdi-delete
                                </v-icon>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios';

export default {

    name: "AdminView",

    data() {
        return {
            dialog: false,
            dialogDelete: false,
            headers: [
                {
                    text: "Name",
                    align: "start",
                    sortable: true,
                    value: "name",
                },
                {
                    text: "Price",
                    sortable: true,
                    value: "price"
                },
                {
                    text: "Description",
                    value: "description"
                },
            ],
            create: "create",
            edit: "edit"
        };
    },

    computed: {
        ...mapState([
            "products",
            "loading"
        ]),
    },

    methods: {
        deleteProduct(product) {
            axios
                .delete(`http://localhost:9000/api/product/${product._id}`)
                .then(() => {
                    this.$toastr.s(`${product.name}`, "DELETED_SUCCESSFULLY");
                    this.$store.dispatch("getProducts");
            })
                .catch(e => this.$toastr.e(`Error : ${e.message}`));
        }
    },

}
</script>

<style>

.admin {
    margin: 10px;
    padding: 20px;
}

</style>