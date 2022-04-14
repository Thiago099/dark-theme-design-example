export const optionsMethods = {
    remove(row: any){
        this.$emit('remove', row);
        this.display_data = this.display_data.filter((item:any) => item != row);
        this.updateSearch()
    },
}