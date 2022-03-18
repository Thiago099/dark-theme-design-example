<template>
    <div :key="responsivity" class="form">
    
    <card-control title="Basic info" v-for="{name, fields} in form_fields" :key="name">
      <input-container 
          :name="inputText(required,name)" 
          :child = "field"
          :class="col"
          v-for="{field, name, col, error, blur, info,required} in fields"
          :key="field"
          :error="error"
          :warning="warning[field]"
          :info="info"
          
        >
          <input 
            @blur="handleBlur(field, blur)"
            type="text" 
            placeholder="Enter name" 
            :class="{'error': error != '' && error != null}"
            :id="field"
            v-model="form[field]"
          >
        </input-container>

    </card-control>
        
    <div class="form-group">
        <button type="submit" style="float:right" class="btn btn-submit" @click="submit">Submit</button>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
export default defineComponent({
  name: 'form-test',
  mounted() {
    if(this.$route.params.id != '0')
    {
      this.form = this.data.filter((item:any) => item.id == this.$route.params.id)[0] as any
    }
  },
  props:{
      form_fields: {
        type: Array,
        required: true,
      },
      data:{
        type: Array,
        required: true,
      }
  },
  data() {
    return {
      form:{id:0} as Record<string, any>,
      warning:{} as Record<string, any>,
      responsivity: 0
    };
  },
  methods:{
    submit(){
    const form_fields: Record<string, any> = this.form_fields;
      let valid : boolean = true;
      for(const group  in form_fields){
        for(const field_id in form_fields[group].fields){
          const field = form_fields[group].fields[field_id];
          if(field.required && (this.form[field.field] == '' || this.form[field.field] == undefined))
          {
            field.error = "This field is required";
            valid = false;
          }
          else if(field.submit && field.submit.condition(this.form[field.field]))
          {

            field.error = field.submit.message
            valid = false
          }
          else
          {
            field.error = "";
          }
        }
      }
      this.responsivity++
    },
    handleBlur(field:string, blur:any){
      if(blur.condition(this.form[field]))
      {
        this.warning[field] = blur.message
      }
      else
      {
        this.warning[field] = ''
      }
    },
    inputText(required:boolean, name:string)
    {
      return name+(required?"* ":"");
    }
  }
});
</script>
<style scoped>
.form{
  --color:var(--bright)
}
.error{
  --color:rgb(255,50,50);
}
input, input:focus{
  border-color: var(--color)
}
</style>
