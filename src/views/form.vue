<template>
  <div class="container">
    <div class="card">
      <div class="row card-body">
        <h3>Title</h3>
        <input-control 
          label="Name" 
          placeholder="Enter name" 
          class="col-4"
          v-model="name"
        >
        </input-control>
        <input-control 
          label="Email" 
          info="We'll never share your email with anyone else" 
          placeholder="Enter Email" 
          class="col-4"
        ></input-control>
        <input-control 
          label="Phone number" 
          placeholder="Enter phone number" 
          class="col-4"
        ></input-control>
        <div>
        
      </div>
      </div>
      <div class="card-footer">
        <div class="form-group">
          <button type="submit" style="float:right" class="btn btn-submit">Submit</button>
        </div>
        </div>
    </div>
    
  </div>
</template>

<script lang="ts">
import inputControl from '@/components/input-control.vue';


export default {
  components: { inputControl },
  name: 'Home',
};
</script>
<style scoped>
.form-group{
  margin-bottom: 1rem;
}
input[type="checkbox"]{
  margin-right: .5rem;
}

</style>
