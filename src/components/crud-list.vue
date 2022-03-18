<template>
  <div class="container">
    <header-control button="new" :href="`/${name}/edit/0`" :title="title"></header-control>
    <table-control :data="data" :fields="table_fields" :display_options="true" :edit_link="name+'/edit'"></table-control>
  </div>
</template>
<script lang="ts">
export default{
  props:{
      table_fields: {
        type: Array,
        required: true,
      },
      data: {
        type: Array,
        required: true,
      },
      name:{
        type: String,
        required: true,
      },
      title:{
        type: String,
        required: true,
      },
  }
}
</script>
<style scoped>
  
</style>