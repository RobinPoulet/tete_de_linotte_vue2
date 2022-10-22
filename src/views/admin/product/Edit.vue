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
          v-model="image"
          label="Image"
          prepend-icon="mdi-image"
          accept="image/*"
        />
        <v-img
          v-if="editAction === 'create'"
          width="100px" 
          :src="url" 
        />
        <v-img
          v-else
          width="100px" 
          :src="product.imageUrl" 
        />

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
      image: null,
  }),
  computed: {
      isEnableSubmit() {
          return this.name !== '' && this.description !== '' && this.price !== ''
      },
      url() {
          if (!this.image) return;
          return URL.createObjectURL(this.image);
      }
  },
  methods: {
      submit () {
        const product = {
              name: this.name,
              description: this.description,
              price: this.price,
              inStock: this.checkbox,
            };
        const productData = new FormData();
        productData.append('product', JSON.stringify(product));
        productData.append('image', this.image, product.name);
        if (this.editAction === 'create') {
          axios
            .post("http://localhost:9000/api/product", productData)
            .then(() => {
              this.$toastr.s("SUCCESS", `${this.name} created`)
              this.$store.dispatch('getProducts')
              this.$router.push('/admin/product/list')
            }) 
            .catch(e => this.$toastr.e(`Error : ${e.message}`))
        } else {
          axios
            .put(`http://localhost:9000/api/product/${this.product._id}`, productData)
            .then(() => {
              this.$toastr.s("SUCCESS", `${this.name} updated`);
              this.$store.dispatch('getProducts')
              this.$router.push('/admin/product/list')
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
    if (this.product !== null) {
        this.name = this.product.name
        this.description = this.product.description
        this.price = this.product.price
        this.checkbox = this.product.inStock
        if (this.product.imageUrl) {
          axios
          .get(this.product.imageUrl)
          .then(response => {
            console.log(response)
            this.image = response.data
          })
          .catch(e => this.$toastr.e(`Error : ${e.message}`))
        }
    }
  },
}
</script>

<style>
.product-edit {
    margin-top: 8%;
    margin-left: 4%;
    margin-bottom: 4%;
}

.form-valid {
    width: 50%;
}
</style>