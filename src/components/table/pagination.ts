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