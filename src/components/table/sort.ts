export const sortData = {
    sort_column : '',
    sort_order : true,
}
export const sortMethods = {
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
}