<template>
    <div class="form-group">
        <label :for="label">{{ label }}:</label>
        <div>
            <input 
                type="text" 
                class="form-control" 
                :id="label" 
                :placeholder="placeholder"
            >
        </div>
        <small id="emailHelp" class="form-text text-muted" v-if="info!=''"> <i class="fa fa-info-circle" ></i> {{ info }}.</small>
    </div>
</template>
<script lang="ts">
export default {
    props:{
        label: {
            type: String,
            default: 'label'
        },
        placeholder: {
            type: String,
            default: ''
        },
        info:{
            type: String,
            default: ''
        },
        value: {
            type: String,
            default: ''
        }
    },
}
</script>
<style scoped>

</style>
