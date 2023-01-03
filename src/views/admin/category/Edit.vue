<template>
    <div class="category-edit">
    
        <h3> {{ editAction}} catégorie  </h3>

        <v-container v-if="isLoading || isLoadingApi">
          ...
        </v-container>
        
        <form @submit.prevent="submit" class="form-valid" v-else>
    
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

          <upload></upload>
       
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
        isLoadingApi: false,
    }),

    computed: {
        isEnableSubmit() {
            return this.name !== '' && this.description !== ''
        },
        ...mapGetters({
            categories: 'getAllCategories',
            isLoading: 'isLoading'
        }),
    },

    methods: {
      submit () {
        const category = {
          name: this.name,
          description: this.description
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
          Category.update(this.category._id, category)
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
      },
    },

    mounted () {
      this.editAction = this.$route.name === 'categoryCreate' ? 'create' : 'edit'
      if (this.$route.name === 'categoryEdit' && !this.category) {
        this.isLoadingApi = true;
        Category.getOne(this.$route.params.id)
          .then(category => {
            this.name = category.category.name
            this.description = category.category.description
            this.isLoadingApi = false;
          })
          .catch(err => {
            this.$toastr.e(`${err.name} : ${err.message}`);
            this.$router.push('/admin/category/list');
          })
      }
      if (this.$route.name === 'categoryEdit' &&  this.category) {
        this.name = this.category.name
        this.description = this.category.description
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