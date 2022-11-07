<template>
    <div class="admin-category-list">

        <div style="text-align: right; margin-bottom: 10px;">
            <router-link
                :to="{
                    name: 'categoryEdit',
                    params: {
                        category: null,
                        editAction: create
                    }
                }"
                style="text-decoration: none; color: inherit;"
            >
                <v-btn>
                    <v-icon>mdi-archive-plus</v-icon>Ajouter  une catégorie
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
                        <th class="text-left">
                            Nom
                        </th>
                        <th class="text-left">
                            Description
                        </th>
                        <th class="text-left"></th>
                        <th class="text-left"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="category in categories"
                        :key="category._id"
                    >
                        <td>
                            <router-link 
                                :to="{
                                  name: 'categoryShow', 
                                  params: {
                                    id: category._id,
                                    category: category
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
                        <td> {{ category.name }} </td>
                        <td> {{ category.description }} </td>
                        <td>
                            <router-link
                                :to="{
                                    name: 'categoryEdit',
                                    params: {
                                        category: category,
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
                                @click="deleteCategory(category)"
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
import swal from 'sweetalert';
import Category from '../../../../services/CategoryService'
export default {
    name: "AdminCategoryList",
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
            categories: 'getAllCategories',
            loading: 'isLoading'
        }),
    },
    methods: {
        deleteCategory(category) {
            swal(
                {
                    title: "Supprimer cette catégorie ?",
                    text: "Attention la suppression est définitive !",
                    icon: "warning",
                    iconColor: "red",
                    button: true,
                    closeModal: true
                },
            )
            .then(() => {
                Category.delete(category._id)
                    .then(() => {
                            this.$toastr.s(`${category.name}`, "Catégorie supprimée");
                            this.$store.dispatch("getAllCategories");
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