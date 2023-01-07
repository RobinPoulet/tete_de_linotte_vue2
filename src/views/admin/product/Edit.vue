<template>
  <div class="product-edit">

    <v-container v-if="isLoading">
      <v-progress-circular indeterminate color="primary">

      </v-progress-circular>
    </v-container> 
  
    <v-container v-else>

      <h3> {{ editAction}} product</h3>
      
      <form @submit.prevent="submit">
  
        <v-text-field
          v-model="inputProduct.name"
          :counter="30"
          label="Name"
        ></v-text-field>

        <v-select
          v-model="inputProduct.categoryId"
          :items="categories"
          item-text="name"
          item-color="primary"
          item-value="_id"
          label="Catégorie de l'article"
        ></v-select>

        <v-text-field
          v-model="inputProduct.description"
          :counter="90"
          label="Description"
        ></v-text-field>
     
        <v-text-field
          v-model="inputProduct.price"
          label="Price"
        ></v-text-field>
  
        <v-checkbox
          v-model="inputProduct.inStock"
          label="En stock ?"
          type="checkbox"
        ></v-checkbox>

        <upload 
            v-if="!inputProduct.avatarUrl"
            @upload-started="uploadStarted" 
            @upload-done="uploadDone"
          ></upload>

          <v-container v-else class="mt-2 mb-4 text-left">
            <div class="subheading" style="color: rgba(0, 0, 0, 0.6)">
              Avatar
            </div>
                <v-img
                  :src="inputProduct.avatarUrl"
                  aspect-ratio="1"
                  width="150"
                  height="150"
                ></v-img>
                <v-btn
                  class="ma-2"
                  outlined
                  color="red"
                  @click="removeImage"
                >
                  <v-icon white>
                    mdi-close-circle
                  </v-icon>
                  Supprimer
                </v-btn>
          </v-container>
        <v-btn
          class="mr-4"
          type="submit"
          :disabled="!isEnableSubmit"
        >envoyer</v-btn>

        <v-btn @click="clear">remettre à 0</v-btn>

      </form>

    </v-container>
      
</div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import ProductApi from '../../../../services/ProductService'
import Upload from '../../../components/Upload'

export default {
  name: 'ProductEditView',
  components: {
    Upload
  },
  props: {
    id: {
      type: String,
      required: false
    },
    product: {
      type: Object,
      required: false
    }
  },
  data: () => ({
      inputProduct: {
        name: '',
        description: '',
        price: '',
        categoryId: '',
        inStock: false,
        avatarUrl: ''
      },
      editAction: '',
      rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
      isLoadingUploadImage: false
  }),
  computed: {
      isEnableSubmit() {
          return this.inputProduct.name && 
                this.inputProduct.description && 
                this.inputProduct.price  && 
                this.inputProduct.categoryId && 
                !this.isLoadingUploadImage
      },
      ...mapGetters({
        categories: 'getAllCategories',
        products: 'getAllProducts',
        isLoading: 'isProductLoading'
      })
  },
  methods: {
    uploadStarted () {
        this.isLoadingUploadImage = true
      },
      uploadDone (url) {
        this.inputProduct.avatarUrl = url
        this.isLoadingUploadImage = false
      },
      removeImage () {
        this.inputProduct.avatarUrl = ''
      },
    submit () { 
      this.editAction === 'create' ?
        ProductApi.add(this.inputProduct)
          .then(() => {
            this.$store.dispatch('getAllProducts')
            this.$toastr.s(`${this.inputProduct.name} a été ajoutée avec succès`)
            this.$router.push('/admin/products/list')
          }) 
          .catch(err => {
              this.$toastr.e(`${err.name} : ${err.message}`);
              this.$router.push('/admin/products/list');
            }
          )
        :
        ProductApi.update(this.$route.params.id, this.inputProduct)
          .then(() => {
            this.$store.dispatch('getAllProducts')
            this.$toastr.s(`${this.inputProduct.name} a été modifiée avec succès`)
            this.$router.push('/admin/products/list')
          }) 
          .catch(err => {
              this.$toastr.e(`${err.name} : ${err.message}`);
              this.$router.push('/admin/products/list');
            }
          )  
    },
    clear () {
      this.inputProdut.name = '';
      this.inputProdut.description = '';
      this.inputProdut.price = '';
      this.inputProdut.categoryId = '';
      this.inputProdut.inStock = false;
      this.inputProdut.avatarUrl = '';
    }
  },

  mounted () {
    this.editAction = this.$route.name === 'productCreate' ? 'create' : 'edit'
    if (this.editAction === 'edit' && !this.product) {
        const productFind = this.products.find(product => product._id === this.$route.params.id);
        this.inputProduct.name = productFind.name;
        this.inputProduct.description = productFind.description;
        this.inputProduct.price = productFind.price;
        this.inputProduct.categoryId = productFind.categoryId;
        this.inputProduct.inStock = productFind.inStock;
        this.inputProduct.avatarUrl = productFind.avatarUrl;
    }
    if (this.$route.name === 'productEdit' && this.product) {
        this.inputProduct.name = this.product.name;
        this.inputProduct.description = this.product.description;
        this.inputProduct.price = this.product.price;
        this.inputProduct.categoryId = this.product.categoryId;
        this.inputProduct.inStock = this.product.inStock;
        this.inputProduct.avatarUrl = this.product.avatarUrl;
        this.inputProduct.price = this.product.price;
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