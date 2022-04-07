<template>
  <a :href="href" target="_blank" noreferrer class="btn"><slot /></a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    href: {
      type: String,
      required: true
    }
  }
});
</script>

<style scoped>
@import url('./buy-ticket.css');
</style>
