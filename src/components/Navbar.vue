<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="navbar--container">
      <div class="navbar">
        <div class="navbar--left">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/products">Products</router-link> |
            <router-link to="/admin">Admin</router-link>
        </div>
        <div class="navbar--right">
          <div class="btn--green" @click="show">
            Connexion
          </div>
        </div>
      </div>
    </div>
</template>
  
<script>
import { mapActions } from 'vuex'
export default {
    methods: {
      ...mapActions({
        show: 'show'
      })
    }
}
</script>
  
<style scoped>
  .navbar--container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 60px;
      box-sizing: border-box;
  }
  .navbar {
      display: flex;
      max-width: 1200px;
      margin: auto;
      justify-content: space-between;
      align-items: center;
      height: 100%;
  }
  .navbar--left {
      font-size: 1.5rem;
  }
  .navbar--left a {
      text-decoration: none;
      color: #35495e;
      transition: all .2s;
  }
  .navbar--left a:hover {
      padding: 0 5px;
  }
  .btn--green {
      padding: 10px 30px;
      border-radius: 5px;
      border: 1px solid white;
      border-radius: 5px;
      text-transform: uppercase;
      cursor: pointer;
      transition: all .2s;
      background-color: rgba(85, 230, 193,1.0);
      color:white;
      font-weight: 500;
  }
  .btn--green:hover {
      color: rgba(85, 230, 193,1.0);
      background-color: white;
      border: 1px solid rgba(85, 230, 193,1.0);
  }
</style>