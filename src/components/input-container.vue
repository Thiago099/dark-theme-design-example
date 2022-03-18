<template>
    <div class="form-group">
        <label :for="name">{{ name }}:</label>
        <div>
            <slot>
                <input 
                    type="text" 
                    class="form-control" 
                    :id="label" 
                    :placeholder="placeholder"
                >
            </slot>
        </div>
        <small class="form-text text-muted"> 
            <span :class="displayMessage" class="inert">
                <i 
                class="fa" 
                :class="
                {
                    'fa-info-circle'            : displayMessage == 'info',
                    'fa-exclamation-triangle'   : displayMessage == 'warning',
                    'fa-times-circle'           : displayMessage == 'danger'
                }" ></i> 
                {{ displayMessage == 'info' ? info : displayMessage == 'warning' ? warning : displayMessage == 'danger' ? error : '*' }}.</span></small>
    </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
    name:'input-container',
    props:{
        name: {
            type: String,
            default: 'name'
        },
        child:{
            type: String,
            default: 'name'
        },
        info:{
            type: String,
            default: ''
        },
        warning:{
            type: String,
            default: ''
        },
        error:{
            type: String,
            default: ''
        },	
    },
    computed:{
        displayMessage()
        {
            if(this.error && this.error != '')
            {
                return "danger";
            }
            if(this.warning && this.warning != '')
            {
                return "warning";
            }
            if(this.info && this.info != '')
            {
                return "info";
            }
            {
                return "none";
            }
        },
    },
    mounted()
    {
        const element = document.getElementById(this.child);
        if(element)
        {
            if(element.tagName == 'INPUT')
            {
                element.classList.add('form-control');
            }
            else if(element.tagName == 'SELECT')
            {
                element.classList.add('form-select');
            }
        }
    },
})
</script>
<style scoped>
.none{
    color:transparent
}
</style>
