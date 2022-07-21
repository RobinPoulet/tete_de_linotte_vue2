<template>
    <div class="admin">
        <v-data-table
            :headers="headers"
            :items="products"
            class="elevation-1"
        >
            <template v-slot:[`item.name`]="{ item }">
                <v-chip
                    :color="getColor(item.price)"
                    dark
                >
                    {{ item.price }}
                </v-chip>
            </template>
        </v-data-table>
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