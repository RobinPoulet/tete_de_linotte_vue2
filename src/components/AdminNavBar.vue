<template>

  <v-app-bar
    absolute
    color="#6A76AB"
    dark
    shrink-on-scroll
    prominent
    src="https://picsum.photos/1920/1080?random"
    fade-img-on-scroll
    scroll-target="#scrolling-techniques-4"
  >
 
    <v-toolbar-title>Admin</v-toolbar-title>
  
    <v-spacer></v-spacer>
  
    <v-menu
      bottom
      left
    >
     
      <v-list>
      
        <v-list-item>
          <v-list-item-title>Click Me 1</v-list-item-title>
        </v-list-item>
  
        <v-list-item>
          <v-list-item-title>Click Me 2</v-list-item-title>
        </v-list-item>
  
        <v-list-item>
          <v-list-item-title>Click Me 3</v-list-item-title>
        </v-list-item>
  
        <v-list-item>
          <v-list-item-title>Click Me 4</v-list-item-title>
        </v-list-item>
        
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
  
<script>

export default {
    name: "AdminNavBar",
}
  
</script>
  
  