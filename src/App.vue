<template>
  <div id="nav">
    <div v-for="(route, index) in router.options.routes.filter(item => !item.name.includes('edit'))" :key="route.name" class="nav-item">
      <router-link :to="route.path">{{ route.name }}</router-link> <span v-if="index != router.options.routes.filter(item => !item.name.includes('edit')).length-1">| </span>
    </div>
    
  </div>
  <router-view style="margin-bottom:30px"/>
</template>
<script lang="ts">
import router from '@/global/router'
import { defineComponent } from "vue";
export default defineComponent({
  name: 'App',
  data(){
    return{
      router:router
    }
  }
})
</script>
<style >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #6e6e6e;
}
a{
  text-decoration: none;
}
.container{
  margin-top: 50px;
}
#nav {
  position: fixed;
   left: 0;
   bottom: 10px;
   width: 100%;
   text-align: center;
   z-index: 100;
}

#nav a {
  font-weight: bold;
  color: #6e6e6e;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.nav-item{
  display:inline;
  
}
</style>