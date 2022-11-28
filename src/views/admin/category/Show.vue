<template>
    <div class="admin-category-show">

      <v-container v-if="isLoadingApi">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-container>

      <v-container v-else>
        <v-card
          class="mx-auto"
          max-width="344"
        >
          <v-card-title>
            {{ categoryDisplayed.name }}
          </v-card-title>
  
          <v-card-subtitle>
            <div>{{ categoryDisplayed.description }}</div>
          </v-card-subtitle>
        </v-card>
      </v-container> 
    </div>
</template>
  
<script>  
import Category from '../../../../services/CategoryService'

export default {
    name: 'CategoryShow',
    props: {
      id: {
        type: String,
        required: true,
      }, 
      category: {
        type: Object,
        required: false
      }      
    },

    data: () => ({
      isLoadingApi: false,
      categoryDisplayed : {}
    }),

    mounted() {
      if (this.category) {
        this.categoryDisplayed = this.category
      }
      if (this.category === undefined) {
        this.isLoadingApi = true;
        Category.getOne(this.$route.params.id)
          .then((response) => {
            this.categoryDisplayed = response.category;
            this.isLoadingApi = false;
          })
          .catch((error) => {
            console.log(error);
            this.isLoadingApi = false;
          });
      }
    },
}
</script>

<style scoped>

    .admin-category-show {
        margin-top: 8%;
        margin-bottom: 8%;
        margin-left: 4%;
        
    }

</style>