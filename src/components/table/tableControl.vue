<template>
<div>
  <div style="max-width:800px;margin:auto;margin-bottom:50px;margin-top:40px">
  <div style="margin:20px 0 20px 0;">
            <div v-html="display_search" class="phantom-input-overlay"></div>
            <i aria-hidden="true" class="fa fa-search fa-fw search-icon"></i>
            <input type="text" class="form-control input-sm phantom-input" v-model="search" @input="updateSearch()" placeholder="Digite para buscar"/>
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
                      <a href="#" @click.prevent="setPage(1)" class="page-link" :class="{'btn-blue': page == 1}">
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
                      <a href="#" @click.prevent="setPage(index)" class="page-link" :class="{'btn-blue': page == index}">
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
                      <a href="#" @click.prevent="setPage(pages)" class="page-link" :class="{'btn-blue': page == pages}">
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
import { paginationMethods, paginationData } from "./pagination";
import { searchMethods, searchData } from "./search";
import { sortMethods, sortData } from "./sort";
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
    remove(row: any){
        this.$emit('remove', row);
        this.display_data = this.display_data.filter((item:any) => item != row);
        this.updateSearch()
    },
  },
  created(){
    this.updatePagination()
  },
  
   computed: {
        display_pages(){
            const result = []
            let start;
            let end;
            if(this.page_display >= this.pages - 4)
            {
                start = 1;
                end = this.pages;
            }
            else
            {
                let leftpad = Math.ceil(this.page_display/2)
                let rightpad = Math.ceil(this.page_display/2)
                if(this.page - leftpad < 0)
                {
                    rightpad -= this.page - leftpad 
                    leftpad = 1
                }
                else
                {
                    leftpad = this.page - leftpad + 1
                }
                if(this.page + rightpad > this.pages)
                {
                    leftpad -= this.page + rightpad - this.pages
                    rightpad = this.pages
                }
                else
                {
                    rightpad = this.page + rightpad
                }
                start = leftpad
                end = rightpad

                if(start <= 1)
                {
                    end +=1
                }
                if(start <= 2)
                {
                    end +=1
                }
                if(end >= this.pages)
                {
                    start -= 1;
                }
                if(end >= this.pages-1)
                {
                    start -= 1;
                }
            }
            for(let i = start; i <= end; i++){
                result.push(i)
            }
            return result
        },
        
    },
})
</script>

<style scoped>
/* nav */
.row-placeholder{
    color: transparent;
}

.pagination{
  margin-top: 20px;
}

.page-link{
  background-color: var(--medium);
  color:white;
  border-color: var(--bright)
}

.btn-blue{
  background-color: var(--dark);
  color:white;
}
/* search */
.phantom-input-overlay{
    pointer-events: none;
    position:absolute;
    margin-left:36px;
    margin-top:7px
}
.phantom-input{
    color: transparent;
    caret-color: white;
    padding-left: 35px;
}
.phantom-input:focus{
    color: red;
    caret-color: white;
}
.search-icon{
    pointer-events: none;
    position:absolute;
    margin-left:10px;
    margin-top:10px;
    color:rgb(134, 134, 134);
}
/* table */
table{
    --radious: 12px;
    margin-top: 15px;
    width: 100%;
    text-align: center;
    border-collapse:separate;
    overflow: hidden;
     
}
td, th{
    padding: 10px;
    border:1px solid var(--bright);
}

th, td{
    border-bottom-width: 0;
    border-left-width: 0;
}
tr:last-child td, tr:last-child td{
    border-bottom-width: 1px;
}

th:first-child, td:first-child{
    border-left-width: 1px;
}

tr:first-child th:first-child{
    border-radius:var(--radious) 0 0 0;
}

tr:first-child th:last-child{
    border-radius:0 var(--radious) 0 0;
}

tr:last-child td:first-child{
    border-radius:0 0 0 var(--radious);
}

tr:last-child td:last-child{
    border-radius:0 0 var(--radious) 0;
}

th{
    color:white;
    background-color: var(--medium)
}
td{
    color:#aaa;
}
tr{
    background-color: var(--dark);
}
tr:hover{
    background-color: var(--dark-selection);
}
.table-header{
    cursor: pointer;
}
.options i:not(:first-child){
    margin-left: 10px;
}
.options i{
    font-size: 15pt;
    cursor: pointer;
}

</style>