export const searchData = {
    search:'',
    last_search:'',
    display_search:'',
}
export const searchMethods = {
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
}