<template>
    <div class="category-edit">
    
        <h3> {{ editAction}} catégorie  </h3>

        <v-container v-if="isLoading">
          ...
        </v-container>
        
        <form @submit.prevent="submit" class="form-valid text-left" v-else>
    
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

          <upload 
            v-if="!imageUrl"
            @upload-started="uploadStarted" 
            @upload-done="uploadDone"
          ></upload>

          <v-container v-else class="mt-2 mb-4 text-left">
            <div class="subheading" style="color: rgba(0, 0, 0, 0.6)">
              Avatar
            </div>
                <v-img
                  :src="imageUrl"
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

  </div>
    
</template>

<script>
import { mapGetters } from 'vuex'
import Category from '../../../../services/CategoryService'
import Upload from './Upload'

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
        editAction: '',
        name: '',
        description: '',
        imageUrl: '',
        image: null,
        isLoadingUploadImage: false
    }),

    computed: {
        isEnableSubmit() {
            return !(this.name && this.description && this.isLoadingUploadImage)
        },
        ...mapGetters({
            categories: 'getAllCategories',
            isLoading: 'isLoading'
        }),
    },

    methods: {
      uploadStarted () {
        this.isLoadingUploadImage = true
      },
      uploadDone (url) {
        this.imageUrl = url
        this.isLoadingUploadImage = false
      },
      removeImage () {
        this.imageUrl = ''
      },
      submit () {
        const category = {
          name: this.name,
          description: this.description,
          imageUrl: this.imageUrl
        };
        this.editAction === 'create' ? 
          Category.add(category)
            .then(() => {
              this.$store.dispatch("getAllCategories")
              this.$toastr.s(`${category.name} a été ajoutée avec succès`);
              this.$router.push('/admin/category/list');
            })
            .catch(err => {
              this.$toastr.e(`${err.name} : ${err.message}`);
              this.$router.push('/admin/category/list');
            })
          :
          Category.update(this.$route.params.id, category)
            .then(() => {
              this.$store.dispatch("getAllCategories")
              this.$toastr.s(`${category.name} a été modifiée avec succès`);
              this.$router.push('/admin/category/list');
            })
            .catch(err => {
              this.$toastr.e(`${err.name} : ${err.message}`);
              this.$router.push('/admin/category/list');
            })
      },
      clear () {
        this.name = ''
        this.description = ''
        this.imageUrl = ''
      },
    },

    watch: {
      categories(val) {
        console.log(val)
          if (val.length && this.editAction === 'edit' && !this.category) {
            const categoryFind = this.categories.find(category => category._id === this.$route.params.id)
            console.log(this.categories, categoryFind)
            this.name = categoryFind.name
            this.description = categoryFind.description
            this.imageUrl = categoryFind.imageUrl ?? ''
        }
      }
    },

    mounted () {
      this.editAction = this.$route.name === 'categoryCreate' ? 'create' : 'edit'
      if (this.$route.name === 'categoryEdit' &&  this.category) {
        this.name = this.category.name
        this.description = this.category.description
        this.imageUrl = this.category.imageUrl ?? ''
      }
    },
}

</script>

<style>

  .category-edit {
      margin-top: 8%;
      margin-left: 4%;
      margin-bottom: 8%;
  }
  
  .form-valid {
      width: 50%;
  }

</style>