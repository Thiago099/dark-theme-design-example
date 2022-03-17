<template>
<div>
  <div style="max-width:800px;margin:auto;margin-bottom:50px">
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
            <i class="fa fa-edit info-hover"></i>
            <i class="fa fa-trash danger-hover"></i>
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
                      <a class="page-link disabled" href="#" v-if="display_pages[0] != 1 && display_pages[0] != 2">
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
                      <a class="page-link disabled" href="#" >
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
    display_options: {
      type: Boolean,
      default: false,
    },	
  },
  methods:{
    firstUpper(str : string)
    {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    sortTable(column : string){
        if(this.sort_column == column) 
        {
            this.sort_order = !this.sort_order;
        }
        else
        {
            this.sort_order = true
            this.sort_column = column;
        }
        // reduce display data into display
        this.filtered.sort((a : any, b : any) => 
        {
            if(a[this.sort_column] < b[this.sort_column])
            {
                return this.sort_order ? -1 : 1;
            }
            if(a[this.sort_column] > b[this.sort_column])
            {
                return this.sort_order ? 1 : -1;
            }
            return 0;
        })
        this.updatePagination()
    },
    setPage(page: number){
            this.page = page;
            this.updatePagination();
        },
        nextPage(){
            this.page++;
            this.updatePagination();
        },
        prevPage(){
            this.page--;
            this.updatePagination();
        },
        updatePagination(){
          if(this.page == 0)
          {
            this.page = this.pages;
          }
            let comeco =
              this.per_page * (this.page - 1)
            let final =
              this.per_page * this.page
            if (comeco >= this.filtered.length) {
              this.page = 1
              comeco =
                this.per_page * (this.page - 1)
              final = this.per_page * this.page
            }
            this.pages = Math.ceil(this.filtered.length / this.per_page)
            this.display = this.filtered.slice(comeco, final)
        },
        updateSearch(){
          const filtered = this.display_data.filter((item:any) => {
              for(const key in this.fields)
              {
                  if(item[this.fields[key] as string].toString().toLowerCase().includes(this.search.toLowerCase()))
                  {
                      return true;
                  }
              }
              return false;
          });
          if(filtered.length != 0 || this.display_data.length == 0)
          {
              this.filtered = filtered;
              this.last_search = this.search;
          }
          const search = this.search.search(this.last_search);
          if(search == 0)
          {
              this.display_search = `<font color="white">${this.last_search}</font><font color="red">${this.search.replace(this.last_search,'')}</font>`;
          }
          else if(search >= 0)
          {
              const mid = this.search.split(this.last_search);
              this.display_search = `<font color="red">${mid[0]}</font><font color="white">${this.last_search}</font><font color="red">${mid[1]}</font>`;

          }
          else
          {
              this.display_search = `<font color="red">${this.search}</font>`;
          }
          this.updatePagination()
      },
  },
  created(){
    this.updatePagination()
  },
  data(){
    return {
      sort_column : '',
      sort_order : true,
      display_data : this.data,
      filtered: this.data,
      display: this.data,
      page:1,
      pages:1,
      page_display:15,
      per_page:8,
      search:'',
      last_search:'',
      display_search:'',
    } 
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
}
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
  background-color: rgb(36, 36, 36);
  color:white;
  border-color: rgb(85, 85, 85)
}

.btn-blue{
  background-color: rgb(24, 24, 24);
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
    border:1px solid rgb(85, 85, 85);
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
    background-color: rgb(36, 36, 36);
}
td{
    color:#aaa;
}
tr{
    background-color: rgb(24, 24, 24);
}
tr:hover{
    background-color: rgb(20, 25, 34);
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