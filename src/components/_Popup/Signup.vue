<!-- eslint-disable vue/multi-word-component-names -->
<template>
   <v-form
    ref="form"
    v-model="valid"
    lazy-validation
   
   >
  <v-container>
   
   <v-row>
    <v-col
      cols="12"
      md="2"
    ></v-col>
    <v-col
      cols="12"
      md="8"
    >
        <v-text-field
          v-model="name"
          :counter="15"
          :rules="nameRules"
          label="Nom"
          required
        ></v-text-field> 

        <v-text-field
          v-model="firstname"
          :counter="15"
          :rules="firstnameRules"
          label="Prénom"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Email"
          required
        ></v-text-field> 

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Mot de passe"
          type="password"
          required
        ></v-text-field> 

        <v-text-field
          v-model="passwordConfirm"
          :rules="passwordConfirmRules"
          label="Confirmation du mot de passe"
          type="password"
          required
        ></v-text-field> 

        <!-- <div v-if="authStatus === 'loading'" class="loader" />  -->

        <v-btn
        color="success"
        class="mr-4"
        @click="signup"
        >
          Je m'insris
        </v-btn>
    
  
      <div v-if="errors && errors.length > 0" class="errors--list">
        <div v-for="error of errors" :key="error">
          {{ error }}
        </div>
      </div>
  
    </v-col>
    <v-col
      cols="12"
      md="2"
    ></v-col>
    </v-row>
    </v-container>

  </v-form>

</template>
  
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data () {
      return {
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        password: '',
        passwordRules: [
          v => !!v || 'Password is required',
          v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/.test(v) || 'Password must be less than 10 characters, more than 6, include one letter in lower case, one letter in uppercase, one digit, and one special character',
        ],
        passwordConfirm: '',
        passwordConfirmRules: [
          v => !!v || 'Password Confirmation is required',
          v => v === this.password || 'Password Confirmation must be the same as Password',
        ],
        name: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 15) || 'Name must be less than 15 characters',
        ],
        firstname: '',
        firstnameRules: [
          v => !!v || 'Firstname is required',
          v => (v && v.length <= 15) || 'Firstname must be less than 15 characters',
        ],
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