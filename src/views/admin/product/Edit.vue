<template>
  <div class="product-edit">

    <v-container v-if="isLoading">
      <v-progress-circular indeterminate color="primary">
      </v-progress-circular>
    </v-container> 
  
    <v-container v-else>
      
      <form @submit.prevent="submit" class="form-valid text-left">
  
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
            v-if="showUpload"
            @upload-started="uploadStarted" 
            @upload-done="uploadDone"
            @clear-upload="clearUpload"
          ></upload>

          <v-container v-else class="mt-2 mb-4 text-left">
            <div class="subheading" style="color: rgba(0, 0, 0, 0.6)">
              Avatar
            </div>
                <v-img
                  :src="inputProduct.avatarUrl"
                  max-width="150"
                  max-height="150"
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

       <upload-multiple
          @add-image-to-gallerie="addImageToGallerie"
          @upload-multiple-started="uploadMultipleStarted"
          @clear-multiple="clearUploadMultiple"
       ></upload-multiple>

       <v-container class="mt-2 mb-4 text-left" v-if="showUploadMultiple">
        <div class="subheading mb-3" style="color: rgba(0, 0, 0, 0.6)">
              Images déjà uploadé
            </div>
        <div  v-for="(image, index) in inputProduct.images" :key="index">
            
                <v-img
                  :src="image.url"
                  max-width="150"
                  max-height="150"
                ></v-img>
                <v-btn
                  class="ma-2"
                  outlined
                  color="red"
                  @click="removeImageGallerie(index, image)"
                >
                  <v-icon white>
                    mdi-close-circle
                  </v-icon>
                  Supprimer
                </v-btn>
            </div>
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
import UploadMultiple from '../../../components/UploadMultiple'
import { getStorage, ref, deleteObject } from "firebase/storage"

export default {
  name: 'ProductEditView',
  components: {
    Upload,
    UploadMultiple
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
        avatarUrl: '',
        avatarName: '',
        images: []
      },
      isProductCreate: false,
      rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
      isLoadingUploadImage: false,
      showUpload: true,
      showUploadMultiple: true
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
      uploadMultipleStarted () {
        this.isLoadingUploadImage = true
      },
      uploadDone (url, name) {
        this.inputProduct.avatarUrl = url
        this.inputProduct.avatarName = name
        this.isLoadingUploadImage = false
      },
      deleteImageFromFirebase(imageName) {
        const storage = getStorage();
        // Create a reference to the file to delete
        const desertRef = ref(storage, '/images/' + imageName);

        // Delete the file
        deleteObject(desertRef).then(() => {
          // File deleted successfully
          console.log("fichier supprimé")
          
        }).catch((error) => {
          // Uh-oh, an error occurred!
          console.log(error);
        });
      },
      removeImage () {
        this.deleteImageFromFirebase(this.inputProduct.avatarName)
        this.inputProduct.avatarUrl = ''
        this.inputProduct.avatarName = ''
        this.showUpload = true
      },
      removeImageGallerie(index, image) {
        this.inputProduct.images.splice(index, 1)
        this.deleteImageFromFirebase(image.name)
      },
      clearUpload() {
        this.removeImage()
      },
      clearUploadMultiple(imagesName) {
        imagesName.forEach(imageName => this.deleteImageFromFirebase(imageName));
        this.inputProduct.images = this.inputProduct.images.filter(image => !imagesName.includes(image.name))
      },
      addImageToGallerie (imageUrl, imageName) {
        const image = {
          url : imageUrl,
          name: imageName
        }
        this.inputProduct.images.push(image)
        this.isLoadingUploadImage = false
      },
    submit () { 
      this.isProductCreate ?
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
      this.inputProduct.name = '';
      this.inputProduct.description = '';
      this.inputProduct.price = '';
      this.inputProduct.categoryId = '';
      this.inputProduct.inStock = false;
      this.inputProduct.avatarUrl = '';
      this.inputProduct.avatarName = '';
      this.inputProduct.images = [];
      this.showUpload = true;
    }
  },

  watch: {
    'inputProduct.images'(val) {
      if (!val.length) {
        this.showUploadMultiple = false
      }
    },
  },

  mounted () {
    this.isProductCreate = this.$route.name === 'productCreate';
    if (!this.isProductCreate && !this.product) {
        const productFind = this.products.find(product => product._id === this.$route.params.id);
        this.inputProduct.name = productFind.name
        this.inputProduct.description = productFind.description
        this.inputProduct.price = productFind.price
        this.inputProduct.categoryId = productFind.categoryId
        this.inputProduct.inStock = productFind.inStock
        this.inputProduct.avatarUrl = productFind.avatarUrl
        this.inputProduct.avatarName = productFind.avatarName
        if (productFind.images.length) {
          productFind.images.forEach(image => this.inputProduct.images.push(image))
        }
        this.showUpload = this.inputProduct.avatarUrl ? false : true
        this.showUploadMultiple = productFind.images.length > 0
    }
    if (!this.isProductCreate && this.product) {
      this.inputProduct.name = this.product.name
        this.inputProduct.description = this.product.description
        this.inputProduct.price = this.product.price
        this.inputProduct.categoryId = this.product.categoryId
        this.inputProduct.inStock = this.product.inStock
        this.inputProduct.avatarUrl = this.product.avatarUrl
        this.inputProduct.avatarName = this.product.avatarName
        if (this.product.images.length) {
          this.product.images.forEach(image => this.inputProduct.images.push(image))
        }
        this.showUpload = this.inputProduct.avatarUrl ? false : true
        this.showUploadMultiple = this.product.images.length > 0
      }
  },

}
</script>

<style>
.form-valid {
    width: 50%;
}
</style>