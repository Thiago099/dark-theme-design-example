<template>
  <div class="container">
    <header-control button="new" href="/form/0"></header-control>
    <table-control :data="data" :fields="table_fields" :display_options="true" edit_link="form"></table-control>
  </div>
</template>
<script lang="ts">
import { table_fields } from '@/entities/user-entity';
import data from '@/entities/user-data.json';
export default{
  data(){
    return {
      data,
      table_fields
    }
  },
}
</script>
<style scoped>

</style>