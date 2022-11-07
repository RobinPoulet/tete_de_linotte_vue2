<template>
  <div class="product-edit">
  
      <h3> {{ editAction}} product</h3>
      
      <form @submit.prevent="submit">
  
        <v-text-field
          v-model="name"
          :counter="30"
          label="Name"
        ></v-text-field>

        <v-select
          v-model="categoryId"
          :items="categories"
          item-text="name"
          item-color="primary"
          item-value="_id"
          label="Catégorie de l'article"
        ></v-select>

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

        <div  v-if="isEditImage">
        <v-img
          :src="product.imageUrl"
          max-width="200"
          max-height="200"
        >
        </v-img>
        <v-btn
            color="primary"
            rounded
            dark
            :loading="isSelecting"
            @click="handleFileImport"
          > Edit
            <input
              ref="uploader"
              class="d-none"
              type="file"
              @change="onFileChanged"
            >
          </v-btn>
        </div>
        <v-file-input
          v-else
          v-model="image"
          :rules="rules"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Pick an avatar"
          prepend-icon="mdi-camera"
          label="Avatar"
        ></v-file-input>

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
import { mapGetters } from 'vuex'
import Product from '../../../../services/ProductService'
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
      categoryId: '',
      checkbox: 0,
      image: null,
      rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
      isSelecting: false,
      isEditImage: false,
  }),
  computed: {
      isEnableSubmit() {
          return this.name !== '' && this.description !== '' && this.price !== '' && this.categoryId !== ''
      },
      ...mapGetters({
        categories: 'getAllCategories',
      }),
  },
  methods: {
      submit () {
        const product = {
              name: this.name,
              categoryId: this.categoryId,
              description: this.description,
              price: this.price,
              inStock: this.checkbox,
            };

        const productData = new FormData();
        productData.append('product', JSON.stringify(product));
        productData.append('image', this.image, product.name);

        this.editAction === 'create' ?
          Product.add(productData)
            .then(() => {
              this.$store.dispatch('getAllProducts')
              this.$toastr.s(`${product.name} a été ajoutée avec succès`)
              this.$router.push('/admin/products/list')
            }) 
            .catch(err => {
                this.$toastr.e(`${err.name} : ${err.message}`);
                this.$router.push('/admin/products/list');
              }
            )
          :
          Product.update(this.product._id, productData)
            .then(() => {
              this.$store.dispatch('getAllProducts')
              this.$toastr.s(`${product.name} a été modifiée avec succès`)
              this.$router.push('/admin/products/list')
            }) 
            .catch(err => {
                this.$toastr.e(`${err.name} : ${err.message}`);
                this.$router.push('/admin/products/list');
              }
            )  
      },
      clear () {
          this.name = ''
          this.categoryId = ''
          this.description = ''
          this.price = ''
          this.checkbox = 0
      },
      handleFileImport() {
        this.isSelecting = true;

        window.addEventListener('focus', () => {
          this.isSelecting = false;
        }, {once: true});
        this.$refs.uploader.click();
      },
      onFileChanged(e) {
        this.image = e.target.files[0];
        this.isEditImage = false;
      },
  },

  mounted () {
    if (this.product !== null) {
      ['name', 'categoryId', 'description', 'price', 'price'].forEach(
        key => (this[key] = this.product[key])
      );
      this.checkbox = this.product.inStock
      this.isEditImage = this.product.imageUrl !== null
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