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
        },
        ...mapGetters({
            isAddElement: 'isAddElement',
            isUpdateElement: 'isUpdateElement',
        }),
    },

    methods: {
      submit () {
        const category = {
          name: this.name,
          description: this.description
        };
        this.editAction === 'create' ? 
        this.$store.dispatch('addCategory', category) :
        this.$store.dispatch('updateCategory', this.category._id, category)
      },
      clear () {
        this.name = ''
        this.description = ''
      },
    },

    watch: {
      isAddElement(value) {
        if (value.isAddElement === "success") {
            this.$toastr.s("SUCCESS", `${value.elementAdd.type} : ${value.elementAdd.name} created`)
            this.$store.dispatch("resetAddElement")
            this.$router.push('/admin/category/list')
        }
      },
      isUpdateElement(value) {
        if (value.isUpdateElement === "success") {
            this.$toastr.s("SUCCESS", `${value.elementUpdate.type} : ${value.elementUpdate.name} updated`)
            this.$store.dispatch("resetUpdateElement")
            this.$router.push('/admin/category/list')
        }
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