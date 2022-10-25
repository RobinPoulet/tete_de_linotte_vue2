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

    <div v-if="authStatus === 'loading'" class="loader" />

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
      >
        Validate
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
        valid: true,
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
        
      }),
      validate() {
        if (this.$refs.form.validate()) {
          this.login()
        }
      }
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