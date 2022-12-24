<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <v-avatar color="red">
            <span class="white--text text-h5">CJ</span>
        </v-avatar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
   // eslint-disable-next-line vue/multi-word-component-names
   name: 'Avatar',
   computed: {
       ...mapGetters({

       })
   }
}
</script>
