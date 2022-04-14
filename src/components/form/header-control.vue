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

<style scoped lang="less">

@import 'header';

</style>