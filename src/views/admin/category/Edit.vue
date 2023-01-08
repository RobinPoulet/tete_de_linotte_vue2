<template>

    <div class="category-edit">

        <v-container v-if="isLoading">
          <v-progress-circular indeterminate color="primary">
          </v-progress-circular>
        </v-container> 

        <v-container v-else>
        
          <form @submit.prevent="submit" class="form-valid text-left">
      
            <v-text-field
              v-model="categoryInput.name"
              :counter="30"
              label="Name"
            ></v-text-field>

            <v-text-field
              v-model="categoryInput.description"
              :counter="90"
              label="Description"
            ></v-text-field>

            <upload 
              v-if="isUpload"
              @upload-started="uploadStarted" 
              @upload-done="uploadDone"
              @clear-upload="clearUpload"
            ></upload>

            <v-container v-else class="mt-2 mb-4 text-left">
              <div class="subheading" style="color: rgba(0, 0, 0, 0.6)">
                Avatar
              </div>
                  <v-img
                    :src="categoryInput.imageUrl"
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
import Category from '../../../../services/CategoryService'
import Upload from '../../../components/Upload'

export default {
    name: 'CategoryEditView',
    components: {
      Upload
    },
    props: {
      id: {
        type: String,
        required: false
      },
      category: {
        type: Object,
        required: false,
      }
    },

    data: () => ({
        isCategoryCreate: false,
        categoryInput : {
          name: '',
          description: '',
          imageUrl: ''
        },
        isLoadingUploadImage: false,
        isUpload: false
    }),

    computed: {
        isEnableSubmit() {
            return this.categoryInput.name && this.categoryInput.description && !this.isLoadingUploadImage
        },
        ...mapGetters({
            categories: 'getAllCategories',
            isLoading: 'isCategoryLoading'
        }),
    },

    methods: {
      uploadStarted () {
        this.isLoadingUploadImage = true
      },
      uploadDone (url) {
        this.categoryInput.imageUrl = url
        this.isLoadingUploadImage = false
      },
      removeImage () {
        this.categoryInput.imageUrl = ''
        this.isUpload = true
      },
      clearUpload() {
        this.removeImage()
      },
      submit () {
        this.isCategoryCreate ? 
          Category.add(this.categoryInput)
            .then(() => {
              this.$store.dispatch("getAllCategories")
              this.$toastr.s(`${this.categoryInput.name} a été ajoutée avec succès`);
              this.$router.push('/admin/category/list');
            })
            .catch(err => {
              this.$toastr.e(`${err.name} : ${err.message}`);
              this.$router.push('/admin/category/list');
            })
          :
          Category.update(this.$route.params.id, this.categoryInput)
            .then(() => {
              this.$store.dispatch("getAllCategories")
              this.$toastr.s(`${this.categoryInput.name} a été modifiée avec succès`);
              this.$router.push('/admin/category/list');
            })
            .catch(err => {
              this.$toastr.e(`${err.name} : ${err.message}`);
              this.$router.push('/admin/category/list');
            })
      },
      clear () {
        this.categoryInput.name = ''
        this.categoryInput.description = ''
        this.categoryInput.imageUrl = ''
      },
    },

    mounted () {
      this.isCategoryCreate = this.$route.name === 'categoryCreate'
      if (this.editAction === 'edit' && !this.category) {
            const categoryFind = this.categories.find(category => category._id === this.$route.params.id)
            this.categoryInput.name = categoryFind.name
            this.categoryInput.description = categoryFind.description
            this.categoryInput.imageUrl = categoryFind.imageUrl ?? ''
            this.isUpload = this.categoryInput.imageUrl ? false : true
        }
      if (this.$route.name === 'categoryEdit' &&  this.category) {
        this.categoryInput.name = this.category.name
        this.categoryInput.description = this.category.description
        this.categoryInput.imageUrl = this.category.imageUrl ?? ''
        this.isUpload = this.categoryInput.imageUrl ? false : true
      }
    },
}

</script>

<style>
  .form-valid {
      width: 50%;
  }

</style>