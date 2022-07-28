<template>
    <div class="product-edit">
    
        <h3> {{ product ? "Edit product" : "Create product"}} </h3>
        
        <validation-observer
            ref="observer"
            v-slot="{ invalid }"
        >
        <form @submit.prevent="submit" class="form-valid">
        <validation-provider
            v-slot="{ errors }"
            name="Name"
            rules="required|max:10"
        >
        <v-text-field
          v-model="name"
          :counter="20"
          :error-messages="errors"
          label="Name"
          required
        ></v-text-field>
        </validation-provider>
        <validation-provider
            v-slot="{ errors }"
            name="price"
            :rules="{
                required: true,
            }"
        >
        <v-text-field
            v-model="phoneNumber"
            :error-messages="errors"
            label="Price"
            required
        ></v-text-field>
      </validation-provider>
      
      <validation-provider
        v-slot="{ errors }"
        rules="required"
        name="checkbox"
      >
        <v-checkbox
          v-model="checkbox"
          :error-messages="errors"
          value="1"
          label="En stock ?"
          type="checkbox"
          required
        ></v-checkbox>
      </validation-provider>

      <v-btn
        class="mr-4"
        type="submit"
        :disabled="invalid"
      >
        submit
      </v-btn>
      <v-btn @click="clear">
        clear
      </v-btn>
    </form>
  </validation-observer>
    
    </div>
    
</template>

<script>
import { required, max } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

  setInteractionMode('eager')

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

export default {
    name: 'ProductEditView',
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    props: {
        product: Object
    },
    data: () => ({
        name: '',
        price: '',
        checkbox: null,
    }),

    methods: {
        submit () {
            this.$refs.observer.validate()
        },
        clear () {
            this.name = ''
            this.price = ''
            this.checkbox = null
            this.$refs.observer.reset()
        },
    }
}

</script>

<style>

    .product-edit {
        margin: auto;
        padding: 20px;
    }
    
    .form-valid {
        width: 50%;
    }

</style>