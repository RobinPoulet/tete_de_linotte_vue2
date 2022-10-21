<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
      <h1>Inscription</h1>
      <form @submit.prevent="signup">
        <input v-model="name" type="text" placeholder="Votre nom">
        <input v-model="firstname" type="text" placeholder="Votre prénom">
        <input v-model="email" type="email" placeholder="Votre email">
        <input v-model="password" type="password" placeholder="Mot de passe">
        <input v-model="passwordConfirm" type="password" placeholder="Confirmation">
  
        <div v-if="authStatus === 'loading'" class="loader" />
  
        <div v-else class="btn--group">
          <button type="submit" class="btn--green">
            Inscription
          </button>
          <button class="btn--green--alt" @click="login('Login')">
            Connexion
          </button>
        </div>
      </form>
  
      <div v-if="errors && errors.length > 0" class="errors--list">
        <div v-for="error of errors" :key="error">
          {{ error }}
        </div>
      </div>
    </div>
</template>
  
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data () {
      return {
        name: '',
        firstname: '',
        email: '',
        password: '',
        passwordConfirm: ''
      }
    },
    computed: {
      ...mapGetters({
        errors: 'getErrors',
        authStatus: 'authStatus'
      })
    },
    methods: {
      signup: async function () {
        const { name, firstname, email, password, passwordConfirm } = this
        await this.$store.dispatch('signup', { name, firstname, email, password, passwordConfirm })
      },
      ...mapActions({
        login: 'changeMode'
      })
    }
  }
</script>
  
<style scoped>
    form {
        display: flex;
        flex-direction: column;
        padding: 30px 0 10px;
    }
    form input {
        margin: 5px 0;
        width: 300px;
        padding: 10px;
        border: 1px solid #dcdcdc;
        border-radius: 5px;
    }
    .btn--group button {
        width: 100%;
        margin: 5px 0;
        outline: none;
    }
</style>