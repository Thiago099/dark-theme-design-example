<template>
    <h1 class="header">{{ title }} 
        <router-link :to="href" class="add-button" v-if="button == 'new'" :title="title">
            <i class="fa fa-plus"></i>
        </router-link>
        <router-link :to="href" class="back-button" v-else-if="button == 'back'">
            <i class="fa fa-angle-left"></i>
        </router-link>
    </h1>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props:{
        button: {
            type: String,
            default: 'none'
        },
        href: {
            type: String,
            default: '/'
        },
        title: {
            type: String,
            default: 'none'
        },
    }
})
</script>

<style scoped>

.header{
  width:100%;
  color:white;
  text-align:center;
  padding:10px;
  margin-bottom:20px;
}

.back-button{
    float: right;
    background-color: var(--medium);
    border:1px solid var(--bright);
    margin-top: -2px;
    padding-bottom: 2px;
    padding-right: 20px;
    padding-left: 15px;
    border-radius: 5px;
    margin-right: 10px;
    margin-left: -60px;
    cursor: pointer;
    color:white;
}

.add-button{
    font-size: 20pt;
    float: right;
    background-color: var(--medium);
    border:1px solid var(--bright);
    --margin: 15px;
    padding-top: 10px;
    padding-bottom: 7px;
    padding-left: var(--margin);
    padding-right: var(--margin);
    border-radius: 5px;
    margin-right: 10px;
    margin-left: -60px;
    cursor: pointer;
    color:white;
}
</style>