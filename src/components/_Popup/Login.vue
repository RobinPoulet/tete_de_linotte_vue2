<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
      <h1>Connexion</h1>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Votre email">
        <input v-model="password" type="password" placeholder="Mot de passe">
  
        <div v-if="authStatus === 'loading'" class="loader" />
  
        <div v-else class="btn--group">
          <button type="submit" class="btn--green">
            Connexion
          </button>
          <button class="btn--green--alt" @click="signup('Signup')">
            Inscription
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
        email: '',
        password: '',
        error: []
      }
    },
    computed: {
      ...mapGetters({
        errors: 'getErrors',
        authStatus: 'authStatus'
      })
    },
    methods: {
      login: async function () {
        const { email, password } = this
        await this.$store.dispatch('login', { email, password })
      },
      ...mapActions({
        signup: 'changeMode'
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