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
import axios from 'axios';

export default {
    name: 'CategoryEditView',

    props: {
      category: Object,
      editAction: String,
    },

    data: () => ({
        name: '',
        description: '',
    }),

    computed: {
        isEnableSubmit() {
            return this.name !== '' && this.description !== ''
        }
    },

    methods: {
        submit () {

          const category = {
                name: this.name,
                description: this.description
              };

          if (this.editAction === 'create') {
            axios
              .post("http://localhost:9000/api/category", category)
              .then(() => {
                this.$toastr.s("SUCCESS", `${this.name} created`)
                this.$store.dispatch('getCategories')
                this.$router.push('/admin/category/list')
              }) 
              .catch(e => this.$toastr.e(`Error : ${e.message}`))
          } else {
            axios
              .put(`http://localhost:9000/api/category/${this.category._id}`, category)
              .then(() => {
                this.$toastr.s("SUCCESS", `${this.name} updated`);
                this.$store.dispatch("getCategories"); 
                this.$router.push('/admin/category/list')
              })
              .catch(e => this.$toastr.e(`Error : ${e.message}`))
          }
            
        },
        clear () {
            this.name = ''
            this.description = ''
        },
    },

    mounted () {
      if (this.category !== null) {
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