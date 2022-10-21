<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="footer--container">
      <div class="footer--top">
        <div class="container--top">
          <div class="top--col">
            <router-link to="/">Home</router-link>
          </div>
          <div class="top--col">
            <a href="#">Exemple</a>
            <a href="#">Exemple</a>
            <a href="#">Exemple</a>
            <a href="#">Exemple</a>
          </div>
          <div class="top--col">
            <a href="#">Exemple</a>
            <a href="#">Exemple</a>
            <a href="#">Exemple</a>
            <a href="#">Exemple</a>
          </div>
          <div class="top--col">
            <a href="#">Exemple</a>
            <a href="#">Exemple</a>
            <a href="#">Exemple</a>
            <a href="#">Exemple</a>
          </div>
        </div>
      </div>
      <div class="footer--bottom">
        <div class="container--bottom">
          <div>© Exemple, 2020</div>
          <div class="bottom--rs">
            <a href="#"><i class="fab fa-facebook-f" /></a>
            <a href="#"><i class="fab fa-instagram" /></a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
  
  }
  </script>
  
  <style scoped>
  .footer--top, .footer--bottom {
      color: white;
  }
  .footer--top .brand {
      font-size: 2rem;
  }
  .footer--top {
      background-color: rgba(26, 188, 156,1.0);
  }
  .footer--top a {
      color: white;
      text-decoration: none;
      padding-bottom: 10px;
  }
  .footer--top a:last-of-type {
      padding-bottom: 0;
  }
  .footer--top a:hover {
      text-decoration: underline;
  }
  .footer--bottom {
      background-color: rgba(22, 160, 133,1.0);
  }
  .container--top, .container--bottom {
      max-width: 1200px;
      margin: auto;
  }
  .container--top {
      display: flex;
      justify-content: space-between;
      padding: 40px 0;
  }
  .container--top .top--col {
      display: flex;
      flex-direction: column;
  }
  .container--bottom {
      display: flex;
      justify-content: space-between;
      padding: 20px 0;
  }
  .bottom--rs a {
      display: inline-block;
      text-decoration: none;
      color: white;
      padding: 0 10px;
      transition: all .2s;
  }
  .bottom--rs a:hover {
      transform: translateY(-2px);
  }
  </style>