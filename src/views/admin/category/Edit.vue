<template>
    <div class="category-edit">
    
        <h3> {{ editAction}} catégorie</h3>
        
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

export default {
    name: 'CategoryEditView',

    props: {
      id: String
    },

    data: () => ({
        category: {},
        editAction: 'create',
        name: '',
        description: '',
    }),

    computed: {
        isEnableSubmit() {
            return this.name !== '' && this.description !== ''
        },
        ...mapGetters({
            categories: 'getAllCategories',
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
      if (this.id) {
          this.category = this.categories.find(c => c._id === this.id);
          Object.keys(this.category).forEach(key => {
            this[key] = this.category[key];
          });
          this.editAction = 'edit';
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