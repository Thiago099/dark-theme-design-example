<template>
  <div class="container">
    <h1 class="header">User <i class="fa fa-angle-right back-button"></i></h1>
    <div class="card">
      <div class="card-header">
        <h3 style="text-align:center">Basic info</h3>
      </div>
      <div class="row card-body">
        <input-container 
          name="Name" 
          class="col-4"
          warning="Name already exists"
        >
        <input type="text" placeholder="Enter name" class="form-control" id="Name" >
        </input-container>

        <input-container 
          name="Email" 
          info="We'll never share your email with anyone else"
          class="col-4"
        >
        <input type="text" placeholder="Enter Email" class="form-control" id="Email">
        </input-container>

        <input-container 
          name="Phone number" 
          class="col-4"
          error="Invalid phone number"
        >
        <input type="text" placeholder="Enter phone number" class="form-control" id="Phone number">
        </input-container>
      </div>
    </div>
    <div class="form-group">
          <button type="submit" style="float:right" class="btn btn-submit">Submit</button>
        </div>
  </div>
</template>

<script lang="ts">


export default {
  name: 'Home',
  mounted() {
  },
};
</script>
<style scoped>
.header{
  width:100%;
  background-color: rgb(36, 36, 36);
  border:1px solid rgb(85, 85, 85);
  color:white;
  text-align:center;
  padding:10px;
  border-radius:10px;
  margin-bottom:20px;
}
.back-button{
  float:right;
  margin-right:15px;
  margin-left:calc(-15px - 18px - 14px);
  color:white;
  background-color: rgb(24, 24, 24);
  border:1px solid rgb(85, 85, 85);
  padding-left: 18px;
  padding-right: 14px;
  padding-top: 3px;
  padding-bottom: 4px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
