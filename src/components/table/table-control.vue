<template>
<div>
  <div style="max-width:800px;margin:auto;margin-bottom:50px;margin-top:40px">
  <div style="margin:20px 0 20px 0;">
            <div v-html="display_search" class="search-input-overlay"></div>
            <i aria-hidden="true" class="fa fa-search fa-fw search-icon"></i>
            <input type="text" class="form-control input-sm search-input" v-model="search" @input="updateSearch()" placeholder="Digite para buscar"/>
            </div>
  </div>
    <table cellspacing="0">
        <tr>
          <th v-for="title in fields" :key="title" @click="sortTable(title)" class="table-header no-select">
            {{ firstUpper(title) }}
            <i
                class="fa fa-fw fa-sort"
                :class="{
                    'fa-sort-amount-asc' : sort_column == title && sort_order == true,
                    'fa-sort-amount-desc': sort_column == title && sort_order == false,
                }"
            ></i>
          </th>
          <th v-if="display_options" >Options</th>
        </tr>
        <tr v-for="row in display" :key="row">
          <td v-for="col in fields" :key="col">
            {{ row[col] }}
          </td>
          <td class="options" v-if="display_options">
            <router-link :to="`/${edit_link}/${row.id}`">
                <i class="fa fa-edit info hover"></i>
            </router-link>
            <i @click="remove(row)" class="fa fa-trash danger hover"></i>
          </td>
        </tr>
        <tr v-for="i in display.length <= per_page ? (per_page - display.length) : 0" :key="i">
          <td v-for="col in fields" :key="col" class="row-placeholder no-select">
            *
          </td>
          <td class="row-placeholder no-select" v-if="display_options">*</td>
        </tr>
      </table>
      <div class="col-12 d-flex justify-content-center" v-if="display_data.length != 0">
          <nav aria-label="Page navigation example">
              <ul class="pagination">
                  <li class="page-item">
                      <a class="page-link" href="#" @click.prevent="prevPage()" :class="{'disabled':page == 1}">
                          <span aria-hidden="true">
                              <i class="fa fa-angle-left" aria-hidden="true"></i>
                          </span>
                      </a>
                  </li>
                  <li class="page-item" :key="index" v-if="display_pages[0] != 1">
                      <a href="#" @click.prevent="setPage(1)" class="page-link" :class="{'page-link-selected': page == 1}">
                          1
                      </a>
                  </li>
                  <li class="page-item">
                      <a class="page-link disabled no-select"  v-if="display_pages[0] != 1 && display_pages[0] != 2">
                          <span aria-hidden="true">
                              ...
                          </span>
                      </a>
                  </li>
                  <li class="page-item" v-for="index in display_pages" :key="index">
                      <a href="#" @click.prevent="setPage(index)" class="page-link" :class="{'page-link-selected': page == index}">
                          {{ index }}
                      </a>
                  </li>
                  <li class="page-item" v-if="display_pages[display_pages.length-1] != pages && display_pages[display_pages.length-1] != pages-1">
                      <a class="page-link disabled no-select">
                          <span aria-hidden="true">
                              ...
                          </span>
                      </a>
                  </li>
                  <li class="page-item" v-if="display_pages[display_pages.length-1] != pages">
                      <a href="#" @click.prevent="setPage(pages)" class="page-link" :class="{'page-link-selected': page == pages}">
                          {{ pages }}
                      </a>
                  </li>
                  <li class="page-item">
                      <a class="page-link" href="#" @click.prevent="nextPage()" :class="{'disabled':page == pages}">
                          <span aria-hidden="true">
                              <i class="fa fa-angle-right" aria-hidden="true"></i>
                          </span>
                      </a>
                  </li>
              </ul>
          </nav>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { paginationMethods, paginationData, paginationComputed } from "./script/pagination";
import { searchMethods, searchData } from "./script/search";
import { sortMethods, sortData } from "./script/sort";
import { optionsMethods } from "./script/options";
export default defineComponent({
  props: {
    data: {
      type: Object,
      default: () => [],
    },
    fields: {
      type: Array,
      default: () => [],
    },
    display_options: {
      type: Boolean,
      default: false,
    },	
    per_page: {
      type: Number,
      default: 13,
    },
    edit_link: {
      type: String,
      default: "",
    },
  },
  data(){
    return {
      ...sortData,
      ...paginationData,
      ...searchData,
      display_data : this.data,
      filtered: this.data,
      display: this.data,
    } 
  },
  methods:{
    ...paginationMethods,
    ...searchMethods,
    ...sortMethods,
    firstUpper(str : string)
    {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    ...optionsMethods
  },
  created(){
    this.updatePagination()
  },
   computed: {
        ...paginationComputed
    },
})
</script>

<style scoped lang="less">

@import './style/pagination';
@import './style/search-bar';
@import './style/table';

</style>