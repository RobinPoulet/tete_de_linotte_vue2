<template>
    <div class="admin" style="margin-top: 8%;">

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
                    style="text-decoration: none; color: inherit;"
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
                        <th class="text-left"></th>
                        <th class="text-left"></th>
                        <th class="text-left">
                            Nom
                        </th>
                        <th class="text-left">
                            Description
                        </th>
                        <th class="text-left">
                            Prix
                        </th>
                        <th class="text-left">
                            Image
                        </th>
                        <th class="text-left"></th>
                        <th class="text-left"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="product in products"
                        :key="product._id"
                    >
                        <td> 
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
                        </td>
                        <td>
                            <router-link 
                                :to="{
                                  name: 'product', 
                                  params: {
                                    id: product._id,
                                    product: product
                                  }
                                }"
                                style="text-decoration: none; color: inherit;"
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
                        <td>
                            <div v-if="product.imageUrl" style="padding:5px;">
                                <img
                                    :src="product.imageUrl"
                                    style="width: 80px; height: 80px;"
                                />
                            </div>
                            <div v-else>
                                <p>Pas d'image disponible</p>
                            </div>
                        </td>
                        <td>
                            <router-link
                                :to="{
                                    name: 'productEdit',
                                    params: {
                                        product: product,
                                        editAction: edit
                                    }
                                }"
                                style="text-decoration: none; color: inherit;"
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
                                style="text-decoration: none; color: inherit;"
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
import { mapGetters } from 'vuex'
import axios from 'axios';
import swal from 'sweetalert';

export default {

    name: "AdminView",

    data() {
        return {
            dialog: false,
            dialogDelete: false,
            headers: [
                {
                    text: "Nom",
                    align: "start",
                    sortable: true,
                    value: "name",
                },
                {
                    text: "Prix",
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
        ...mapGetters({
            products: 'getAllProducts',
            loading: 'isLoading'
        }),
    },

    methods: {
        deleteProduct(product) {
            swal(
                {
                    title: "Supprimer cet article ?",
                    text: "Attention la suppression est définitive !",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Yes, Delete it!",
                    closeOnConfirm: true
                },
            )
            .then(
                () => {
                    axios
                        .delete(`http://localhost:9000/api/product/${product._id}`)
                        .then(
                            () => {
                                this.$toastr.s(`${product.name}`, "Article supprimé");
                                this.$store.dispatch("getProducts");
                            }
                        )
                        .catch(
                            e => this.$toastr.e(`Error : ${e.message}`)
                        );
                }
        
            )
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