<template>
  <div class="container">
    <header-control button="back" href="/"></header-control>
    <form-control :form_fields="form_fields"></form-control>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { user, form_fields } from '@/entities/user-entity';



export default defineComponent({
  data() {
    return {
      form_fields,
    };
  },
})
</script>
