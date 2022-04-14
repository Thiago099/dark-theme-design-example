export const paginationData = {
    page:1,
    pages:1,
    page_display:15,
}
export const paginationMethods = {
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
}

export const paginationComputed = {
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
}