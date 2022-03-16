<template>
    <table>
        <tr>
          <th v-for="item in fields" :key="item">
            {{ firstUpper(item) }}
          </th>
        </tr>
        <tr v-for="row in data" :key="row">
          <td v-for="col in fields" :key="col">
            {{ row[col] }}
          </td>
        </tr>
      </table>
</template>

<script lang="ts">

export default {
  props: {
    data: {
      type: Object,
      default: () => [],
    },
    fields: {
      type: Array,
      default: () => [],
    },
  },
  methods:{
    firstUpper(str:string)
    {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }
}
</script>
