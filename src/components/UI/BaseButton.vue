<!-- target="_blank" is for the route to open new tab -->
<template>
 <button class="buttonDefault"  @click="windowOpen(route, title)" >{{ title }}</button>
</template>
<script>import store from "../../store";

  export default {
    props: ["title", "route"],
    methods:{
      windowOpen(route, title){
          window.localStorage.setItem('name', title)
          window.open(route, title, "height=640,width=960,toolbar=no,menubar=no,scrollbars=no,location=no,status=no");
          store.dispatch('setSelectedHomeButton',{
            title: title
          })
          //MAybe putting store dispatch here to get total number of slides 
          //add a disable flag for questions 
         
      }
    }
  };
</script>
<style scoped>
  .buttonDefault {
      padding:2%;
      margin:1%;
    background-color: rgb(36	46	44	);
    color: white;
    border-radius: 5px;
  }
</style>
