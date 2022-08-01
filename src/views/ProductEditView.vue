<template>
    <div class="product-edit">
    
        <h3> {{ editAction}} product</h3>
        
        <form @submit.prevent="submit" class="form-valid">
    
        <v-text-field
          v-model="name"
          :counter="30"
          label="Name"
        ></v-text-field>

        <v-text-field
          v-model="description"
          :counter="90"
          label="Description"
        ></v-text-field>
       
        <v-text-field
          v-model="price"
          label="Price"
        ></v-text-field>
    
      
      <v-checkbox
        v-model="checkbox"
        label="En stock ?"
        type="checkbox"
      ></v-checkbox>

      <v-btn
        class="mr-4"
        type="submit"
      >
        submit
      </v-btn>
      <v-btn @click="clear">
        clear
      </v-btn>
    </form>
    
    </div>
    
</template>

<script>
import axios from 'axios';

export default {
    name: 'ProductEditView',
    props: {
        product: Object,
        editAction: String,
    },
    data: () => ({
        name: '',
        description: '',
        price: '',
        checkbox: null,
    }),

    methods: {
        submit () {
            if (this.editAction === 'create') {
              axios
                .post("http://localhost:9000/api/product", {
                  name: this.name,
                  description: this.description,
                  price: this.price,
                  inStock: this.checkbox ? 1 : 0,
                })
                .then(() => {
                  this.$store.dispatch('getProducts')
                  this.$router.push('/admin')
                })
                .catch(e => alert(e))
            } else {
              axios
                .put("http://localhost:9000/api/product/" + this.product._id, {
                  name: this.name,
                  description: this.description,
                  price: this.price,
                  inStock: this.checkbox ? 1 : 0,
                })
                .then(() => {
                  this.$store.dispatch('getProducts')
                  this.$router.push('/admin')
                })
                .catch(e => alert(e))
            }
            
        },
        clear () {
            this.name = ''
            this.description = ''
            this.price = ''
            this.checkbox = null
        },
    },

    mounted () {
        if (this.product) {
            this.name = this.product.name
            this.description = this.product.description
            this.price = this.product.price
            this.checkbox = this.product.inStock
        }
    },
}

</script>

<style>

    .product-edit {
        margin: auto;
        padding: 20px;
    }
    
    .form-valid {
        width: 50%;
    }

</style>