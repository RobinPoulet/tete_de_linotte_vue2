<template>
    <div class="admin-product-list">

        <div style="text-align: right; margin-bottom: 10px;">
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
                <v-btn>
                    <v-icon>mdi-archive-plus</v-icon>Ajouter  un produit
                </v-btn>
            </router-link>
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
                            <div v-if="product.avatarUrl" style="padding:5px;">
                                <img
                                    :src="product.avatarUrl"
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
                                        id: product._id,
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
                            <v-btn 
                                @click="deleteProduct(product)"
                            >
                                <v-icon
                                    color="red"
                                >
                                    mdi-delete
                                </v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Product from '../../../../services/ProductService'
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
                    icon: "warning",
                    buttons: {
                        cancel:{
                            text:"Cancel",
                            value:null,
                            visible:false,
                            className:"",
                            closeModal:true,
                        },
                        confirm:{
                            text:"OK",
                            value:true,
                            visible:true,
                            className:"",
                            closeModal:true
                        }
                    },
                },
            )
            .then(() => {
                Product.delete(product._id)
                    .then(() => {
                            this.$toastr.s(`${product.name}`, "Produit supprimée");
                            this.$store.dispatch("getAllProducts");
                        }
                    )
                    .catch(err => this.$toastr.e(`${err.name} : ${err.message}`));
                }
            )
        }
           
    },
}
</script>

<style>
</style>