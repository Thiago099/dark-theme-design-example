import  
{
    sort_column ,
    sort_order ,
    display_data ,
    filtered ,
    display,
    page,
    pages,
    page_display,
    search,
    last_search,
    display_search,
    _per_page,
    _fields
} from './tableData'

export function firstUpper(str : string)
{
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function sortTable(column : string){
    if(sort_column.value == column) 
    {
        sort_order.value = !sort_order.value;
    }
    else
    {
        sort_order.value = true
        sort_column.value = column;
    }
    // reduce display data into display
    filtered.value.sort((a : any, b : any) => 
    {
        if(a[sort_column.value] < b[sort_column.value])
        {
            return sort_order.value ? -1 : 1;
        }
        if(a[sort_column.value] > b[sort_column.value])
        {
            return sort_order.value ? 1 : -1;
        }
        return 0;
    })
    updatePagination()
}
export function setPage(page_set: number){
    page.value = page_set;
    updatePagination();
}
export function nextPage(){
    page.value++;
    updatePagination();
}
export function prevPage(){
    page.value--;
    updatePagination();
}
export function updatePagination(){
    if(page.value == 0)
    {
    page.value = pages.value;
    }
    let comeco =
        _per_page.value * (page.value - 1)
    let final =
        _per_page.value * page.value
    if (comeco >= filtered.value.length) {
        page.value = 1
        comeco =
        _per_page.value * (page.value - 1)
        final = _per_page.value * page.value
    }
    pages.value = Math.ceil(filtered.value.length / _per_page.value)
    display.value = filtered.value.slice(comeco, final)
}
export function updateSearch(){
    const filtered_set = display_data.value.filter((item:any) => {
        for(const key in _fields.value)
        {
            if(item[_fields.value[key] as string].toString().toLowerCase().includes(search.value.toLowerCase()))
            {
                return true;
            }
        }
        return false;
    });
    if(filtered_set.length != 0 || display_data.value.length == 0)
    {
        filtered.value = filtered_set;
        last_search.value = search.value;
    }
    const search_set= search.value.search(last_search.value);
    if(search_set == 0)
    {
        display_search.value = `<font color="white">${last_search.value}</font><font color="red">${search.value.replace(last_search.value,'')}</font>`;
    }
    else if(search_set >= 0)
    {
        const mid = search.value.split(last_search.value);
        display_search.value = `<font color="red">${mid[0]}</font><font color="white">${last_search.value}</font><font color="red">${mid[1]}</font>`;

    }
    else
    {
        display_search.value = `<font color="red">${search.value}</font>`;
    }
    updatePagination()
}
export function remove(row: any){
    // $emit.value('remove', row);
    display_data.value = display_data.value.filter((item:any) => item != row);
    updateSearch()
}
updatePagination()
