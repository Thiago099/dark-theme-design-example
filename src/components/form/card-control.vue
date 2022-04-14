<template>
    <div class="card">
      <div class="card-header">
        <h3 style="text-align:center"> {{ title }} </h3>
      </div>
      <div class="row card-body">
        <slot></slot>
      </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props:{
        title: {
            type: String,
            default: ''
        },
    }
})
</script>
