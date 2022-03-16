<template>
  <div class="container">
    <table-control :data="data" :fields="fields"></table-control>
  </div>
</template>
<script lang="ts">
import { fields, data } from '@/entities/user-entity';
export default{
  data(){
    return {
      data,
      fields
    }
  },
}
</script>
