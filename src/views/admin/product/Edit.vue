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
          v-model="inStock"
          label="En stock ?"
          type="checkbox"
        ></v-checkbox>

      
        <upload 
            v-if="!avatarUrl"
            @upload-started="uploadStarted" 
            @upload-done="uploadDone"
          ></upload>

          <v-container v-else class="mt-2 mb-4 text-left">
            <div class="subheading" style="color: rgba(0, 0, 0, 0.6)">
              Avatar
            </div>
                <v-img
                  :src="avatarUrl"
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
      
    <!-- display errors if not successful -->
    <section>
      <ul v-if="errors.length > 0">
        <li v-for="(error,index) in errors" :key="index">{{error}}</li>
      </ul>
    </section>
  
</div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import Product from '../../../../services/ProductService'
import Upload from '../../../components/Upload'

export default {
  name: 'ProductEditView',
  components: {
    Upload
  },
  props: {
    id: {
      type: String
    },
    product: {
      type: Object
    }
  },
  data: () => ({
      editAction: '',
      results: null,
      name: '',
      description: '',
      price: '',
      avatarUrl: '',
      categoryId: '',
      inStock: 0,
      image: null,
      rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
      isSelecting: false,
      isEditImage: false,
      tags: "browser-upload",
      fileContents: null,
      formData: null,
      cloudName: "delfxt4yn",
      preset: "vuejs-preset",
      errors: [],
      isLoadingUploadImage: false
  }),
  computed: {
      isEnableSubmit() {
          return !(this.name && this.description && this.price  && this.categoryId && this.avatarUrl)
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
        this.avatarUrl = url
        this.isLoadingUploadImage = false
      },
      removeImage () {
        this.avatarUrl = ''
      },
    submit () { 
      const product = {
        name: this.name,
        categoryId: this.categoryId,
        description: this.description,
        price: this.price,
        inStock: this.inStock,
        avatarUrl: this.avatarUrl,
      };

      this.editAction === 'create' ?
        Product.add(product)
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
        Product.update(this.product._id, product)
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
      this.avatarUrl = ''
    },
  },

  mounted () {
    this.editAction = this.$route.name === 'productCreate' ? 'create' : 'edit'
    if (this.editAction === 'edit' && !this.product) {
            const productFind = this.products.find(product => product._id === this.$route.params.id)
            this.categoryId = productFind.categoryId;
            this.description = productFind.description;
            this.inStock = productFind.inStock;
            this.name = productFind.name;
            this.price = productFind.price;
            this.avatarUrl = productFind.avatarUrl ?? '';
        }
    if (this.$route.name === 'productEdit' &&  this.product) {
        this.description = this.product.description;
        this.categoryId = this.product.categoryId;
        this.inStock = this.product.inStock;
        this.name = this.product.name;
        this.price = this.product.price;
        this.avatarUrl = this.product.avatarUrl ?? '';
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