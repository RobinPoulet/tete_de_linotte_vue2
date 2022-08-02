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

          <v-file-input
            v-model="files"
            color="deep-purple accent-4"
            counter
            label="File input"
            multiple
            placeholder="Select your files"
            prepend-icon="mdi-paperclip"
            outlined
            :show-size="1000"
          >
            <template v-slot:selection="{ index, text }">
              <v-chip
                v-if="index < 2"
                color="deep-purple accent-4"
                dark
                label
                small
              >
                {{ text }}
              </v-chip>

              <span
                v-else-if="index === 2"
                class="text-overline grey--text text--darken-3 mx-2"
              >
                +{{ files.length - 2 }} File(s)
              </span>
            </template>
          </v-file-input>

          <v-btn
            class="mr-4"
            type="submit"
            :disabled="!isEnableSubmit"
          >envoyer</v-btn>

          <v-btn @click="clear">remettre à 0</v-btn>

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
        checkbox: 0,
        files: [],
    }),

    computed: {
        isEnableSubmit() {
            return this.name !== '' && this.description !== '' && this.price !== ''
        },
    },

    methods: {
        submit () {
            if (this.editAction === 'create') {
              const product = {
                name: this.name,
                description: this.description,
                price: this.price,
                inStock: this.checkbox,
              };
              const productData = new FormData();
              productData.append('product', JSON.stringify(product));
              productData.append('image', this.files[0], product.name);
              axios
                .post("http://localhost:9000/api/product", productData)
                .then(() => {
                  this.$toastr.s("SUCCESS", `${this.name} created`)
                  this.$store.dispatch('getProducts')
                  this.$router.push('/admin')
                }) 
                .catch(e => this.$toastr.e(`Error : ${e.message}`))
            } else {
              axios
                .put(`http://localhost:9000/api/product/${this.product._id}`, {
                  name: this.name,
                  description: this.description,
                  price: this.price,
                  inStock: this.checkbox,
                })
                .then(() => {
                  this.$toastr.s("SUCCESS", `${this.name} updated`);
                  this.$store.dispatch('getProducts')
                  this.$router.push('/admin')
                })
                .catch(e => this.$toastr.e(`Error : ${e.message}`))
            }
            
        },
        clear () {
            this.name = ''
            this.description = ''
            this.price = ''
            this.checkbox = 0
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