<template>
  <div class="container">
    <header-control button="back" :href="'../../'+name" :title="title"></header-control>
    <form-control :form_fields="form_fields" :data="data"></form-control>
  </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props:{
        form_fields:{
            type: Array,
        },
        name: {
            type: String,
        },
        data:{
            type: Object,
        },
        title:{
            type: String,
        },
    },
})
</script>
