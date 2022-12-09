<template>
  <div class="product-edit">

    <v-container v-if="isLoading || isLoadingApi">
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

      
        <v-container v-if="!isEditImage">
          <v-file-input
            v-model="image"
            :rules="rules"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Pick an avatar"
            prepend-icon="mdi-camera"
            label="Avatar"
            @change="getAvatarUrl($event)"
          ></v-file-input>

          <!-- display uploaded image if successful -->
          <v-img
            v-if="results && results.secure_url"
            :src="avatarUrl"
            :alt="results.public_id"
            max-width="200"
            max-height="200"
          >
          </v-img>
        </v-container>
        
        <!-- display existing image on product edit with already image upload -->
        <v-container v-if="isEditImage">
          <v-row>
            <v-col cols="3">
              <v-img
                v-if="product.avatarUrl"
                :src="product.avatarUrl"
                alt=""
                max-width="100"
                max-height="100"
              >
              </v-img>
            </v-col>
            <v-col cols="3">
              <v-btn 
                @click="deleteImage"
              >
                <v-icon color="red">
                  mdi-delete
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
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
import axios from 'axios'

export default {
  name: 'ProductEditView',
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
      isLoadingApi: false,
  }),
  computed: {
      isEnableSubmit() {
          return this.name !== '' && this.description !== '' && this.price !== '' && this.categoryId !== ''
      },
      ...mapGetters({
        categories: 'getAllCategories',
        products: 'getAllProducts',
        isLoading: 'isLoading'
      })
  },
  methods: {
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
    },
    handleFileImport() {
      this.isSelecting = true;

      window.addEventListener('focus', () => {
        this.isSelecting = false;
      }, {once: true});
      this.$refs.uploader.click();
    },
    handleFileChange(event) {
      console.log("handlefilechange", event.target.files);
      //returns an array of files even though multiple not used
      this.file = event.target.files[0];
      this.filesSelected = event.target.files.length;
    },
    prepareFormData() {
      this.formData = new FormData();
      this.formData.append("upload_preset", this.preset);
      this.formData.append("tags", this.tags); // Optional - add tag for image admin in Cloudinary
      this.formData.append("file", this.fileContents);
      console.log(this.formData)
    },
    getAvatarUrl() {
      //no need to look at selected files if there is no cloudname or preset
      if (this.preset.length < 1 || this.cloudName.length < 1) {
        this.errors.push("You must enter a cloud name and preset to upload");
        return;
      }
      // clear errors
      else {
        this.errors = [];
      }
      console.log("upload", this.image.name);

      let reader = new FileReader();
      // attach listener to be called when data from file
      reader.addEventListener(
        "load",
        function() {
          this.fileContents = reader.result;
          this.prepareFormData();
          let cloudinaryUploadURL = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`;
          let requestObj = {
            url: cloudinaryUploadURL,
            method: "POST",
            data: this.formData,
          };
          //show progress bar at beginning of post
          axios(requestObj)
            .then(response => {
              this.results = response.data;
              console.log(this.results);
              console.log("public_id", this.results.public_id);
              this.avatarUrl = this.results.secure_url;
            })
            .catch(error => {
              this.errors.push(error);
              console.log(this.error);
            })
      }.bind(this),
      false
    );
      // call for file read if there is a file
      if (this.image && this.image.name) {
        reader.readAsDataURL(this.image);
      }
    },
    deleteImage() {
      this.avatarUrl = '';
      this.image = null;
      this.isEditImage = false;  
    },
  },
  
  mounted () {
    this.editAction = this.$route.name === 'productCreate' ? 'create' : 'edit'
    if (this.$route.name === 'productEdit' && !this.product) {
      this.isLoadingApi = true;
      Product.getOne(this.$route.params.id)
          .then((response) => {
            if (response.product.avatarUrl) {
              this.isEditImage = true;
              this.avatarUrl = response.product.avatarUrl;
            }
            this.categoryId = response.product.categoryId;
            this.description = response.product.description;
            this.inStock = response.product.inStock;
            this.name = response.product.name;
            this.price = response.product.price;
            this.isLoadingApi = false;
          })
          .catch(err => {
            this.$toastr.e(`${err.name} : ${err.message}`);
            this.$router.push('/admin/product/list');
          })
    }
    if (this.$route.name === 'productEdit' &&  this.product) {
        if (this.product.avatarUrl) {
          this.isEditImage = true;
          this.avatarUrl = this.product.avatarUrl;
        }
        
        this.description = this.product.description;
        this.categoryId = this.product.categoryId;
        this.inStock = this.product.inStock;
        this.name = this.product.name;
        this.price = this.product.price;
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