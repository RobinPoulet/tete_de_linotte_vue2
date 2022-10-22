<template>
    <div class="admin-category-show">
      <v-card
        class="mx-auto"
        max-width="344"
      >
        <v-card-title>
          {{ category.name }}
        </v-card-title>
  
        <v-card-subtitle>
          <div>{{ category.description }}</div>
        </v-card-subtitle>
      </v-card>
    </div>
</template>
  
<script>  
export default {
    name: 'CategoryShow',
    props: {
      id: String,
      category: Object
    },
    data: () => ({
    }),
}
</script>

<style scoped>

    .admin-category-show {
        margin-top: 8%;
        margin-bottom: 8%;
        margin-left: 4%;
        
    }

</style>