<template>
    <div class="product">
        <h2>{{ product.name }}</h2>
    </div>
</template>

<script>

export default {
  name: 'ProductView',
  props: {
    id: String,
    product: Object
  }
}
</script>